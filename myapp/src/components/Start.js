import React from "react";
import "react-native-gesture-handler";
import { Box,Text, Heading, Center, View, Container, Button,
VStack, FormControl, Input, Link, HStack} from "native-base";
import { StyleSheet, Image, SafeAreaView  } from "react-native";
import img from "./ani/workingperson.png";

function Start ({ navigation }) {



  return (
    <SafeAreaView style={{backgroundColor: "#F3FEFF"}}>
      <View style={{backgroundColor: "#F3FEFF", height: "100%"}}>
        <Center>
          <View style={styles.header}>
          <Heading size="xl" mb="1" fontSize={40} color={"#362D70"}>AIInterviewer</Heading>
          <Text fontSize="md">
          AI를 통해 면접능력을 키워보세요!
          </Text>
          </View>
          <View style={styles.contents}>
          <Image 
          source={img} style={{width: "75%", height: "55%"}}
          />
          </View>
          <View style={styles.footer}>
          <Button size="lg" style={{width: "100%"}} mb="3"
            onPress={() => {
              navigation.navigate('Signup')
            }}>
            <Text fontSize="lg" color={"#fff"} bold>
            Sign Up
            </Text>
          </Button>
          <Text fontSize="sm" bold >
            계정이 존재하시나요? &ensp;
            <Text fontSize="md" bold color={"warning.400"} 
            onPress={() => {
              navigation.navigate('Login')
            }}>Log in</Text>
          </Text>
          </View>
          </Center>
    </View></SafeAreaView>

  );
}

export default Start;


const styles = StyleSheet.create({

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "13%",
  },
  contents: {
    width: "90%",
    height: "65%",
    alignItems: "center",
    justifyContent: "center",

  },
  footer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },

});