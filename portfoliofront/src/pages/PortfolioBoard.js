import { useState } from "react";
import { SERVER_URL } from "../Link";


export default function PortfolioBoard(){
    // 파일 저장
    const [ files, setFiles ] = useState([]);
    const [ portfolio, setPortfolio ] = useState({
        id:0,
        title:"",
        view:0,
        userId:"",
        path:[],
        goods:0
    });

    function handleUploadFiles (e) {
        setFiles(Array.from(e.target.files));
    }

    function handleSavePortfolio() {
        if(files.length > 0){ // 파일이 존재하면
            const formData = new FormData();

            // 포트폴리오 JSON으로 변환 후 폼에 넣기
            formData.append('portfolio',JSON.stringify(portfolio));
            
            // 파일을 하나씩 FormData에 추가
            files.forEach(file => {
                formData.append('files', file); // 파일 하나씩 추가
            });

            fetch(SERVER_URL + "portfolioboard/add",{
                method:"POST",
                body:formData
            })
            .then(respones => respones.text())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error))

        }
    }

    return(
        <div>
            <input type="file" multiple onChange={handleUploadFiles}></input>
            <button onClick={handleSavePortfolio}>파일 업로드</button>
        </div>
    );
}