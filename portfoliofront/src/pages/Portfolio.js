import { useEffect, useState } from "react";
import { SERVER_URL } from "../Link";

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

    useEffect(() => {
        console.log(dialogInfo);
        // 포트폴리오 정보
        fetch(SERVER_URL + "portfolioboard/getone?userId=" + dialogInfo.writerUser)
            .then(respones => respones.json())
            .then(data => {
                setPortfolio(data); 
                if(data.path){
                    setFiles(data.path);
                }
            })
            .catch(error => console.log(error))

    },[])

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
            <p>좋아요 : {portfolio.good}</p>
            <p>뷰 : {portfolio.view}</p>
            <hr></hr>
            {/* 댓글 작성 */}
            <hr></hr>
            {/* 댓글 목록 */}
        </div>
    );
}