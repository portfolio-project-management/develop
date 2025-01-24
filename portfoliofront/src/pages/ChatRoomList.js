import { useEffect, useState } from "react";
import AppBarCustom from "./modules/components/AppBarCustom";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../Link";
import ChatRoom from "./ChatRoom";

export default function ChatRoomList(){

    const [ invitationCode, setInvitationCode ] = useState("");
    const [ roomName, setRoomName ] = useState("");
    const [ user, setUser ] = useState("");
    const [ openChat , setOpenChat ] = useState(false);

    const [  rooms, setRooms ] = useState();

    const [ roomInfo, setRoomInfo ] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if(user !== ""){
            if(user !== "비로그인"){ // 로그인 된 유저라면
                getRooms();
            }else{
                //console.log("아님")
                alert("로그인 후 이용해 주세요.")
                navigate("/signin");
            }
        }
    },[user])

    function getRooms () {
        //입장된 채팅방
        fetch(SERVER_URL + `room/get?userId=${user}`)
        .then(response => response.json())
        .then(data => {
            setRooms(data)
        })
        .catch(error => console.log(error))
    }

    function handleChangeRoomCode(e){
        setInvitationCode(e.target.value);
    }

    function handleChangeRoomName (e) {
        setRoomName(e.target.value);
    }

    //방 생성
    function handleCreateRoom () {
        if(roomName !== ""){ // 방 이름이 비어있지 않을 떄
            fetch(SERVER_URL + `room/create?userId=${user}&roomName=${roomName}`)
            .then(response => response.text())
            .then(data => {
                alert(data);
                if(data === "생성완료"){
                    getRooms();
                }
            })
            .catch(error => console.log(error))
        }else{
            alert("이름을 입력해 주세요.");
        }
    }

    //방 입장
    function handleJoinRoom () {
        if(invitationCode !== ""){ //코드가 비어있지 않을 때
            fetch(SERVER_URL + `room/join?userId=${user}&invitationCode=${invitationCode}`)
            .then(response => response.text())
            .then(data => {
                alert(data);
                if(data === "입장완료"){
                    getRooms();
                }
            })
            .catch(error => console.log(error))
        }else{
            alert("코드를 입력해 주세요.");
        }
    }

    //채팅방 입장
    function handleOpenChat (e) {
        //입장한 채팅방 정보
        setRoomInfo(rooms[e.target.name]);

        //채팅방 입장
        setOpenChat(true);
    }

    //채팅방 나가기
    function handleCloseChat () {
        //채팅방 초기화
        setRoomInfo();

        
        //채팅방 퇴장
        setOpenChat(false);
    }

    return(
        <div>
            <AppBarCustom setUser={setUser}></AppBarCustom>
            
            {/* 입장을 누르면 openChat을 이용해 상태를 변경 ( 방 리스트 -> 채팅방 ) */}
            {
                !openChat ?
                <div>
                    <input placeholder="방 이름" type="text" onChange={handleChangeRoomName} value={roomName}></input>
                    <button onClick={handleCreateRoom}>방 생성</button>
                    <br></br>
                    <input placeholder="코드입력" type="text" onChange={handleChangeRoomCode} value={invitationCode}></input>
                    <button onClick={handleJoinRoom}>입장</button>
                    <br></br>
                    <p>방 리스트</p>
                    {
                        rooms &&
                        rooms.map((room,index) => (
                            <div key={index}>
                                <p>{room.name}</p>
                                <button name={index} onClick={handleOpenChat}>입장</button>
                            </div>
                        ))
                    }
                </div>
                :
                <div>
                    <button onClick={handleCloseChat}>나가기</button>
                    <p>방 코드 : {roomInfo.invitationCode}</p>
                    <hr></hr>
                    <ChatRoom roomInfo={roomInfo} user={user}></ChatRoom>
                </div>
            }
        </div>
    );
}