import React, {useState} from "react";

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


function Signup ({ navigation }) {

  const [newpw, setNewPw] = useState('');
  const [newrpw, setNewRpw] = useState('');
  const [newemail, setNewEmail] = useState('');

  const handlerSignup = () => {
  if (!newemail || newemail.length === 0) {
    alert("이메일을 적어주세요.");
  } else if (!newpw || newpw.length === 0) {
    alert("비밀번호를 적어주세요.");
  } else if (newpw !== newrpw) {
    alert("비밀번호가 동일하지 않습니다.");
  } else {
    // Firebase 인증을 사용하여 사용자 등록
    createUserWithEmailAndPassword(auth, newemail, newpw)
      .then((userCredential) => {
        // 가입 성공
        alert("가입이 완료되었습니다.");
      const user = userCredential.user;
        // Firestore에 사용자 정보 저장 (옵션)
      if (user) {
        const usersCollection = collection(db, "users");
        setDoc(doc(usersCollection, user.uid), {
          useremail: newemail,
          userpw: newrpw,
        });
      }

        navigation.navigate('Login');
      })
      .catch((error) => {
        // 가입 실패
        alert("가입 실패: " + error.message);
      });
  }
};

  return (
    <>
        <Center bgColor={"#fff"}>
        <View style={styles.main}>
        <Heading size="md" mb="1" bold>환영합니다!</Heading>
        <Heading size="md" mb="1" bold>가입하시려면 전부 작성해주세요!</Heading>
          <Box w={"91%"} >
          <VStack mt="5">
          <FormControl mb="3">
            <FormControl.Label>
              <Text fontSize="md" color="coolGray.600">Email:</Text></FormControl.Label>
            <Input h={"40px"} size="md" name="newemail" id="newemail"
            value={newemail} onChangeText={text => setNewEmail(text)} placeholder="이메일을 입력해주세요."/>
          </FormControl>
          <FormControl mb="3">
            <FormControl.Label>
              <Text fontSize="md" color="coolGray.600">Password:</Text></FormControl.Label>
            <Input h={"40px"} type="password" size="md" name="newpw" id="newpw"
            value={newpw} onChangeText={text => setNewPw(text)} placeholder="비밀번호를 입력해주세요."/>
          </FormControl>
          <FormControl mb="3">
            <FormControl.Label>
              <Text fontSize="md" color="coolGray.600">Confirm Password:</Text></FormControl.Label>
            <Input h={"40px"} type="password" size="md" name="newrpw" id="newrpw"
            value={newrpw} onChangeText={text => setNewRpw(text)} placeholder="비밀번호를 다시 입력해주세요."/>
          </FormControl>

          {/* btn */}
          <Button mt="3" colorScheme="primary" onPress={handlerSignup}>
            <Text fontSize="md" color={"#fff"} bold>
            Sign up</Text>
          </Button>
        </VStack>
        </Box>
        </View>
        </Center>
    </>

  );
}

export default Signup;


const styles = StyleSheet.create({
  main: {
    width: "100%",
    alignItems: "left",
    justifyContent: "left",
    marginTop: "5%",
    marginLeft: "10%"
  },

});