// import { useEffect, useState } from "react";
// import { SERVER_URL, WEBSOCKET_URL } from "../Link";

// export default function ChatRoom({roomInfo, user}){
    
//     const [ chatText, setChatText ] = useState("");
//     const [ chats, setChats ] = useState([]);
//     const [ socket, setSocket ] = useState(null);

    
//     useEffect(() => {
//         //채팅방 불러오기
//         fetch(SERVER_URL + `message/get?roomId=${roomInfo.id}`)
//         .then(response => response.json())
//         .then(data => {
//             setChats(data);
//         })
//         .catch(error => console.log(error))

//         //유저 소켓 연결
//         const ws = new WebSocket(WEBSOCKET_URL + `chat?roomId=${roomInfo.id}`);
//         setSocket(ws);

//         // 메시지 수신 핸들러
//         ws.onmessage = (event) => {
//             const newMessage = JSON.parse(event.data);

//             if (newMessage.status === "failure") { //메시지 전송 실패시
//                 alert("메시지 저장에 실패했습니다: " + newMessage.message);
//             } else {
//                 // 정상적인 메시지 처리 로직
//                 setChats((prevChats) => [...prevChats, newMessage]);
//             }
//         };

//         // 연결 해제
//         return() => {
//             ws.close();
//         }
//     },[roomInfo.id])

//     function handleChangeChatText (e) {
//         setChatText(e.target.value);
//     }

//     //메시지 전송
//     function handleSendMessage() {
//         if(chatText !== ""){
//             const message = {
//                 roomId : roomInfo.id,
//                 userId : user,
//                 content : chatText
//             };
//             socket.send(JSON.stringify(message));
//             setChatText("");
//         }else{
//             alert("메시지를 입력해 주세요")
//         }
//     }

//     function handleChangeTimeFormat(time) {
//         const date = new Date(time)
//          // 생성한 Date 객체에서 년, 월, 일, 시, 분, 초를 각각 문자열로 추출
//         const year   = date.getFullYear().toString();           // 년도
//         const month  = ("0" + (date.getMonth() + 1)).slice(-2); // 월 2자리 (01, 02 ... 12)
//         const day    = ("0" + date.getDate()).slice(-2);        // 일 2자리 (01, 02 ... 31)
//         const hour   = ("0" + date.getHours()).slice(-2);       // 시 2자리 (00, 01 ... 23)
//         const minute = ("0" + date.getMinutes()).slice(-2);     // 분 2자리 (00, 01 ... 59)
//         const second = ("0" + date.getSeconds()).slice(-2);     // 초 2자리 (00, 01 ... 59)

//         // 형식화된 문자열 생성
//         const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

//         return formattedDateTime;
//     }

//     return(
//         <div>
//             {
//                 chats.length > 0 &&
//                 chats.map((chat, index) => (
//                     <div key={index}>
//                         <p>보낸 사람  : {chat.userId}</p>
//                         <p>보낸 시간 : {handleChangeTimeFormat(chat.sendTime)}</p>
//                         <p>내용 : {chat.content}</p>
//                         <hr></hr>
//                     </div>
//                 ))
//             }
//             <input type="text" onChange={handleChangeChatText} value={chatText}></input>
//             <button onClick={handleSendMessage}>메시지 전송</button>
//         </div>
//     );
// }



// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

import { useEffect, useState } from "react";
import { SERVER_URL, WEBSOCKET_URL } from "../Link";

export default function ChatRoom({ roomInfo, user }) {

    const [chatText, setChatText] = useState("");
    const [chats, setChats] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // 채팅방 불러오기
        fetch(SERVER_URL + `message/get?roomId=${roomInfo.id}`)
            .then(response => response.json())
            .then(data => {
                setChats(data);
            })
            .catch(error => console.log(error))

        // 유저 소켓 연결
        const ws = new WebSocket(WEBSOCKET_URL + `chat?roomId=${roomInfo.id}`);
        setSocket(ws);

        // 메시지 수신 핸들러
        ws.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);

            if (newMessage.status === "failure") { // 메시지 전송 실패시
                alert("메시지 저장에 실패했습니다: " + newMessage.message);
            } else {
                // 정상적인 메시지 처리 로직
                setChats((prevChats) => [...prevChats, newMessage]);
            }
        };

        // 연결 해제
        return () => {
            ws.close();
        }
    }, [roomInfo.id])

    function handleChangeChatText(e) {
        setChatText(e.target.value);
    }

    // 메시지 전송
    function handleSendMessage() {
        if (chatText !== "") {
            const message = {
                roomId: roomInfo.id,
                userId: user,
                content: chatText
            };
            socket.send(JSON.stringify(message));
            setChatText("");
        } else {
            alert("메시지를 입력해 주세요");
        }
    }

    function handleChangeTimeFormat(time) {
        const date = new Date(time);
        const year = date.getFullYear().toString();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hour = ("0" + date.getHours()).slice(-2);
        const minute = ("0" + date.getMinutes()).slice(-2);
        const second = ("0" + date.getSeconds()).slice(-2);

        const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        return formattedDateTime;
    }

    return (
        <div className="chat-container">
            <div className="message-list">
                {
                    chats.length > 0 &&
                    chats.map((chat, index) => (
                        <div key={index} className={chat.userId === user ? "my-message" : "other-message"}>
                            <div className="message-content">
                                <p className="user-id">{chat.userId}</p>
                                <p className="message-time">{handleChangeTimeFormat(chat.sendTime)}</p>
                                <p className="message-text">{chat.content}</p>
                            </div>
                        </div>
                    ))
                }
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
    );
}
