import React, { useState } from "react";
import "react-native-gesture-handler";
import Footer from './Footer';
import Prevideo from './Prevideo';
import Saveask from './Saveask'; 
import TwoHomeTop from './TwoHomeTop';

import { Box,Text, Heading, Center, View, Container, Button,
VStack, FormControl, Input, Link, HStack, StatusBar, IconButton, Icon, Stack
, Badge, Spacer, Flex, NativeBaseProvider} from "native-base";
import { StyleSheet, Image, Pressable } from "react-native";
import { MaterialIcons, AntDesign, MaterialCommunityIcons, FontAwesome  } from "@expo/vector-icons";
import homeimg1 from "./ani/homeimag1.jpg";
import homeimg2 from "./ani/homeimag2.jpg";
import homeimg3 from "./ani/homeimag3.jpg";

function TwoHome ({ navigation }) {
   
    const [TopSelected, setTopSelected] = useState(0);
    const [selected, setSelected] = useState(1);

    const handlerTopMenu = (index) => {
        setTopSelected(index);
    };  

  return (
    <VStack flex={1}>
        <TwoHomeTop TopSelected={TopSelected} navigation={navigation} handlerTopMenu={handlerTopMenu} />

            {TopSelected === 0 && <Saveask />}
            {TopSelected === 1 && <Prevideo navigation={navigation} />}

        <Footer selected={selected} navigation={navigation} setSelected={setSelected} />
    </VStack>

  );
}

export default TwoHome;


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