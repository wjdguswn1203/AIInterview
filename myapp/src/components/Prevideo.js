import React, { useState } from "react";
import "react-native-gesture-handler";
import { Box, Text, Checkbox ,VStack, FormControl, Input, CheckIcon, Button, Badge, Select, NativeBaseProvider, HStack, Center } from "native-base";
import { Pressable, StyleSheet } from "react-native";

function Prevideo({ navigation }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
  const [isHowQ, setIsHowQ] = React.useState(1);

const handeletInterviewGo = () => {
  navigation.navigate('Interview', { checkboxes: selectedCheckBoxes});
}


  const addTag = () => {
    if (inputValue.trim() === "") {
      alert("내용을 입력하세요!");
      return;
    }
    const newTag = {
      text: inputValue
    };
    setTags([...tags, newTag]);
    console.log(tags, newTag);
    setInputValue("");
  };

  const deleteTag = (index) => {
    const updatedTags = tags.filter((_, idx) => idx !== index);
    setTags(updatedTags);
  };
  return (
    <Box style={styles.container} >
      <Box mt="10">

      <Box style={styles.midbox} m="6">
        <Box alignItems="left" mt="5" mb="7" ml="1" >
        <Text fontSize="25px" bold style={{borderBottomWidth: 4,}}> 모의면접 설정 </Text>
        </Box><Box rounded="8">
          <VStack space={4} alignItems="center">
            <Box style={styles.box}>
            {/* <FormControl w="100%" maxW="300px">
            <HStack>
            <FormControl.Label >질문 수</FormControl.Label>
            <Select selectedValue={isHowQ} minWidth="100" accessibilityLabel="질문 받을 수를 선택하세요." 
              defaultValue={1}  _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon />
              }} ml="5" onValueChange={itemValue => setIsHowQ(itemValue)} >
              <Select.Item label="1" value={1} />
              <Select.Item label="2" value={2} />
              <Select.Item label="3" value={3} />
              <Select.Item label="4" value={4} />
              <Select.Item label="5" value={5} />
            </Select></HStack>
            <FormControl.HelperText>
              질문 받을 수를 선택하세요.
            </FormControl.HelperText>
          </FormControl> */}
            </Box>
            <Box flexDirection="row" flexWrap="wrap">
              {tags.map((tag, index) => (
              <Badge key={index} bg="darkBlue.100" m="1" w="20" style={{height: "10px"}}>
                  <HStack>
                  <Box w="85%">
                  <Text fontSize="12px" color="darkBlue.600" bold isTruncated >{tag.text}</Text>
                  </Box>
                  <Box >
                  <Text bold color="#fff" onPress={() => deleteTag(index)}>X</Text>
                  </Box>
                  </HStack>
                  </Badge>
              ))}
            </Box>
            <Box w="100%" alignItems="center" h="30%">
            <Box w="100%" mb="2" style={{borderBottomWidth: 1, borderBottomColor: "#d4d4d4"}} >
            <Text bold color="#737373" >질문 분류</Text></Box>
            <Checkbox.Group  onChange={(values) => setSelectedCheckBoxes(values)}>
            <HStack m="2" >
            <Checkbox value="noanswer" size="sm" style={{width: "50px"}} ><Text fontSize="12px" mr="5" >답변 안 한 질문</Text></Checkbox>
            <Checkbox value="answer" size="sm" style={{width: "50px"}}><Text fontSize="12px">답변 한 질문</Text></Checkbox>
            </HStack>
            <HStack m="2">
            <Checkbox value="stereo" size="sm" style={{width: "50px"}}><Text fontSize="12px" mr="5">인성 질문</Text></Checkbox>
            <Checkbox value="skill" size="sm" style={{width: "50px"}}><Text fontSize="12px" >기술 질문</Text></Checkbox>
            </HStack>
            </Checkbox.Group>
            </Box>
            <Box mt="20" w="90%">
          <Button onPress={handeletInterviewGo} >모의면접 시작하기</Button></Box>
          </VStack>
        </Box>
      </Box>
      </Box>
    </Box>
  );
}

export default Prevideo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    height: "77%",
  },
  midbox: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#8e8e8e",
    alignItems: "center",
    justifyContent: "center"
  },

});
