// Footer.js
import React from 'react';
import { Box, Center, HStack, Icon, Pressable, Text, NativeBaseProvider } from 'native-base';
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const Footer = ({ selected, navigation }) => {
  

  const handlerFooterMenu = (menu) => {
    console.log('Selected:', selected);
    switch(menu) {
      case 0:
        console.log(navigation);
        navigation.navigate('Home');
        break;
      case 1:
        navigation.navigate('TwoHome');
        break;
      case 2:
        navigation.navigate('Myprofile');
        break;
    }
  };

  return (
    <Box w="100%" bg="white" flex={1} >
      <NativeBaseProvider>
        <HStack bg="#fff" alignItems="center" p="3">
          <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => {handlerFooterMenu(0); }}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="#362D70" size="lg" />
              <Text color="#362D70" fontSize="12">
                홈
              </Text>
            </Center>
          </Pressable>
          <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => { handlerFooterMenu(1); }}>
            <Center>
              <Icon mb="1" as={<FontAwesome  name="video-camera" />} color="#362D70" size="md" />
              <Text color="#362D70" fontSize="12">
                모의면접
              </Text>
            </Center>
          </Pressable>
          {/* <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.5} py="2" flex={1} onPress={() => { handlerFooterMenu(2); }}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'account' : 'account-outline'} />} color="#362D70" size="lg" />
              <Text color="#362D70" fontSize="12">
                녹화영상
              </Text>
            </Center>
          </Pressable> */}
        </HStack>
      </NativeBaseProvider>
    </Box>
  );
};

export default Footer;
