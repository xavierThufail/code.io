import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import Constant from "expo-constants";

import allAction from "../store/actions";
import Header from "../components/Header";
import Card from "../components/Card";

export default function ContactScreen () {
  const status = useSelector(state => state.contact.statusDelete)
  const loading = useSelector(state => state.contact.loading)
  const contact = useSelector(state => state.contact)
  const [refreshing, setRefreshing] = React.useState(false)
  const dispatch = useDispatch()

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(allAction.contact.get())
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  React.useEffect(() => {
    dispatch(allAction.contact.get())
  }, [])

  if (status) {
    setTimeout(() => {
      dispatch(allAction.contact.setStatus("del", ''))
    }, 3000)
  }

  if (loading && contact.contacts.length === 0) return (
    <View style={styles.container}>
      <View style={styles.StatusBar} />

      <Header title="Contact" />

      <View style={styles.containerLoading}>
        <ActivityIndicator 
          size='large'
          color='#11999e'
        />
      </View>

      <StatusBar style="auto" backgroundColor="#1b83e3"/>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.StatusBar} />

      <Header title="Contact" />

      {status ? <Text style={{textAlign: 'center', fontSize: 20}}>{status}</Text> : <Text style={{textAlign: 'center', fontSize: 20}}></Text>}
      
      <ScrollView
        style={[styles.container, {marginTop: 20}]}
        contentContainerStyle={[styles.contentContainer, {paddingBottom: 20}]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        { contact.contacts && contact.contacts.map(contact => <Card data={contact} key={contact.id}/>)}
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
  }
});