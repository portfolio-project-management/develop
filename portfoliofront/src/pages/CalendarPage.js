import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventPopup from "./EventPopup";
import AppBarCustom from "./modules/components/AppBarCustom";
import { SERVER_URL, WEBSOCKET_URL } from "../Link";
import { Button } from "@mui/material";

export default function ({calendarInfo, back}) {
    const [events, setEvents] = useState([]); // 일정 데이터
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
    const [selectedEvent, setSelectedEvent] = useState(); // 선택된 일정

    const [ socket, setSocket ] = useState(null);

    // 백엔드에서 모든 이벤트 가져오기
    useEffect(() => {
        
        // 계획 가져오기
        fetch(SERVER_URL + `plan/get?calendarId=${calendarInfo.id}`)
        .then(response => response.json())
        .then(data => {
            setEvents(data);
        })
        .catch(error => console.log(error))

        // 유저 소켓 연결
        const ws = new WebSocket(WEBSOCKET_URL + `calendar?calendarId=${calendarInfo.id}`);
        setSocket(ws);

        // 메시지 수신 핸들러
        ws.onmessage = (event) => {
            const getPlan = JSON.parse(event.data);

            if (getPlan.status === "failure") { // 메시지 전송 실패시
                alert("메시지 저장에 실패했습니다: " + getPlan.message);
            } else {
                // 정상적인 메시지 처리 로직
                
                const newPlan = {
                    id: getPlan.id,
                    name: getPlan.name,
                    startTime: getPlan.startTime,
                    endTime: getPlan.endTime,
                    color: getPlan.color || "#378006",
                    calendarId : getPlan.calendarId,
                    content : getPlan.content
                }

                console.log(newPlan);
                console.log(handleChangeTimeFormat(newPlan.startTime))
                console.log(handleChangeTimeFormat(newPlan.endTime))
                
                if(getPlan.doing === "생성"){ //생성
                    setEvents((prevChats) => [...prevChats, newPlan])
                }else if (getPlan.doing === "수정"){ //수정
                    const copyEvents = events.filter(event => event.id !== newPlan.id);
                    setEvents([...copyEvents,newPlan]);
                }else if (getPlan.doing === "삭제"){ //삭제
                    const copyEvents = events.filter(event => event.id !== newPlan.id);
                    setEvents(copyEvents);
                }else{ // 이상한 데이터 넘어옴
                    alert("서버에서 처리 오류", getPlan.doing)
                }
            }
        };

        // 연결 해제
        return () => {
            ws.close();
        }
    }, [calendarInfo.id]);

    // 일정 수정 핸들러
    function handleChangeEvent (event) {

        socket.send(JSON.stringify({
            ...event,
            calendarId : calendarInfo.id
        }));
        setSelectedEvent(null);
    };

    //타임스탬스 포멧 변환
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
        <div>
            <Button color="error" onClick={back}>뒤로가기</Button>
            <div className="calendar-container">
                <h1>일정관리</h1>
                <button className="add-event-btn" onClick={() => setIsPopupOpen(true)}>
                    신규 일정
                </button>

                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events.map((event) => ({
                    id: event.id || "",
                    title: event.name || "",
                    content : event.content || "",
                    start: event.startTime || null,
                    end: event.endTime || null,
                    backgroundColor: event.color || "#378006",
                    borderColor: event.color || "#378006",
                    }))}
                    eventClick={(info) => {
                    setSelectedEvent({
                        id: info.event.id || "",
                        name: info.event.title || "",
                        startTime: info.event.start || "",
                        endTime: info.event.end || "",
                        color: info.event.backgroundColor || "#378006",
                        content: info.event.extendedProps.content || ""
                    });
                    setIsPopupOpen(true);
                    }}
                    eventContent={(eventInfo) => (
                        <div className="event-title">
                          <strong>{eventInfo.event.title}</strong>
                          <p>{eventInfo.event.extendedProps.content}</p> {/* content 추가 */}
                        </div>
                    )}
                    eventTimeFormat={false} // 시간을 숨김
                />

                {isPopupOpen && (
                    <EventPopup
                        isOpen={isPopupOpen}
                        onClose={() => {
                            setIsPopupOpen(false);
                        }}

                        //생성이면 비어있는 이벤트, 아니면 이벤트 담아서 전달
                        event={selectedEvent 
                            ? 
                            selectedEvent 
                            : 
                            {
                                id: null,
                                name: "",
                                startTime: "",
                                endTime: "",
                                color: "#378006",
                            }}
                        setEvent={setSelectedEvent}
                        onChange={handleChangeEvent}
                    />
                )}
            </div>
        </div>
        
    );
}
