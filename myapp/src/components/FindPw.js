import React from "react";

import "react-native-gesture-handler";
import { Box,Text, Heading, Center, View, Container, Button,
VStack, FormControl, Input, Link, HStack} from "native-base";
import { StyleSheet } from "react-native";

function FindPw ({ navigation }) {
  return (
    <>
        <Center bgColor={"#fff"}>
        <View style={styles.main}>
        <Heading size="md" mb="1" bold>안녕하세요!</Heading>
        <Heading size="sm" mb="1" bold>가입 시 작성하신 아이디와 이메일을 입력해주세요!</Heading>
        
          <Box w={"91%"} >
          <VStack mt="5">
          <FormControl mb="3">
            <FormControl.Label>
              <Text fontSize="md" color="coolGray.600">ID:</Text></FormControl.Label>
            <Input h={"40px"} size="md" placeholder="아이디를 입력해주세요."/>
          </FormControl>
          <FormControl mb="3">
            <FormControl.Label>
              <Text fontSize="md" color="coolGray.600">Email:</Text></FormControl.Label>
            <Input h={"40px"} size="md" placeholder="가입 이메일을 입력해주세요."/>
          </FormControl>
          <Button mt="5" colorScheme="primary" >
            <Text fontSize="md" color={"#fff"} bold>
            비밀번호 찾기</Text>
          </Button>
        </VStack>
        </Box>
        </View>
        </Center>
    </>

  );
}

export default FindPw;


const styles = StyleSheet.create({
  main: {
    width: "100%",
    alignItems: "left",
    justifyContent: "left",
    marginTop: "5%",
    marginLeft: "10%",
    
  },

});