import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Box, ScrollView, Button, Text, IconButton, Icon, HStack, Center, Modal } from 'native-base';
import { Camera } from 'expo-camera';
import {  Ionicons, AntDesign  } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';

import firebase, { auth, db } from '../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc, getStorage, ref, uploadBytes  } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Interview({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const cameraRef = useRef(null);
  const selectedCheckBoxes = route.params?.checkboxes || [];

  const [questions, setQuestions] = useState([]);
  const [isq, setIsq] = useState(false);
  const [userUid, setUserUid] = useState(null); // 사용자 UID 상태 추가
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  } else {
    // 질문이 더 이상 없을 경우의 처리
    alert("모든 질문이 끝났습니다.");
    navigation.navigate("TowHome")
  }
};

const handlePreviousQuestion = () => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  } else {
    // 첫 번째 질문일 경우의 처리
    console.log("첫 번째 질문입니다.");
  }
};

useEffect(() => {
  const fetchQuestions = async () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid); // 사용자 UID 설정
        const q = query(collection(db, `users/${user.uid}/questions`));
        const querySnapshot = await getDocs(q);

        // 체크박스 값에 따라 필터링
        let filteredQuestions = [];
        let addedQuestionIds = new Set(); // 중복을 확인하기 위한 Set

        querySnapshot.docs.forEach(doc => {
          const docData = { id: doc.id, ...doc.data() };
          
          // 이미 추가된 질문은 무시합니다.
          if (addedQuestionIds.has(docData.id)) {
            return;
          }

          if (selectedCheckBoxes.includes('noanswer') && docData.content === "") {
            filteredQuestions.push(docData);
            addedQuestionIds.add(docData.id);
          }
          if (selectedCheckBoxes.includes('answer') && docData.content !== "") {
            filteredQuestions.push(docData);
            addedQuestionIds.add(docData.id);
          }
          if (selectedCheckBoxes.includes('stereo') && docData.type !== "skill") {
            filteredQuestions.push(docData);
            addedQuestionIds.add(docData.id);
          }
          if (selectedCheckBoxes.includes('skill') && docData.type === "skill") {
            filteredQuestions.push(docData);
            addedQuestionIds.add(docData.id);
          }
        });

        setQuestions(filteredQuestions);
        setIsq(filteredQuestions.length > 0);
      }
    });
    return () => unsubscribe(); // cleanup function
  };

  fetchQuestions();
}, [selectedCheckBoxes]); 

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

const handleRecord = async () => {
  if (isRecording) {
    setIsRecording(false);
    const video = await cameraRef.current.stopRecording();
    uploadVideo(video.uri); // 비디오 업로드 함수 호출
  } else {
    setIsRecording(true);
    await cameraRef.current.recordAsync();
  }
};

const uploadVideo = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob(); // 파일을 blob 형태로 변환

  const storage = getStorage(firebase); // Firebase Storage 인스턴스 가져오기
  const storageRef = ref(storage, `users/${userUid}/video/${Date.now()}`); // 저장될 파일 경로 설정

  uploadBytes(storageRef, blob).then((snapshot) => {
    console.log('Uploaded a blob or file!', snapshot);
  }).catch((error) => {
    console.error('Error uploading file:', error);
  });
};

  const handleBack = () => {

    setModalVisible(!modalVisible);
    
  }


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={{...styles.cameraContainer, backgroundColor: 'transparent' }}>
        <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={cameraRef}>
        <IconButton style={{backgroundColor: "#06b6d4"}} w="11%" m="5"
        icon={<Icon as={AntDesign} name="arrowleft" />} onPress={handleBack}
        borderRadius="full" _icon={{
        color: "#fff", }} _ios={{_icon: {size: "lg" }}}
        />
<>
      <Modal isOpen={modalVisible} onClose={setModalVisible} >
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Return Policy</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Text>
                나가시겠습니까?
              </Text>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false);
            }}>
                취소
              </Button>
              <Button onPress={() => {
              setModalVisible(false); navigation.navigate("TwoHome");
            }}>
                확인
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      </>
        </Camera>
      </View>

      <Box style={styles.boxContainer}>
          <ScrollView>
          <HStack justifyContent="space-between" p="3" style={{borderBottomWidth: 1, borderBottomColor: "#a3a3a3"}}>
          {/* <Box w="20"
              style={{justifyContent: "center", alignItems: "center", backgroundColor: "#cadff1", borderRadius: "20"}}>
            <Text color="coolGray.700" style={{fontSize: 16}}>
              {docData[currentQuestionIndex].type === "skill" ? "기술면접" : "인성면접"}
            </Text>
          </Box> */}
            <HStack>
              <Button w="20" mr="2" onPress={handlePreviousQuestion}>이전</Button>
              <Button w="20" onPress={handleNextQuestion}>다음</Button>
            </HStack>

          </HStack>
        {/* 질문이 있을 때만 내용을 표시하고, 아니면 다른 메시지를 표시합니다. */}
        {isq  ? (
            <InterviewBox 
                key={currentQuestionIndex}
                question={questions[currentQuestionIndex].question}
                preview={questions[currentQuestionIndex].content}
                id={questions[currentQuestionIndex].id}
                userUid={userUid}
            />
        ) : (
            <Center w="100%" h="300px" p="5">
                <Text fontSize="20px" color="#8e8e8e" mt="6">질문이 없습니다.</Text>
            </Center>
        )}
        </ScrollView>
        <Center>
        <Box width="auto" h="auto">
        <IconButton style={{backgroundColor: "#06b6d4"}} 
        icon={<Icon as={Ionicons} name={ isRecording ? "stop" : "mic" } />} onPress={handleRecord}
            borderRadius="full" _icon={{
            color: "#fff", }} _ios={{_icon: {size: "2xl" }}}
            
            />
      {/* <Button title={isRecording ? "Stop Recording" : "Start Recording"} onPress={handleRecord} /> */}
      </Box>
      </Center>
      </Box>
    </SafeAreaView>
  );
}

const InterviewBox = ({ question, preview }) => {
  return (
    <View style={styles.interviewBox}>
      <Box style={styles.questionText}>
      <HStack mr="3">
      <Box w="2" h="auto" bg="#155e75" mr="2"></Box>
      <Text bold style={{fontSize: 20}}>{question}</Text></HStack>
      </Box>
      <Box style={styles.previewText}>
      <Text  style={{fontSize: 20}}>{preview}</Text>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1, 
  },
  boxContainer: {
    height: "50%",
    backgroundColor: "white",
  },
  interviewBox: {
    width: "auto",
    height: "auto",
  },
  questionText: {
    borderBottomWidth: 1,
    borderBottomColor: "#a3a3a3",
    padding: 15,
  },
  previewText: {
    padding: 15,
  }
});

export default Interview;
