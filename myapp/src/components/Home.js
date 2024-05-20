import React, { useState } from "react";
import "react-native-gesture-handler";
import Footer from './Footer';

import { Box,Text, Heading, Center, View, Container, Button,
VStack, FormControl, Input, Link, HStack, StatusBar, IconButton, Icon, Stack
, Badge, Spacer, Flex, NativeBaseProvider} from "native-base";
import { StyleSheet, Image, Pressable, SafeAreaView  } from "react-native";
import { MaterialIcons, AntDesign, MaterialCommunityIcons, FontAwesome  } from "@expo/vector-icons";
import homeimg1 from "./ani/homeimag1.jpg";
import homeimg2 from "./ani/homeimag2.jpg";
import homeimg3 from "./ani/homeimag3.jpg";

function Home ({ navigation }) {

    const images = [ homeimg1, homeimg2, homeimg3  ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState(0);

    const nextImage = () => {
    if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
    }
    else if (currentIndex === 2) {
        setCurrentIndex(0);
    }
    else {
        setCurrentIndex(0);  // 처음 이미지로 돌아갑니다.
    }
    };

  return (
    
    <VStack flex={1}><SafeAreaView style={{backgroundColor: "#f0f8ff"}}>
    <Box style={{backgroundColor: "#f0f8ff"}} h="87%">
      
        <Center mt="12">
        <HStack>
        <IconButton _pressed={{bg: "#fff"}} onPress={nextImage} icon={<Icon as={AntDesign} name="left" size="md" color="muted.800" />} />
        <Box alignItems="center" mt="2" style={{borderWidth: 0, borderRadius: 15,}} shadow={7}>
        <Pressable 
        onPress={() => console.log("I'm Pressed")} rounded="8" overflow="hidden" borderColor="coolGray.300" 
         shadow="3" bg="coolGray.100" p="5">
        <VStack space={4} alignItems="center">
            <Image 
            source={ images[currentIndex] }
            alt="Image slider"
            style={{ width: 300, height: 300, borderWidth: 1, borderRadius: 15 }}
            />
        </VStack>
        </Pressable>
        </Box>
        <IconButton _pressed={{bg: "#fff"}} onPress={nextImage} icon={<Icon as={AntDesign} name="right" size="md" color="muted.800" />} />
        </HStack>
        </Center>
        {/* 하단 박스 */}
        <Center>
        
        <Box alignItems="center" mt="12" bg="#fff" w="80" 
        p="5" style={{ borderWidth: 1, borderColor: "rgb(201, 201, 201)" }}> 
        
        <HStack>
        <VStack ml="10" mr="10" mt="5" >
        <Center>
        <Heading size="xl" mb="1" fontSize={40} color={"#362D70"}>0</Heading>
        <Text fontSize="md">질문저장</Text>
        </Center>
        </VStack>
        <Box w="15" h="20"></Box>
        <VStack ml="10" mr="10" mt="5">
        <Center>
        <Heading size="xl" mb="1" fontSize={40} color={"#362D70"}>0</Heading>
        <Text fontSize="md">모의면접</Text>
        </Center>
        </VStack>
        </HStack>
        
        <HStack>
        <VStack ml="10" mr="10" mt="5">
        <Center>
        <Heading size="xl" mb="1" fontSize={40} color={"#362D70"}>0</Heading>
        <Text fontSize="md">질문답변</Text>
        </Center>
        </VStack>
        <Box w="15" h="20"></Box>
        <VStack ml="10" mr="10" mt="5" mb="7">
        <Center>
        <Heading size="xl" mb="1" fontSize={40} color={"#362D70"}>0</Heading>
        <Text fontSize="md">즐겨찾기</Text>
        </Center>
        </VStack>
        </HStack>
        
        </Box>
        </Center>
        </Box></SafeAreaView>
        <Footer selected={selected} navigation={navigation} setSelected={setSelected}/>
    </VStack>

  );
}

export default Home;


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