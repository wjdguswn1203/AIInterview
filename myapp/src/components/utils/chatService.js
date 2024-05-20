import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const instance = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
});

export const sendToChatGPT = async (message) => {
  try {
    const cdata = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '한국어로만 대답해줘.' }, // 필요시 시스템 메시지를 조정할 수 있습니다.
        { role: 'user', content: message },
      ],
    };

    const response = await instance.post('', cdata); // cdata를 요청 본문으로 사용합니다.
    return response.data.choices[0].message.content; // 응답에서 message.content를 반환합니다.
  } catch (error) {
    console.error('ChatGPT 통신 오류:', error);
  }
};
