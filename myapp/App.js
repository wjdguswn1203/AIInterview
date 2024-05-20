// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native';
import Start from "./src/components/Start";
import Login from "./src/components/Login";
import Signup from "./src/components/Signup";
import FindPw from "./src/components/FindPw";
import Home from "./src/components/Home";
import TwoHome from "./src/components/TwoHome";
import Myprofile from "./src/components/Myprofile";
import Interview from "./src/components/Interview";
import Prevideo from "./src/components/Prevideo";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { NativeBaseProvider } from "native-base";
import img from "./src/components/ani/workingperson.png";
import homeimg1 from "./src/components/ani/homeimag1.jpg";
import homeimg2 from "./src/components/ani/homeimag2.jpg";
import homeimg3 from "./src/components/ani/homeimag3.jpg";




function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Start"
      >
      <Stack.Screen options={{ headerShown: false }} 
      name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} 
      options={{
      title: '',
      headerStyle: { 
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }
      }}/>
      <Stack.Screen name="Signup" component={Signup} 
      options={{
      title: '',
      headerStyle: { 
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }
      }}/>
      <Stack.Screen name="FindPw" component={FindPw} 
      options={{
      title: '',
      headerStyle: { 
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }
      }}/>
      <Stack.Screen options={{ headerShown: false }} 
      name="Home" component={Home} />
      <Stack.Screen options={{ headerShown: false }} 
      name="TwoHome" component={TwoHome} />
      <Stack.Screen options={{ headerShown: false }} 
      name="Myprofile" component={Myprofile} />
      <Stack.Screen options={{ headerShown: false }} 
      name="Prevideo" component={Prevideo} />
      <Stack.Screen options={{ headerShown: false }} 
      name="Interview" component={Interview} />

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default () => {
    return (
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NanumGothic', // 폰트 이름을 정확히 사용하세요
  },
});