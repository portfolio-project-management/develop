import { Client } from "@stomp/stompjs"; // STOMP 클라이언트
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client"; // SockJS 클라이언트
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";

export default function ChatPage() {
	const [userData, setUserData] = useState(null);
	const [user, setUser] = useState("");
	const navigate = useNavigate();
	const { roomId } = useParams();
	const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);


	useEffect(() => {
		if (user !== "") {
			if (user !== "비로그인") { // 로그인 된 유저라면
				console.log("로그인");
	
				// 서버에서 사용자 정보 가져오기
				fetch(SERVER_URL + "chat/user?userId=" + user)
					.then(response => {
						if (!response.ok) {
							throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
						}
						return response.json();
					})
					.then(data => {
						setUserData(data);
					})
					.catch(error => {
						console.log(error);
						alert("오류가 발생했습니다.");
					});
			} else {
				console.log("비로그인");
				alert("로그인 후 이용해 주세요.");
				navigate("/signin"); // 로그인 페이지로 이동
			}
		}
	}, [user]); // user 상태가 변경될 때마다 실행됨

// 	useEffect(() => {
// 		// roomId에 해당하는 채팅방 데이터를 가져오는 로직 작성
// 		fetch(SERVER_URL + `chat/room/${roomId}`)
// 				.then(response => response.json())
// 				.then(data => {
// 						// 데이터 처리 로직
// 						console.log("채팅방 데이터:", data);
// 				})
// 				.catch(error => {
// 						console.log(error);
// 						alert("채팅방 데이터를 가져오는 데 오류가 발생했습니다.");
// 				});
// }, [roomId]);

useEffect(() => {
	// WebSocket 연결
	const socket = new SockJS("http://localhost:8080/chat");  // WebSocket 서버 엔드포인트
	const client = new Client({
		brokerURL: "ws://localhost:8080/chat",  // WebSocket 연결 URL (ws:// 사용)
		connectHeaders: {},
		debug: (str) => console.log(str),
		onConnect: () => {
			// WebSocket 연결 성공 후 /topic/messages 구독
			client.subscribe("/topic/messages", (messageOutput) => {
				setMessages((prevMessages) => [...prevMessages, messageOutput.body]);
			});
		},
	});
	client.activate();
	setStompClient(client);

	// 클린업
	return () => {
		if (stompClient) {
			stompClient.deactivate();
		}
	};
}, [stompClient]);

const sendMessage = () => {
	if (stompClient) {
		stompClient.publish({
			destination: "/app/sendMessage",  // 서버로 보낼 STOMP 엔드포인트
			body: message,
		});
		setMessage("");  // 메시지 전송 후 입력란 초기화
	}
};

	return (
		<div>
			<AppBarCustom setUser={setUser}></AppBarCustom>
			{userData ? 
			<div>
				<div>채팅방: {roomId}</div>
				{/* 로그인된 유저 정보 출력 */}
				<div>로그인된 사용자: {userData.name}</div>

			<div>
      <h1>Chat</h1>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
			</div>
			:
			<div>로딩 중...</div>
			}
		</div>

	);
}