import { useEffect, useState } from "react";
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-final-form";


export default function PortfolioBoardEdit(){
    // 파일 저장
    const [ files, setFiles ] = useState([]);
    const [ portfolio, setPortfolio ] = useState({
        id:0,
        title:"sdasd",
        view:0,
        userId:"",
        goods:0,
    });
    const [ user, setUser ] = useState("");

    const navigate = useNavigate();


    useEffect(()=>{
        if(user !== ""){
            if(user !== "비로그인"){ // 로그인 된 유저라면
                console.log("들엉홈")
                // 포트폴리오 정보 가져오기
                let path = [];

                fetch(SERVER_URL + "portfolioboard/getone?userId=" + user)
                .then(respones => respones.json())
                .then(data => {
                    setPortfolio({
                        ...data,
                        userId:user
                    });
                })
                .catch(error => console.log(error))

                //파일 정보 가져오기
                fetch(SERVER_URL + "portfolioboard/getfiles?userId=" + user)
                .then(respones => respones.json())
                .then(data => {
                    setFiles(data);
                    console.log(data)
                })
                .catch(error => console.log(error))
            }else{
                console.log("아님")
                alert("로그인 후 이용해 주세요.")
                navigate("/signin");
            }
        }
    },[user])

    function handleUploadFiles (e, index) {
        const copyFiles = [...files];

        const file = e.target.files[0];

        if (file) {
            //사진파일인지 확인
            const fileType = file.type;

            if(fileType === "image/png" || fileType === "image/jpeg" || fileType === "image/gif"){
                const reader = new FileReader();

                // 파일이 로드되었을 때 실행되는 콜백 함수
                reader.onloadend = function () {
                    const base64String = reader.result; // Base64로 인코딩된 이미지 데이터


                    //포멧에 맞추기
                    copyFiles[index] = base64String.replace(/^data:image\/(png|jpeg);base64,/, "");;
                    setFiles(copyFiles);
                };
            
                // 파일을 읽어서 base64로 변환
                reader.readAsDataURL(file); // 'data:image/*;base64,' 형식으로 읽기
            }else{
                alert("png,jpeg,gif 파일만 가능합니다.");
            }
        }

    }

    //저장
    function handleSavePortfolio() {
        if(files.length > 0){ // 파일이 존재하면

            const formData = new FormData();

            // 포트폴리오 JSON으로 변환 후 폼에 넣기
            formData.append('portfolio',JSON.stringify(portfolio));
            

            // Base64 문자열로 변환된 파일을 재 변환
            files.forEach((fileBase64, index) => {
                console.log(fileBase64);
                if(fileBase64 !== ""){ // 사진이 없는 배열은 무시
                    // Base64 문자열에서 "data:image/*;base64," 부분 제거
                    const file = base64ToFile(fileBase64, `file_${index}.jpg`); // 파일 이름 지정

                    formData.append('files', file); // 변환된 File 객체를 추가
                }
            });


            // 서버에 저장값 전송
            fetch(SERVER_URL + "portfolioboard/add",{
                method:"POST",
                body:formData
            })
            .then(respones => respones.text())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error))

        }else{
            alert("파일이 존재하지 않습니다.");
        }
    }

    // 64비트 파일 -> 일반 파일 변환
    function base64ToFile(base64String, fileName) {
        const byteCharacters = atob(base64String); // Base64 문자열을 디코딩
        const byteArrays = [];
    
        // Base64 데이터를 바이트 배열로 변환
        for (let offset = 0; offset < byteCharacters.length; offset++) {
            byteArrays.push(byteCharacters.charCodeAt(offset));
        }
    
        // Blob 생성
        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: "image/jpeg" }); // 또는 MIME 타입에 맞게 지정
    
        // Blob을 File로 변환
        const file = new File([blob], fileName, { type: "image/jpeg" }); // 확장자와 MIME 타입을 맞게 지정
        return file;
    }

    function handleAddfile() {
        //최대 10개 까지만 받기
        if(files.length < 10){
            setFiles([...files,""]);
        }
    }

    return(
        <div>
            <AppBarCustom  setUser={setUser}></AppBarCustom>
            <button onClick={handleSavePortfolio}>파일 업로드</button>
            <button onClick={handleAddfile}>파일 업로드 자리 늘리기</button>
            {files.map((file,index)=>(
                <div>
                    <input 
                        type="file" 
                        name={index} 
                        onChange={(e) => handleUploadFiles(e, index)} 
                        onDrop={(e) => handleUploadFiles(e, index)}  
                        style={{
                            backgroundImage: file ? `url(data:image/jpeg;base64,${file})` : 'none',
                            backgroundSize: 'cover', // 배경 이미지 크기 조정
                            backgroundPosition: 'center', // 배경 이미지 위치 설정
                            width: '800px',
                            height: '500px',
                            border: '1px solid #ccc', // 스타일 추가 (선택사항)
                        }}></input>
                    {/* <img src={`data:image/jpeg;base64,${file}`} width={700} height={500}></img> */}
                </div>
            ))}
        </div>
    );
}