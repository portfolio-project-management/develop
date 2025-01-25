import { useEffect, useState } from "react";
import AppBarCustom from "./modules/components/AppBarCustom";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../Link";
import ChatRoom from "./ChatRoom";

export default function ChatRoomList() {

    const [invitationCode, setInvitationCode] = useState("");
    const [roomName, setRoomName] = useState("");
    const [user, setUser] = useState("");
    const [openChat, setOpenChat] = useState(false);

    const [rooms, setRooms] = useState();

    const [roomInfo, setRoomInfo] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (user !== "") {
            if (user !== "비로그인") {
                getRooms();
            } else {
                alert("로그인 후 이용해 주세요.");
                navigate("/signin");
            }
        }
    }, [user]);

    function getRooms() {
        fetch(SERVER_URL + "room/get?userId=" + user)
            .then(response => response.json())
            .then(data => {
                setRooms(data);
            })
            .catch(error => console.log(error));
    }

    function handleChangeRoomCode(e) {
        setInvitationCode(e.target.value);
    }

    function handleChangeRoomName(e) {
        setRoomName(e.target.value);
    }

    // 방 생성
    function handleCreateRoom() {
        if (roomName !== "") {
            fetch(SERVER_URL + "room/create?userId=" + user + "&roomName=" + roomName)
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    if (data === "생성완료") {
                        getRooms();
                    }
                })
                .catch(error => console.log(error));
        } else {
            alert("이름을 입력해 주세요.");
        }
    }

    // 방 입장
    function handleJoinRoom() {
        if (invitationCode !== "") {
            fetch(SERVER_URL + "room/join?userId=" + user + "&invitationCode=" + invitationCode)
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    if (data === "입장완료") {
                        getRooms();
                    }
                })
                .catch(error => console.log(error));
        } else {
            alert("코드를 입력해 주세요.");
        }
    }

    // 채팅방 입장
    function handleOpenChat(e) {
        setRoomInfo(rooms[e.target.name]);
        setOpenChat(true);
    }

    // 채팅방 나가기
    function handleCloseChat() {
        setRoomInfo();
        setOpenChat(false);
    }

    return (
        <div className="chat-room-container">
            <AppBarCustom setUser={setUser} />
            {
                !openChat ? (
                    <div>
                        <div className="input-container">
                            <input
                                className="input-field"
                                placeholder="방 이름"
                                onChange={handleChangeRoomName}
                                value={roomName}
                            />
                            <button className="button" onClick={handleCreateRoom}>방 생성</button>
                            <br />
                            <input
                                className="input-field"
                                placeholder="코드 입력"
                                onChange={handleChangeRoomCode}
                                value={invitationCode}
                            />
                            <button className="button" onClick={handleJoinRoom}>입장</button>
                        </div>
                        <div className="room-list">
                            <p>방 리스트</p>
                            {
                                rooms && rooms.map((room, index) => (
                                    <div className="room-item" key={index}>
                                        <p>제목: {room.name}</p>
                                        <p>생성자: {room.createUser}</p>
                                        <button name={index} onClick={handleOpenChat}>입장</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="chat-page">
                        <button className="leave-button" onClick={handleCloseChat}>나가기</button>
                        <p>방 코드: {roomInfo.invitationCode}</p>
                        <hr />
                        <ChatRoom roomInfo={roomInfo} user={user} />
                    </div>
                )
            }
        </div>
    );
}
