import React, {useState} from "react";
import "react-native-gesture-handler";
import axios from "axios";
import { Box,Text, Heading, Center, View, Container, Button,
VStack, FormControl, Input, Link, HStack} from "native-base";
import { StyleSheet } from "react-native";

// Firebase db 연결
import firebase, { auth, db,  } from '../../firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login ({ navigation }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

const handlerLogin = async () => {
  if(!email || email.length === 0) {
    alert("아이디를 적어주세요.");
  } else if(!pw || pw.length === 0) {
    alert("비밀번호를 적어주세요.");
  } else {
    try {
      // Firebase Authentication을 이용한 로그인
      const userCredential = await signInWithEmailAndPassword(auth, email, pw);
      console.log(userCredential.user);
      navigation.navigate('Home');
    } catch (error) {
      // 에러 핸들링
      alert(error.message);
    }
  }
}


  return (
    <>
        <Center bgColor={"#fff"}>
        <View style={styles.main}>
        <Heading size="md" mb="1" bold>안녕하세요!</Heading>
        <Heading size="md" mb="1" bold>가지고 있는 계정으로 로그인해주세요!</Heading>
          <Box w={"91%"} >
          <VStack mt="5">
          <FormControl>
            <FormControl.Label>
              <Text fontSize="md" color="coolGray.600">ID:</Text></FormControl.Label>
            <Input h={"40px"} size="md" name="email" id="email"
            value={email} onChangeText={text => setEmail(text)}
             placeholder="아이디를 입력해주세요."/>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text fontSize="md" color="coolGray.600">Password:</Text></FormControl.Label>
            <Input h={"40px"} type="password" size="md" name="pw" id="pw"
            value={pw} onChangeText={text => setPw(text)}
             placeholder="비밀번호를 입력해주세요."/>
            <Text 
            fontSize="xs"
            fontWeight="800"
            color="primary.800" 
            onPress={() => {
              navigation.navigate('FindPw')
            }}
            alignSelf="flex-end" mt="3" mb="3">
              비밀번호 찾기
            </Text>
          </FormControl>
          <Button mt="1" colorScheme="primary" onPress={handlerLogin}>
            <Text fontSize="md" color={"#fff"} bold>
            Log in</Text>
          </Button>
        </VStack>
        </Box>
        </View>
        </Center>
    </>

  );
}

export default Login;


const styles = StyleSheet.create({
  main: {
    width: "100%",
    alignItems: "left",
    justifyContent: "left",
    marginTop: "5%",
    marginLeft: "10%"
  },

});