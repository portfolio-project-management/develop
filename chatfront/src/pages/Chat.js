import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';

const Chat = () => {
	const [client, setClient] = useState(null);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		// WebSocket 클라이언트 설정
		const stompClient = new Client({
			brokerURL: 'ws://localhost:8080/chat',
			connectHeaders:{},
			debug: function(str) {
				console.log(str);
			},
			onConnect: () => {
				// 연결된 후 메시지 구독
				stompClient.subscribe('/sub/messages', (messageOutput) => {
					const message = JSON.parse(messageOutput.body);
					setMessages((prevMessages) => [...prevMessages, message]);
				});
			},
			onStompError: (frame) => {
				console.error(frame);
			},
		});
		stompClient.activate();
		setClient(stompClient);
		// 컴포넌트 언마운트 시 WebSocket 연결 닫기
		return() => {
			stompClient.deactivate();
		};
	}, []);

	const sendMessage = () => {
		if(client && input.trim() !== '') {
			const message = { content: input, name: 'User'};
			client.publish({
				destination: '/pub/sendMessage',
				body:JSON.stringify(message),
			});
			setInput('');
		}
	};

	return (
		<div>
		<h1>채팅</h1>
		<div>
				{messages.map((message, index) => (
						<div key={index}>{message.name}: {message.content}</div>
				))}
		</div>
		<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="메시지를 입력하세요"
		/>
		<button onClick={sendMessage}>전송</button>
</div>
	);
};

export default Chat;