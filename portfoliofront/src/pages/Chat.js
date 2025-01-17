import React from "react";
import ChatRoomList from "./ChatRoomList";
import CreateChatRoom from "./CreateChatRoom";

function Chat() {
	return(
		<div>
			<h1>채팅 페이지</h1>
			<p>채팅창 렌더링 완료</p>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<div style={{flex: 1, marginRight: '20px'}}>
					<CreateChatRoom/>
				</div>
				<div style={{flex: 1}}>
					<ChatRoomList/>
				</div>
			</div>
		</div>
	);
}
export default Chat;