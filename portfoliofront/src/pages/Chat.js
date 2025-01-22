import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";

export default function Chat() {
	const [userData, setUserData] = useState(null);
	const [user, setUser] = useState("");
	const [rooms, setRooms] = useState([]);
	const navigate = useNavigate();

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
						setUserData(data);  // 서버로부터 받은 사용자 데이터를 상태에 저장
						// 사용자가 속한 채팅방 정보 가져오기
						fetch(SERVER_URL + "chat/user/" + data.userId + "/rooms")
							.then(response => {
								if (!response.ok) {
										throw new Error("채팅방 정보를 가져오는 데 실패했습니다.");
								}
								return response.json();
							})
							.then(roomsData => {
								console.log("사용자가 속한 채팅방 목록:", roomsData);
								setRooms(roomsData);  // 사용자가 속한 채팅방 목록 상태에 저장
							})
							.catch(error => {
								console.log(error);
								alert("채팅방 정보를 가져오는 데 오류가 발생했습니다.");
							});
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

	// 채팅방 페이지 이동
	const handleEnterRoom = (roomId) => {
		navigate(`/chat/room/${roomId}`);
	};
	
	
	return (
		<div>
			<AppBarCustom setUser={setUser}></AppBarCustom>
			{userData ? 
			<div>
				<h1>Chat 페이지</h1>
				{/* 로그인된 유저 정보 출력 */}
				<div>로그인된 사용자: {userData.name}</div>
				{/* 채팅방 목록 출력 */}
				<div>
            <h2>참여한 채팅방</h2>
            {rooms.length === 0 ? (
              <div>참여한 채팅방이 없습니다.</div>
            ) : (
              <ul>
                {rooms.map((room, index) => (
                  <li key={index}>
										{room.roomId}
									  <button onClick={() => handleEnterRoom(room.roomId)}>
                      입장
                    </button>
									</li> 
                ))}
              </ul>
            )}
          </div>
			</div>
			:
			<div>로딩 중...</div>
			}
		</div>

	);
}