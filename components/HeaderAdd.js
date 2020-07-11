import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"

import Icon from "./Icon";

export default function Header ({title}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Contact")}
        >
          <Icon name="ios-backspace" size={30}/>
        </TouchableOpacity>
      </View>

      {title && <Text style={styles.title}>{title}</Text>}

      <View>
        <TouchableOpacity
        >
          <Icon name="ios-person-add" size={30} focused="transparent"/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 22,
    fontFamily: 'source-sans',
    color: "#747474"
  }
})