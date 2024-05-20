import React from 'react';
import { Box, Center, HStack, Pressable, Text, VStack } from 'native-base';

const TwoHomeTop = ({ TopSelected, handlerTopMenu }) => {

    
  return (
    
    <Box h="13%" bg="#fff" >
      <Center mt="5" w="100%" >
        <HStack w="100%">
          <Pressable pb="4" cursor="pointer" w="50%" style={{ borderBottomWidth: 5, borderBottomColor: TopSelected === 0 ? "#362D70" : "#8e8e8e" }}
            opacity={TopSelected === 0 ? 1 : 0.5} py="2" flex={1} onPress={() => { handlerTopMenu(0); }}>
            <VStack ml="10" mr="10" mt="10">
              <Center>
                <Text fontSize="xl" bold>질문</Text>
              </Center>
            </VStack>
          </Pressable>
          <Pressable cursor="pointer" w="50%" style={{ borderBottomWidth: 5, borderBottomColor: TopSelected === 1 ? "#362D70" : "#8e8e8e" }}
            opacity={TopSelected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => { handlerTopMenu(1); }}>
            <VStack ml="10" mr="10" mt="10">
              <Center>
                <Text fontSize="xl" bold>모의면접</Text>
              </Center>
            </VStack>
          </Pressable>
        </HStack>
      </Center>
    </Box>
  );
};

export default TwoHomeTop;
