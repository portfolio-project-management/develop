import React, { useState, useEffect } from "react";

const EventPopup = ({ isOpen, onClose, event, setEvent, onChange }) => {

  function handleSave () {
    if (!event.name || !event.startTime || !event.endTime) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    if(event.id){
        // 아이디가 있다면 데이터 수정
        onChange({
            ...event,
            doing:"수정"
        });
    }else{
        // 아이디가 없다면 데이터 생성
        onChange({
            ...event,
            doing:"생성"
        });
    }

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
        onChange({
            ...event,
            doing:"삭제"
        });
    }
  };

  if (!isOpen) return null;

  // 타임스탬프를 YYYY-MM-DD 형식으로 변환하는 함수
  function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()} // 팝업 외부 클릭 무시
      >
        <h2>{event.id ? "일정 수정" : "새 일정 추가"}</h2>
        <input
          type="text"
          placeholder="제목"
          value={event.name}
          onChange={(e) =>
            setEvent({ ...event, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="내용"
          value={event.content}
          onChange={(e) =>
            setEvent({ ...event, content: e.target.value })
          }
        />
        <input
          type="date"
          value={convertTimestampToDate(event.startTime)}
          onChange={(e) =>
            setEvent({ ...event, startTime: e.target.value })
          }
        />
        <input
          type="date"
          value={convertTimestampToDate(event.endTime)}
          onChange={(e) =>
            setEvent({ ...event, endTime: e.target.value })
          }
        />
        <input
          type="color"
          value={event.color}
          onChange={(e) =>
            setEvent({ ...event, color: e.target.value })
          }
        />
        <div>
          <button onClick={handleSave}>
            {event.id ? "수정" : "추가"}
          </button>
            {event.id && (
                <button
                onClick={handleDelete}
                style={{ backgroundColor: "#dc3545", color: "white" }}
                >
                삭제
                </button>
            )}
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
