import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { Box,Text, Heading, Center, TextArea, Checkbox, Button,
VStack, Badge, CheckIcon, HStack, Select, Modal, ScrollView, Switch, FormControl, Input, Spinner, View  } from "native-base";
import { StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ButtonGroup } from "@rneui/base";
import Example from "./QMenuContents/Example";
import Answer from "./QMenuContents/Answer";
import Bookmark from "./QMenuContents/Bookmark";
import TechnicalExample from "./QMenuContents/TechnicalExample";

import { sendToChatGPT } from './utils/chatService';

// Firebase db 연결
import firebase, { auth, db } from '../../firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// ChatGPT에 API 요청을 하기 위한 함수 작성
const fetchInterviewQuestions = async (howMany, questionType, jobTags) => {
  const aiMsg = `직업에 관련된 내용이 ${jobTags.join(", ")}인 사람에게 ${howMany}개의 ${questionType === "stereo" ? "인성" : "기술"} 면접 질문을 만들어줘.`;
  const response = await sendToChatGPT(aiMsg);


  return cleanAndExtractSentences(response);
  // JSON 변환 과정을 제거함
}

const cleanAndExtractSentences = (response) => {
  // 문장을 나누고, 앞뒤 공백 제거
  let sentences = response.split('\n').map(sentence => sentence.trim());
  // 불필요한 문자 제거
  sentences = sentences.map(sentence => 
    sentence.replace(/["“”‘’]/g, '') // 큰따옴표와 작은따옴표 제거
            .replace(/^\d+\.\s*/, '') // 시작 부분의 숫자와 점, 그리고 그 뒤의 공백 제거
            .trim() // 앞뒤 공백 제거
  );

  console.log(response);
  const idxQ = sentences.slice(0, 5);
  return sentences.slice(0, 5);
}

let userUid; // 사용자의 UID를 저장할 변수

// 사용자 인증 상태 체크
onAuthStateChanged(auth, (user) => {
  if (user) {
    // 사용자가 로그인한 경우
    userUid = user.uid; // 사용자의 UID를 저장
    console.log("Logged in user UID:", userUid); // 콘솔에 UID 출력 (디버깅 목적)
  } else {
    // 사용자가 로그인하지 않은 경우
    console.log("No user is logged in."); // 콘솔에 메시지 출력
    // 여기서 로그인 페이지로 리다이렉트하거나 로그인을 요청할 수 있음
  }
});


function Saveask ({ navigation }) {

  // 질문 분류
  const [service, setService] = React.useState("example"); 
  // 모달
  const [modalVisible, setModalVisible] = useState(false);
  // ai 질문 선택 비선택
  const [isNewQSelect, setIsNewQSelect] = useState(true);
  


  return (
    <Box style={{backgroundColor: "#fff"}} h="77%">
      <VStack>
        <Box w="100%" p="1" style={{ borderBottomWidth: 1, borderBottomColor: "#d4d4d4" }}>
        <HStack>
        <Box w="50%">
            <Box w="50%" pb="1" pl="1">
            <Select selectedValue={service} minWidth="150" accessibilityLabel="예시 질문" placeholder="예시 질문" 
            _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon color="#d4d4d4" />
            }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="예시 질문 (인성)" value="example" />
            <Select.Item label="예시 질문 (기술)" value="Texample" />
            <Select.Item label="답변한 내용" value="answer" />
            <Select.Item label="즐겨찾기" value="bookmark" />
            </Select>
        </Box>
        </Box>
            {/* 모달 */}
            <Modal isOpen={modalVisible} onClose={() => {setModalVisible(false); setIsNewQSelect(false);}}>
            <Modal.Content h="450" minW="350">
            <Modal.CloseButton />
            <Modal.Header><Text bold pl="1" style={{fontSize: "20"}}>새 질문 추가</Text></Modal.Header>
            <Modal.Body >
            <ScrollView >
            <HStack alignItems="center" pb="1" style={{ borderBottomWidth: 1, borderBottomColor: "#d4d4d4" }}>
            <Text style={{fontSize: "16"}}>AI에게 새 질문 받기</Text>
            <Switch 
                size="sm" 
                isChecked={isNewQSelect}
                onToggle={() => setIsNewQSelect(prev => !prev)}
            />
            </HStack>
            {isNewQSelect ? <AiNewQ /> : <SelfNewQ />}
            </ScrollView>
            </Modal.Body>
            </Modal.Content>
            </Modal>
            <Box w="50%">
           <Button mt="1.5" w="80%" ml="9" style={{ backgroundColor: "#362D70" }}
            onPress={() => setModalVisible(true)}>
            새 질문 추가하기</Button>
            </Box>
        </HStack>
        </Box>
        <Box>
            {service === "example" && <Example />}
            {service === "Texample" && <TechnicalExample />}
            {service === "answer" && <Answer />}
            {service === "bookmark" && <Bookmark />}
        </Box>
      </VStack>
    </Box>
  );
}

export default Saveask;

export const AiNewQ = () => {

  const [isAiwantQ, setIsAiwantQ] = useState(false);
  const [isHowQ, setIsHowQ] = useState(1);
  const [isWhatQ, setIsWhatQ] = React.useState("stereo");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

const [interviewQuestions, setInterviewQuestions] = useState([]);
const [questionNew, setQuestionNew] = useState({});
const closeModal = () => setModalVisible(false);

useEffect(() => {
  const newQuestionNew = {};
  interviewQuestions.forEach((question, idx) => {
    newQuestionNew[idx] = question;  // 질문 내용 저장
  });
  setQuestionNew(newQuestionNew);  // 상태에 질문 내용 저장
}, [interviewQuestions]);

const saveDataToFirebase = () => {
  if (!userUid) {
    console.error("userUid is empty. Cannot create collection.");
    return;
  }  
  const newQuestionRef = collection(db, `users/${userUid}/questions`); // 사용자별 컬렉션

  Object.entries(questionNew).forEach(([idx, question]) => {
 // 해당 인덱스의 질문이 선택된 경우에만 저장
      if(!question && question !== ""){
        setDoc(doc(newQuestionRef), {
          question: question,
          type: isWhatQ,
          favorite: false,
          content: "",
        })
        .then(() => {
          console.log("Document successfully written!");
          closeModal();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  });
}


  const generateQuestions = async () => {
    setIsLoading(true); // 로딩 시작
    const questions = await fetchInterviewQuestions(isHowQ, isWhatQ, tags.map(tag => tag.text));
    setInterviewQuestions(questions);
    setIsLoading(false); // 로딩 종료
  }
    useEffect(() => {
    if (isAiwantQ) {
      generateQuestions();
    }
  }, [isAiwantQ]);

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
      <View style={{flex: 1,}}>
        <VStack alignItems="center" pt="3" pb="1">
          {isAiwantQ ? (
            isLoading ? (
              <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading questions" />
                <Heading color="primary.500" fontSize="md">
                  질문 로딩 중...
                </Heading>
              </HStack>
            ) : (
              <Box style={{height: 300}}>
                <ScrollView w="100%" maxH="250"><VStack>{interviewQuestions.map((question, idx) => ( 
                    <HStack>
                      <Center><Text fontSize="15" bold isTruncated noOfLines={5}  mt="1" mr="2">{idx+1}</Text></Center>
                    <Text fontSize="15" bold isTruncated noOfLines={5} maxW="93%" mt="1" mr="2">
                      {question}
                    </Text>
                    <Center>
                    {/* <Ionicons ml="2" name={isQcheck[idx] ? 'checkbox-sharp' : 'checkbox-outline'} size={20} color="#0e7490" /> */}
                    </Center>
                  </HStack>
                ))}</VStack></ScrollView>
              <View style={{position: 'absolute',right: 10, bottom: 0,}} >
              <Button.Group space={2}>
              <Button pl="5" pr="5" variant="ghost" colorScheme="blueGray" onPress={() => (false)}>
                취소
              </Button>
                <Button pl="5" pr="5" onPress={() => saveDataToFirebase() }>
                  추가
                </Button>
              </Button.Group>
              </View>
              </Box>
            )
          ) : (
        <Box>
          <FormControl mb="5" mt="2">
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
          </FormControl>
          <FormControl mb="5">
            <HStack>
            <FormControl.Label >질문 종류</FormControl.Label>
            <Select selectedValue={isWhatQ} minWidth="150" accessibilityLabel="질문 종류를 선택하세요." 
               _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon />
              }} ml="5" onValueChange={itemValue => setIsWhatQ(itemValue)} >
              <Select.Item label="인성 질문" value="stereo" />
              <Select.Item label="기술 질문" value="skill" />
            </Select></HStack>
            <FormControl.HelperText>
              질문 종류를 선택하세요.
            </FormControl.HelperText>
          </FormControl>
          <FormControl w="100%" maxW="300px">
              
              <HStack><Center><FormControl.Label pr="2">직업</FormControl.Label> </Center>
              <VStack><HStack><Input maxH="9"
                placeholder="원하는 직업 관련 태그"
                value={inputValue}
                onChangeText={setInputValue}
                w="60%"
              />
              <Button onPress={addTag} maxH="9" ml="1" style={{width: 45}}>
                추가
              </Button>
              </HStack>
              <Text fontSize="11px" color="#737373" pl="2">
                예: 개발자, 자바, 백엔드, 2년차
              </Text>
              </VStack></HStack>
              {/* 
              <Checkbox ml="7" mt="1" size="sm" value={isTagDefaultValue} isChecked={isTagDefaultValue}
              onChange={() => setIsTagDefaultValue(prev => !prev)}><Text color="dark.300">기본값으로 설정하기</Text></Checkbox>
              */}
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
          <Button w="autu" mt="10" onPress={() => setIsAiwantQ(true)}>
              다음
          </Button></FormControl>
            </Box>
        )}
    </VStack>
  </View>
);
}

export const SelfNewQ = () => {
  
  const [editedText, setEditedText] = useState("");
  const [isWhatQ, setIsWhatQ] = React.useState("stereo");

const saveDataToFirebase = () => {
  if (!userUid) {
    console.error("userUid is empty. Cannot create collection.");
    return;
  }  
  const newQuestionRef = collection(db, `users/${userUid}/questions`); // 사용자별 컬렉션

      if(!editedText && editedText !== ""){
        setDoc(doc(newQuestionRef), {
          question: editedText,
          type: isWhatQ,
          favorite: false,
          content: "",
        })
        .then(() => {
          console.log("Document successfully written!");
          closeModal();
          
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  }

  return (
  <>
    <FormControl>
    <FormControl.Label >질문 종류</FormControl.Label>
    <Select selectedValue={isWhatQ} minWidth="150" accessibilityLabel="질문 종류를 선택하세요." 
        _selectedItem={{
      bg: "teal.600",
      endIcon: <CheckIcon />
      }} ml="5" onValueChange={itemValue => setIsWhatQ(itemValue)} >
      <Select.Item label="인성 질문" value="stereo" />
      <Select.Item label="기술 질문" value="skill" />
    </Select>
    <FormControl.HelperText>
      질문 종류를 선택하세요.
    </FormControl.HelperText>
    <TextArea
        h="100"
        placeholder="내용을 입력하세요"
        value={editedText}
        onChangeText={itemValue => setEditedText(itemValue)}
      />
      
      </FormControl>
  </>
  );
}

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
