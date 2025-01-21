import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";

export default function ChatPage() {
  const { roomName } = useParams(); // URL에서 roomName 가져오기
	const [user, setUser] = useState("");
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

  // 로그인된 사용자 정보 가져오기
  useEffect(() => {
    if (user !== "") {
      if (user !== "비로그인") {
        console.log("로그인");

        // 서버에서 사용자 정보 가져오기
        fetch(SERVER_URL + "chat/user?userId=" + user)
          .then((response) => {
            if (!response.ok) {
              throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
            }
            return response.json();
          })
          .then((data) => {
            console.log("서버로부터 받은 데이터:", data);
            setUserData(data);  // 사용자 데이터 저장
          })
          .catch((error) => {
            console.log(error);
            alert("사용자 정보를 가져오는 데 오류가 발생했습니다.");
          });
      } else {
        console.log("비로그인");
        alert("로그인 후 이용해 주세요.");
        navigate("/signin");  // 로그인 페이지로 이동
      }
    }
  }, [user]);  // user 상태가 변경될 때마다 실행됨

  return (
    <div>
			<AppBarCustom setUser={setUser}></AppBarCustom>
			{userData ?

			<div>
      <h1>채팅방: {roomName}</h1>
			<div>사용자: {userData.name}</div>
			</div>
			:
			<div>로딩중...</div>
				}
    </div>
  );
}