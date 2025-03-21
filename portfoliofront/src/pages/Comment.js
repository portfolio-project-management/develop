// components 로 옮겨야됨

import { useEffect, useState } from "react";
import { SERVER_URL } from "../Link";
import { Button, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Comment({portfolio, loginUser}) {

    const [ comments, setComments ] = useState([]);
    
    const [ sendCommentContent,setSendCommentContent] = useState("");

    useEffect(()=>{
        // 정상적인 포트폴리오일 때 실행
        if(portfolio.id !== undefined){
            getComments();
        }
    },[portfolio])

    //댓글 정보 가져오기 ( 2번 이상 사용해서 함수로 뺌 )
    function getComments() {
        fetch(SERVER_URL + "comment/get?portfolio=" + portfolio.id)
        .then(Response => Response.json())
        .then(data => {
            setComments(data);
            //console.log(data)
        })
        .catch(error => console.log(error))
    }

    function handleDeleteComment (e){
        const id = comments[e.target.name].id;

        const copyComments = [...comments];
        copyComments.splice(e.target.name,1);

        fetch(SERVER_URL + "comment/delete?commentid=" + id)
        .then(response => response.text())
        .then(data => {
            alert(data)    
            setComments(copyComments);
        })
        .catch(error => console.log(error))
    }   

    function checkLoginUser() {
        // 정상 유저 확인
        if(loginUser !== "" && loginUser !== "비로그인"){
            // 내용 확인
            if(sendCommentContent !== ""){
                return true;
            }else{
                alert("내용을 입력해 주세요")
            }
        }else{
            alert("로그인 후 이용 가능합니다")
        }

        return false;
    }

    function handleSendComment () {
        //로그인 된 유저라면
        if(checkLoginUser()){

            const sendComment = {
                content : sendCommentContent,
                portfolioBoardId : portfolio.id,
                userId : loginUser,
            }

            fetch(SERVER_URL + "comment/add",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(sendComment)
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                //삭제된 후 댓글 정보 가져오기
                getComments();
            })
            .catch(error => console.log(error))
        }
    }

    function handleWriteComment (e) {
        setSendCommentContent(e.target.value);
    }

    return(
        <div className="comment_div">
            <div className="sendcomment_div">
                <div className="sendcommenttext_div">
                    <TextField 
                        id="outlined-basic" 
                        label={loginUser === "비로그인" ? "로그인 후 이용해 주세요" : "댓글작성"} 
                        variant="outlined" 
                        onChange={handleWriteComment} 
                        value={sendCommentContent}
                        fullWidth
                    />
                </div>
                <Button variant="outlined" color="info" onClick={handleSendComment}>전송</Button>
            </div>
            
            <hr></hr>

            {comments &&
                comments.map((comment, index) => (
                    <div key={index} className="commentsread_div">
                        <div className="commentsreadinfo_div">
                            <p style={{fontWeight:"bolder"}}>{comment.userId} <span style={{color:"rgb(201, 201, 201)"}}> - {(String)(comment.createTime).substring(0,10)} </span></p>
                            <p>{comment.content}</p>
                        </div>
                        {
                            comment.userId === loginUser ? 
                            <Button color="error" name={index} onClick={handleDeleteComment}>삭제</Button>
                            :
                            null
                        }
                    </div>
                ))
            }
        </div>
    );
}