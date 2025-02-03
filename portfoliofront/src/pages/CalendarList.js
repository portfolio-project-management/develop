import { useEffect, useState } from "react";
import AppBarCustom from "./modules/components/AppBarCustom";
import { SERVER_URL } from "../Link";
import { useNavigate } from "react-router-dom";

import CalendarPage from "./CalendarPage";

export default function CalendarList () {

    const [ user, setUser ] = useState("");
    const [ calendars, setCalendars ] = useState();
    const [ calendarInfo, setCalendarInfo ] = useState();
    const navigate = useNavigate();

    const [ openCalendar, setOpenCalendar ] = useState(false);

    const [ calendarName, setCalendarName ] = useState("");
    const [ calendarCode, setCalendarCode] = useState("");

    useEffect(() => {
        if (user !== "") {
            if (user !== "비로그인") {
                getCalendarList();
            } else {
                console.log("비로그인");
                alert("로그인 후 이용해 주세요.");
                navigate("/signin"); // 로그인 페이지로 이동
            }
        }
    }, [user]);

    function getCalendarList() {
        fetch(SERVER_URL + "calendar/getlist?userId=" + user)
        .then(response => response.json())
        .then(data => {
            console.log("서버로부터 받은 데이터:", data);
            setCalendars(data);
        })
        .catch(error => console.log(error));
    }

    function handleCreateCalendar () {
        if(calendarName !== ""){
            fetch(SERVER_URL + `calendar/create?userId=${user}&calendarName=${calendarName}`)
            .then(response => response.text())
            .then(data => {
                alert(data);
                if(data === "생성완료"){
                    getCalendarList();
                    setCalendarName("");
                }
            })
            .catch(error => console.log(error))
        }else{
            alert("이름을 입력해 주세요.")
        }
    }

    function handleChangeName (e) {
        setCalendarName(e.target.value);
    }

    function handleJoinCalendar () {
        if(calendarCode !== ""){
            fetch(SERVER_URL + `calendar/join?userId=${user}&calendarCode=${calendarCode}`)
            .then(response => response.text())
            .then(data => {
                alert(data);
                if(data === "입장완료"){
                    getCalendarList();
                    setCalendarCode("");
                }
            })
            .catch(error => console.log(error))
        }else{
            alert("코드를 입력해 주세요.")
        }
    }

    function handleChangeCalendarCode (e) {
        setCalendarCode(e.target.value);
    }

    function handleOpenCalendar (e) {
        setCalendarInfo(calendars[e.target.name]);
        setOpenCalendar(true);
    }

    function handleCloseCalendar () {
        setCalendarInfo();
        setOpenCalendar(false);
    }

    return (
        <div className="container">
            <AppBarCustom setUser={setUser} />
            {
                !openCalendar ? (
                    <div>
                        <div className="input-container">
                            <input
                                className="input-field"
                                placeholder="일정관리 이름"
                                onChange={handleChangeName}
                                value={calendarName}
                            />
                            <button className="button" onClick={handleCreateCalendar}>생성</button>
                            <br />
                            <input
                                className="input-field"
                                placeholder="초대코드 입력"
                                onChange={handleChangeCalendarCode}
                                value={calendarCode}
                            />
                            <button className="button" onClick={handleJoinCalendar}>입장</button>
                        </div>
                        
                        <div className="calendar-list">
                            <p>캘린더 리스트</p>
                            {
                                calendars && calendars.map((calendar, index) => (
                                    <div className="calendar-item" key={index}>
                                        <p>제목 : {calendar.name}</p>
                                        <p>생성자 : {calendar.createUser}</p>
                                        <button name={index} onClick={handleOpenCalendar}>입장</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="calendar-page">
                        <CalendarPage calendarInfo={calendarInfo} back={handleCloseCalendar} />
                    </div>
                )
            }
        </div>
    );
}
