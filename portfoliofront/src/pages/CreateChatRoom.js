import { useState } from "react";

function CreateChatRoom() {
	const [roomName, setRoomName] = useState('');
	const [participants, setParticipants] = useState([]);
	const [userList, setUserList] = useState([
		// 테스트 데이터
		{userId: '1', name: '1', icon: '😊'},
		{userId: '2', name: '2', icon: '😁'},
		{userId: '3', name: '3', icon: '😎'},
	]);

	// 채팅방 생성
	const handleCreateRoom = async () => {
		const roomDTO = {
			roomName: roomName,
			participants: participants.map(userId => ({
				userId: userId,
				name: userList.find(user => user.userId === userId).name
			}))
		};

		try {
			const response = await fetch('pub/rooms/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(roomDTO),
			});
			if(response.ok) {
				alert('생성 완료');
			} else {
				alert('생성 실패');
			}
		} catch (error) {
			console.log('에러 발생', error);
		}
	};
	// 아이콘 클릭
	const handleOnUserClick = (userId) => {
		// 참가자 목록에 없으면 추가
		if(!participants.includes(userId)) {
			setParticipants([...participants, userId]);
		} else {
			// 이미 있으면 제거
			setParticipants(participants.filter(id => id !== userId));
		}
	};

	return (
		<div>
			<h2>채팅방</h2>
			<input type="text" placeholder="채팅방 이름" value={roomName} onChange={e => setRoomName(e.target.value)}></input>

			<div>
				<h3>사용자 목록</h3>
				<div style={{display: 'flex', flexWrap: 'wrap'}}>
					{userList.map(user => (
						<div key={user.userId} onClick={() => handleOnUserClick(user.userId)}
							style={{
								margin: '10px',
								padding: '10px',
								cursor: 'pointer',
								border: '1px solid #ddd',
								borderRadius: '5px',
								backgroundColor: participants.includes(user.userId) ? 'lightgreen': 'white',
							}}
						>
						<span style={{fontSize: '30px'}}>{user.icon}</span>
						<div>{user.name}</div>
						</div>
					))}
				</div>
			</div>
			<div>
				<h3>참가자 목록</h3>
				<ul>
					{participants.map(userId => (
						<li key={userId}>
							{userList.find(user => user.userId === userId).name}
						</li>
					))}
				</ul>
			</div>
			<button onClick={handleCreateRoom}>생성</button>
		</div>
	);
}

export default CreateChatRoom;