import { Client } from '@stomp/stompjs';
import { useEffect, useState } from "react";

function ChatRoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    console.log("실행");

    // WebSocket 연결 설정
    const client = new Client({
      brokerURL: 'ws://localhost:8080/chat',  // WebSocket 서버 URL
      connectHeaders: {},
      debug: (str) => console.log(str),  // 디버깅 메시지 출력
      onConnect: () => {
        console.log('WebSocket Connected!');
        // 채팅방 정보 구독
        client.subscribe('/topic/rooms', (message) => {
          console.log('Received message:', message.body);  // 받은 메시지 출력
          // 받은 채팅방 데이터를 상태에 반영
          setRooms(JSON.parse(message.body));  // 상태 업데이트
        });
      },
      onDisconnect: () => {
        console.log('WebSocket Disconnected');
      }
    });

    // WebSocket 연결 활성화
    client.activate();

    // 컴포넌트가 언마운트될 때 연결 종료
    return () => {
      client.deactivate();
    };
  }, []);  // 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <div>
      <h2>채팅방 목록</h2>
      {rooms.length > 0 ? (
        <ul>
          {rooms.map(room => (
            <li key={room.id}>
              <h3>{room.roomName}</h3>
              <ul>
                {room.participants.map(user => (
                  <li key={user.userId}>
                    {user.name} ({user.userId})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>채팅방이 존재하지 않습니다.</p>
      )}
    </div>
  );
}

export default ChatRoomList;