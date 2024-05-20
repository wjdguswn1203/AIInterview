import React, { useState, useEffect, useCallback } from 'react';
import { Box, ScrollView, HStack, VStack, Text, Pressable, Center,Modal, Button, TextArea } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native'
import firebase, { auth, db } from '../../../firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const QuestionBox = React.memo(({ question, preview, id, userUid, favorite }) => {
  const [star, setStar] = useState(favorite ? 1 : 0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalText, setOriginalText] = useState(preview);
  const [editedText, setEditedText] = useState(originalText);
  
  const onChangeText = useCallback((text) => {
    setEditedText(text);
  }, []);
  const handlerStar = async () => {
    const newStarStatus = star === 0 ? 1 : 0;
    setStar(newStarStatus);
    await updateDoc(doc(db, `users/${userUid}/questions`, id), { favorite: newStarStatus === 1 });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setIsEditing(false);
    setEditedText(originalText); // Reset to original text
  };

const handleSave = async () => {
    if (!editedText.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    setOriginalText(editedText);
    setIsEditing(false);
    await updateDoc(doc(db, `users/${userUid}/questions`, id), { content: editedText });
    if(!isEditing){
    navigation.navigate('TwoHome');}

};


  return (
    <Box w="100%" h="130px" p="5" style={{ borderWidth: 1, borderColor: "#d4d4d4" }}>
      <Modal isOpen={modalVisible} onClose={() => {setModalVisible(false); setIsEditing(false);}}>
        <Modal.Content h="400">
          <Modal.CloseButton />
          <Modal.Header><Text w="85%" bold>{question}</Text></Modal.Header>
          <Modal.Body><KeyboardAvoidingView behavior="padding" enabled></KeyboardAvoidingView>
            <ScrollView>
              {isEditing ? (
                <TextArea
                  h="100"
                  placeholder="답변을 작성하세요."
                  value={editedText}
                  onChangeText={onChangeText}
                />
              ) : (
                <Text>{originalText}</Text>
              )}
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button pl="5" pr="5" variant="ghost" colorScheme="blueGray" onPress={handleCancel}>
                취소
              </Button>
              {isEditing ? (
                <Button pl="5" pr="5" onPress={handleSave}>
                  저장
                </Button>
              ) : (
                <Button pl="5" pr="5" onPress={handleEdit}>
                  수정
                </Button>
              )}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <HStack>
        <Pressable onPress={() => setModalVisible(true)}>
        <VStack>
          <Text fontSize="17" bold isTruncated noOfLines={2} maxW="300" minW="87%" mt="1">
            {question}
          </Text>
          <Text fontSize="12" isTruncated maxW="70%" mt="4" color="#362D70">
            {preview}
          </Text>
        </VStack></Pressable>
        <Box pl="5">
          <Pressable onPress={handlerStar}>
            <AntDesign name={star === 0 ? 'staro' : 'star'} size={24} color="#eab308" />
          </Pressable>
        </Box>
      </HStack>
    </Box>
  );
});


const Answer = () => {
  const [Tquestions, setTQuestions] = useState([]);
  const [isq, setIsq] = useState(false);
  const [userUid, setUserUid] = useState(null); // 사용자 UID 상태 추가

  useEffect(() => {
    const fetchQuestions = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserUid(user.uid); // 사용자 UID 설정
          const q = query(collection(db, `users/${user.uid}/questions`));
          const querySnapshot = await getDocs(q);
          const filteredQuestions = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(doc => doc.content !== "");
          setTQuestions(filteredQuestions);
        setIsq(filteredQuestions.length > 0);
        }
      });
      return () => unsubscribe(); // cleanup function
    };

    fetchQuestions();
  }, []);

  return (
    <ScrollView>
      {isq ? (
        Tquestions.map((q, idx) => (
          <QuestionBox
            key={idx}
            question={q.question}
            preview={q.content}
            id={q.id}
            userUid={userUid} // 여기에 onRefresh prop 추가
            favorite={q.favorite}
          />
        ))
      ) : (
          <Center w="100%" h="300px" p="5">
          <Text fontSize="20px" color="#8e8e8e" mt="6">질문이 존재하지 않아요.</Text>
          <Text fontSize="20px" color="#8e8e8e">새로 질문을 추가해보세요!</Text>
        </Center>
      )}
    </ScrollView>
  );
};

export default Answer;