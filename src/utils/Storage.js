import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
      console.log(e)
  } 
}

export const storeObject = async (key,value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e)
  }
}

export const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    const value=jsonValue != null ? JSON.parse(jsonValue) : null;
    return value
  } catch(e) {
    console.log(e)
  }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
        return value
    }
  } catch(e) {
    console.log(e)
  }
}
