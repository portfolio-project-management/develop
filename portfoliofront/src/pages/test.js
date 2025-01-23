import { useEffect, useRef, useState } from "react";


export default function Test(){

    const ref = useRef(null);

    const [test, setTest] = useState([]);

    useEffect(() => {
        console.log("실행중")

        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){

                //이전상태를 기준으로 업데이트
                setTest(prevTest => [...prevTest, "1"]);

                alert("안녕")
            }
        }, { threshold : 0.1 });

        observer.observe(ref.current);

        return() => {
            if(ref.current) {
                console.log("제거됨")
                observer.unobserve(ref.current);
            }
        }
        
    
    },[])

    return(
        <div>
            <div style={{ height: "100vh" }}>위는 빈 화면입니다.</div>
            {
                test &&
                test.map(() => (
                    <div style={{ height: "100vh" }}>추가화면 입니다.</div>
                ))
            }
            <div ref={ref} style={{ height: "100vh" }}>
                여기에 스크롤을 내리면 "안녕"이라는 알림이 뜹니다.
            </div>
        </div>
    );
}