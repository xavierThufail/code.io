import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import Icon from "./Icon";
import { useNavigation } from "@react-navigation/native"
import allAction from "../store/actions";

export default function Card ({data}) {
  const navigation = useNavigation();
  const status = useSelector(state => state.contact.statusEdit);
  const loading = useSelector(state => state.contact.loading);
  const dispatch = useDispatch();

  const [showAction, setShowAction] = React.useState(false)
  const [edit, setEdit] = React.useState(false);
  const [display, setDisplay] =React.useState('none')
  const [bottom, setBottom] = React.useState(0);
  const [firstName, setFirstName] = React.useState(data.firstName);
  const [lastName, setLastName] = React.useState(data.lastName);
  const [age, setAge] = React.useState(String(data.age));


  const handleEdit = () => {
    const contactEdit = {firstName, lastName, age: Number(age), photo: data.photo ? data.photo : "N/A"};
    const id = data.id
    dispatch(allAction.contact.put(data.id, contactEdit));
  }

  const handleDelete = () => {
    const id = data.id;
    dispatch(allAction.contact.del(id))
  }

  if (status) {
    setTimeout(() => {
      dispatch(allAction.contact.setStatus("edit", ''))
    }, 3000)
  }

  return (
    <View style={{marginBottom: bottom}}>

      <View style={styles.container}>
        <TouchableOpacity style={styles.containerTitle} 
          onPress={() => {
            console.log('====ggg============')
            
          }}
          activeOpacity={1}
        >
          <View style={styles.row}>
            <Image
              style={styles.containerImage}
              source={{
                uri: data.photo.includes("http") ? data.photo : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-contact-512.png"
              }}
            />
            <Text style={styles.textSubject}>{data.firstName}</Text>
          </View>
        </TouchableOpacity>
        {showAction
          ? <View style={{flexDirection: "row", }}>
              <TouchableOpacity
                onPress={() => {
                  setShowAction(false);
                  setDisplay('flex')
                  setBottom(10)
                }}
                style={{marginRight: 20}}
              >
                <Icon name="md-create" size={30} focused={"#3dbc6d"}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowAction(false);
                  handleDelete();
                }}
                style={{marginRight: 20}}
              >
                <Icon name="ios-trash" size={30} focused={"#eb2323"}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowAction(false)}
              >
                <Icon name="ios-close-circle" size={30} focused="black"/>
              </TouchableOpacity> 
            </View>
          : <TouchableOpacity
              onPress={() => setShowAction(true)}
            >
              <Icon name="ios-more" size={30} focused="black"/>
            </TouchableOpacity>
        }
      </View>
      <View style={[styles.contentContainer, {maxHeight: 350, marginTop: -50, display}]}>
        {status ? <Text style={{color: status === "Contact edited" ? '#3dbc6d' : "#eb2323"}}>{status}</Text> : <Text></Text>}
        <Text style={styles.textBody}>First Name</Text>
        <TextInput 
          value={String(firstName)}
          onChangeText={firstName => setFirstName(firstName)}
          style={[styles.input, {paddingLeft: 20}]}
        />
        <Text style={styles.textBody}>Last Name</Text>
        <TextInput 
          value={String(lastName)}
          onChangeText={lastName => setLastName(lastName)}
          style={[styles.input, {paddingLeft: 20}]}
        />
        <Text style={styles.textBody}>Age</Text>
        <TextInput 
          value={String(age)}
          onChangeText={age => setAge(age)}
          style={[styles.input, {paddingLeft: 20}]}
          keyboardType="number-pad"
        />
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setEdit(true);
              handleEdit();
            }}
            activeOpacity={1}
          > 
            {
              edit
              ? loading
              ? <ActivityIndicator
                  size='small'
                  color='#e4f9f5'
                />
              : setEdit(false)
              : <Text style={styles.buttonText}>Edit</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#eb2323", marginLeft: 20 }]}
            onPress={() => {
              setDisplay("none")
              setFirstName(data.firstName);
              setLastName(data.lastName);
              setAge(String(data.age));
            }}
            activeOpacity={1}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1b83e3",
    borderRadius: 40,
    marginBottom: 10,
    padding: 10,
    paddingRight: 20,
    zIndex: 1
  },
  containerImage: {
    height: 50,
    width: 50,
    borderRadius:30,
  },
  contentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  textSubject: {
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 18,
    color: "#fff",
    fontWeight: 'bold'
  },
  buttonText: {
    textAlign: 'center',
    color: '#f0f0f0',
    fontWeight: 'bold'
  },
  button: {
    height: 30,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b83e3',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderColor: '#1b83e3',
    borderRadius: 30,
    borderTopLeftRadius: 5,
    marginBottom: 10
  },
})