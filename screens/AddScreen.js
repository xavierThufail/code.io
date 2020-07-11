import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import HeaderAdd from "../components/HeaderAdd";
import Constant from "expo-constants";
import allAction from "../store/actions";


export default function AddScreen () {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const status = useSelector(state => state.contact.statusPost)
  const loading = useSelector(state => state.contact.loading)
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [age, setAge] = React.useState(String(''));
  const [add, setAdd] = React.useState(false);

  if (status) {
    setTimeout(() => {
      dispatch(allAction.contact.setStatus("post", ''))
    }, 3000)
  }

  const handleAdd = () => {
    dispatch(allAction.contact.post({ firstName, lastName, age, photo }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.StatusBar} />

      <HeaderAdd title="Add Contact" />
      
      <ScrollView>
        <View style={{paddingHorizontal: 10}}>
          {status ? <Text style={{textAlign: 'center', fontSize: 20, color: status === "contact saved" ? "#3dbc6d" : "#eb2323"}}>{status}</Text> : <Text style={{textAlign: 'center', fontSize: 20}}></Text>}
          <Text style={styles.textBody}>First Name</Text>
          <TextInput 
            value={String(firstName)}
            onChangeText={firstName => setFirstName(firstName)}
            style={[styles.input, {paddingLeft: 30}]}
          />
          <Text style={styles.textBody}>Last Name</Text>
          <TextInput 
            value={String(lastName)}
            onChangeText={lastName => setLastName(lastName)}
            style={[styles.input, {paddingLeft: 30}]}
          />
          <Text style={styles.textBody}>Age</Text>
          <TextInput 
            value={String(age)}
            onChangeText={age => setAge(age)}
            style={[styles.input, {paddingLeft: 30}]}
            keyboardType="number-pad"
          />
          <Text style={styles.textBody}>Url Photo</Text>
          <TextInput 
            value={String(photo)}
            onChangeText={photo => setPhoto(photo)}
            style={[styles.input, {paddingLeft: 30}]}
          />
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setAdd(true);
                handleAdd();
              }}
              activeOpacity={1}
            > 
              {
                add
                ? loading
                ? <ActivityIndicator
                    size='small'
                    color='#e4f9f5'
                  />
                : setAdd(false)
                : <Text style={styles.buttonText}>Add</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#eb2323", marginLeft: 20 }]}
              onPress={() => {
                setFirstName('');
                setLastName('');
                setAge('');
                setPhoto("");
                navigation.navigate("Contact")
              }}
              activeOpacity={1}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <StatusBar style="auto" backgroundColor="#1b83e3"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  StatusBar: {
    height: Constant.statusBarHeight
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop:0,
    zIndex: 1
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'center'
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
    height: 50,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b83e3',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderColor: '#1b83e3',
    borderRadius: 30,
    borderTopLeftRadius: 5,
    marginVertical: 10
  },
});