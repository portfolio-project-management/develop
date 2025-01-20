// components 로 옮겨야됨

import { useEffect, useState } from "react";
import { SERVER_URL } from "../Link";
import Comment from "./Comment";

// 비 로그인 - 볼 수만 있게
// 로그인 - 보고, 좋아요, 댓글
export default function Portfolio ({dialogInfo}) {

    // 받는 인자 구성 요소
    // dialongInfo{
    //     loginUser : 로그인중인 유저 아이디,
    //     writerUser : 해당 포트폴리오 작성 유저 아이디,
    // }

    const [ portfolio, setPortfolio ] = useState({});
    const [ files, setFiles ] = useState([]);
    const [ good,setGood ] = useState(false);

    useEffect(() => {
        //console.log(dialogInfo);
        // 포트폴리오 정보

        fetch(SERVER_URL + "portfolioboard/getone?userId=" + dialogInfo.writerUser)
            .then(respones => respones.json())
            .then(data => {
                setPortfolio(data); 
                if(data.path){
                    setFiles(data.path);
                }
                if(data.id){
                    checkGood(data.id);
                }
            })
            .catch(error => console.log(error))
    },[dialogInfo])

    function checkGood(id) {
        //만약 로그인된 유저라면 좋아요 여부 확인
        if(dialogInfo.loginUser !== "" && dialogInfo.loginUser !== "비로그인"){
            fetch(SERVER_URL + "good/check?userId=" + dialogInfo.loginUser + "&portfolioBoardId=" + id)
            .then(response => response.text())
            .then(data => {
                //이미 좋아요를 누른 사람
                if(data === "true"){
                    setGood(true);
                }else{
                    setGood(false);
                }
            })
            .catch(error => console.log(error))
        }
    }

    function handleChangeGood(){
        //만약 로그인된 유저라면 좋아요 여부 확인
        if(dialogInfo.loginUser !== "" && dialogInfo.loginUser !== "비로그인"){

            // 좋아요 증가 또는 감소
            good ? setPortfolio({...portfolio, goods : portfolio.goods-1}) : setPortfolio({...portfolio, goods : portfolio.goods+1});

            // 좋아요 요청 서버에 전송
            fetch(SERVER_URL + `good/${good ? "cancle" : "add"}?userId=` + dialogInfo.loginUser + "&portfolioBoardId=" + portfolio.id)
            .then(respones => {
                if(respones.ok){
                    setGood(!good);
                }
            })
            .catch(error => console.log(error))
        }else{
            alert("로그인 후 이용 가능합니다.")
        }
    }

    return (
        <div>
            {files &&
                files.map((file,index) => (
                    <div key={index}>
                        <img src={`data:image/jpeg;base64,${file}`} width={1100} style={{height: 'auto'}}></img>
                    </div>
                ))
            }
            <hr></hr>
            {/* 작성 유저 , 좋아요, 뷰 ( 디자인 필요 )*/}
            <p>작성자 : {portfolio.userId}</p>
            <p>좋아요 : {portfolio.goods}</p>
            <p>뷰 : {portfolio.view}</p>

            {good ? 
            <img src="/static/images/good_true.png" width={50} onClick={handleChangeGood} ></img>
            :
            <img src="/static/images/good_false.png" width={50} onClick={handleChangeGood} ></img>
            }
            <hr></hr>

                <Comment portfolio={portfolio} loginUser={dialogInfo.loginUser}></Comment>
            {/* 댓글 작성,목록 */}
            
        </div>
    );
}