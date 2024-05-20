import React, { useState } from "react";
import "react-native-gesture-handler";
import Footer from './Footer';
import Prevideo from './Prevideo';
import Saveask from './Saveask'; 
import TwoHomeTop from './TwoHomeTop';

import { Box,Text, Heading, Center, View, Container, Button,
VStack, FormControl, Input, Link, HStack, StatusBar, IconButton, Icon, Stack
, Badge, Spacer, Flex, NativeBaseProvider, ScrollView} from "native-base";
import { StyleSheet, Image, Pressable } from "react-native";
import { MaterialIcons, AntDesign, MaterialCommunityIcons, FontAwesome  } from "@expo/vector-icons";
import homeimg1 from "./ani/homeimag1.jpg";
import homeimg2 from "./ani/homeimag2.jpg";
import homeimg3 from "./ani/homeimag3.jpg";

function Myprofile ({ navigation }) {
   
    const [TopSelected, setTopSelected] = useState(0);
    const [selected, setSelected] = useState(1);

    const handlerTopMenu = (index) => {
        setTopSelected(index);
    };  

  return (
    <>
    <VStack flex={1}>
    <Box h="13%" bg="#fff">
      <Center mt="5" w="100%"   h="80%" bg>
        <HStack w="100%">
            <VStack ml="10" mr="10" mt="10">
              <Center>
                <Text fontSize="xl" bold>녹화 영상</Text>
              </Center>
            </VStack>
          </HStack>
        </Center>
      </Box>
          <Center w="100%" h="500px" p="5">
          <Text fontSize="20px" color="#8e8e8e" mt="6">영상이 존재하지 않아요.</Text>
        </Center>
      

        <Footer selected={selected} navigation={navigation} setSelected={setSelected} height="100"/>
      </VStack>
    </>
  );
}

export default Myprofile;


const styles = StyleSheet.create({



  contents: {
    width: "90%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

  },
  midbox: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10",
  },

});