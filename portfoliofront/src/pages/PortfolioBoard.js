import { useEffect, useState } from "react";
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Portfolio from './Portfolio';

export default function PortfolioBoard() {

    const [ portfolioList, setPortfolioList ] = useState([{}]);
    const [ user, setUser ] = useState("");
    const [ open, setOpen ] = useState(false);

    // 팝업에서 필요한 로그인한 사람 , 작성한 사람 userId
    const [ dialogInfo, setDialogInfo ] = useState({
        loginUser : "",
        writerUser : "",
    }); 

    useEffect(() => {
        // 모든 포트폴리오 제목, 유저, 사진 가져오기
        fetch(SERVER_URL + "portfolioboard/get")
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            setPortfolioList(data);
        })
        .catch(error => console.log(error))
    },[])

    function handleOpenDialog(e) {
        //팝업창을 열고 해당 포트폴리오 특정
        setDialogInfo({
            loginUser : user,
            writerUser : portfolioList[e.currentTarget.dataset.index].userId,
        });
        
        //누른 포트폴리오 조회수 증가
        fetch(SERVER_URL + "portfolioboard/addview?userId=" + portfolioList[e.currentTarget.dataset.index].userId)
        .catch(error => console.log(error))
        
        setOpen(true);
    }

    function handleCloseDialog() {
        setOpen(false);
    }

    return(
        <div >
            <AppBarCustom setUser={setUser}></AppBarCustom>
            <div className="portfolioBoard_div">
                <div className="portfolioBoard_List_div">
                {portfolioList && 
                    portfolioList.map((portfolio,index) => (
                        <div key={index} className='portfolio' data-index={index} onClick={handleOpenDialog}>
                            <img src={`data:image/jpeg;base64,${portfolio.mainFile}`} alt="메인 이미지" width={500} height={312}></img>
                            <div className="portfolioBoard_ListInfo_div">
                                <div className="portfolioBoard_ListInfoFirst_div">
                                    <p style={{fontSize:25, fontWeight:"bold", margin:0, marginLeft:20}}>{portfolio.title} </p>
                                    <p style={{margin:20}}>{portfolio.userId}</p>
                                </div>
                                <div className="portfolioBoard_ListInfoSecond_div">
                                    <p style={{fontSize:20, margin:0, display:"flex", justifyContent:"center"}}>
                                        <img src="/static/images/good_icon.png" style={{marginRight:20}}></img>
                                        {portfolio.goods}
                                    </p>
                                    <br></br>
                                    <p style={{fontSize:20, margin:0, display:"flex", justifyContent:"center"}}>
                                        <img src="/static/images/view_icon.png" style={{marginRight:20}}></img>
                                        {portfolio.view}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            <Dialog open={open} maxWidth="lg" scroll="body" onClose={handleCloseDialog}>
                {/* <DialogTitle>
                    <p>asdasd</p>
                </DialogTitle> */}
                <DialogContent>
                    <Portfolio dialogInfo={dialogInfo}></Portfolio>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" onClick={handleCloseDialog}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}