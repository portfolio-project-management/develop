import { useEffect, useState } from "react";
import { SERVER_URL, WEBSOCKET_URL } from "../Link";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ChatRoom({ roomInfo, user }) {
  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState(null);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 채팅 메시지 불러오기
    fetch(SERVER_URL + `message/get?roomId=${roomInfo.id}`)
      .then((response) => response.json())
      .then((data) => {
        setChats(data);
      })
      .catch((error) => console.log(error));

    // 멤버 목록 불러오기
    fetch(SERVER_URL + `room/member/get?roomId=${roomInfo.id}`)
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => console.log(error));

    // WebSocket 연결
    const ws = new WebSocket(WEBSOCKET_URL + `chat?roomId=${roomInfo.id}`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.status === "failure") {
        alert("메시지 저장에 실패했습니다: " + newMessage.message);
      } else {
        setChats((prevChats) => [...prevChats, newMessage]);
      }
    };

    return () => {
      ws.close();
    };
  }, [roomInfo.id]);

  function handleChangeChatText(e) {
    setChatText(e.target.value);
  }

  function handleSendMessage() {
    if (chatText !== "") {
      const message = {
        roomId: roomInfo.id,
        userId: user,
        content: chatText,
      };
      socket.send(JSON.stringify(message));
      setChatText("");
    } else {
      alert("메시지를 입력해 주세요");
    }
  }

  function handleExitRoom() {
    fetch(SERVER_URL + `room/member/leave?userId=${user}&roomId=${roomInfo.id}`)
      .then((response) => {
        if (!response.ok) {
          alert("나가기에 실패하였습니다.");
        }
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="chat-room-container">
      <Button color="error" onClick={handleExitRoom}>
        퇴장
      </Button>
      <div className="chat-room-content">
        {/* 채팅 영역 */}
        <div className="chat-container">
          <div className="message-list">
            {chats.length > 0 &&
              chats.map((chat, index) => (
                <div
                  key={index}
                  className={chat.userId === user ? "my-message" : "other-message"}
                >
                  <div className="message-content">
                    <p className="user-id">{chat.userId}</p>
                    <p className="message-time">{chat.sendTime}</p>
                    <p className="message-text">{chat.content}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              onChange={handleChangeChatText}
              value={chatText}
              placeholder="메시지를 입력하세요"
            />
            <button onClick={handleSendMessage}>전송</button>
          </div>
        </div>

        {/* 멤버 목록 */}
        <div className="member-list">
          <h3>참여 멤버</h3>
          <ul>
            { members.length > 0 &&
            members.map((member, index) => (
              <li key={index}>
                <p>{member.userId}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
