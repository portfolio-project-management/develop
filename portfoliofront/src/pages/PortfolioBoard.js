import { useEffect, useRef, useState } from "react";
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Portfolio from './Portfolio';

export default function PortfolioBoard() {

    const [ portfolioList, setPortfolioList ] = useState([]);
    const [ user, setUser ] = useState("");
    const [ open, setOpen ] = useState(false);
    const ref = useRef(null);
    const [ page, setPage ] = useState(0);

    //총 페이지(객체 수) 저장
    const [ maxPage, setMaxPage ] = useState(-100);

    const [ bg, setBg ] = useState(true);

    // 팝업에서 필요한 로그인한 사람 , 작성한 사람 userId
    const [ dialogInfo, setDialogInfo ] = useState({
        loginUser : "",
        writerUser : "",
    }); 

    // 페이징 기법을 위한 observer 구현
    useEffect(() => {
        //페이징 기법의 종료 지점 확인을 위한 데이터베이스 총 데이터 개수 확인
        fetch(SERVER_URL + "portfolioboard/countpage")
        .then(response => response.text())
        .then(data => {
            
            //정상적인 응답일 때 페이지 수 저장 (기존에 로드된 데이터 수 만큼 제거)
            setMaxPage((Number)(data)-20);
            
        })
        .catch(error => console.log(error))
    },[])

    useEffect(() => {
        //console.log(maxPage,"최고 페이지")

        //탐지 객체 생성
        if(maxPage !== -100 && maxPage > 20){
            let maxPageLet = maxPage

            const observe = new IntersectionObserver(entries => {
                if(entries[0].isIntersecting){ 
                    if(maxPageLet > 0){
                        maxPageLet -= 20;

                        //20개씩 객체 가져오기
                        setPage(prevTest => (prevTest+1));

                    }else{
                        // 마지막 페이지일 시 문구 띄우고, 배경 삭제, 추적 해제
                        alert("마지막 페이지 입니다.")
                        setBg(false)
                        observe.unobserve(ref.current);
                    }
                }
            }, { threshold : 1 });

            //탐지할 객체 지정
            observe.observe(ref.current);

            //이전 탐지 객체 해제
            return() => {
                if(ref.current){
                    observe.unobserve(ref.current);
                }
            }
        }else{
            setBg(false)
        }
    },[maxPage])

    useEffect(() => {
        // 각 페이지 가져오기
        fetch(SERVER_URL + "portfolioboard/get?page=" + page)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            setPortfolioList(prevTest => ([...prevTest,...data]));
        })
        .catch(error => console.log(error))
    },[page])

    function handleOpenDialog(e) {
        //팝업창을 열고 해당 포트폴리오 특정
        setDialogInfo({
            loginUser : user,
            writerUser : portfolioList[e.currentTarget.dataset.index].userId,
        });
        
        //누른 포트폴리오 조회수 증가
        fetch(SERVER_URL + "portfolioboard/addview?userId=" + portfolioList[e.currentTarget.dataset.index].userId)
        .catch(error => console.log(error))
        
        const copyPortfolioList = [...portfolioList];
        copyPortfolioList[e.currentTarget.dataset.index].view++;
        setPortfolioList(copyPortfolioList);

        setOpen(true);
    }

    function handleCloseDialog() {
        setOpen(false);
    }

    //팝업창에서 좋아요 누를 때 실행
    function clickGood(click) {
        const copyPortfolioList = [...portfolioList];

        copyPortfolioList.map((portfolio) => {
            if(portfolio.userId === dialogInfo.writerUser){
                click ? portfolio.goods++ : portfolio.goods--;
            }
            return(portfolio);
        })

        setPortfolioList(copyPortfolioList);

    }

    return(
        <div >
            <AppBarCustom setUser={setUser}></AppBarCustom>
            <div className="portfolioBoard_div">
                <div className="portfolioBoard_List_div">
                {portfolioList && 
                    portfolioList.map((portfolio,index) => (
                        <div key={index} className='portfolio' data-index={index} onClick={handleOpenDialog}>
                            <img src={`data:image/jpeg;base64,${portfolio.mainFile}`} alt="메인 이미지" width={300} height={187}></img>
                            <div className="portfolioBoard_ListInfo_div">
                                <div className="portfolioBoard_ListInfoFirst_div">
                                    <p style={{fontSize:20, fontWeight:"bold", margin:0, marginLeft:20}}>{portfolio.title} </p>
                                    <p style={{margin:20}}>{portfolio.userId}</p>
                                </div>
                                <div className="portfolioBoard_ListInfoSecond_div">
                                    <p style={{fontSize:15, margin:0, display:"flex", justifyContent:"center"}}>
                                        <img src="/static/images/good_icon.png" style={{marginRight:20}}></img>
                                        {portfolio.goods}
                                    </p>
                                    <br></br>
                                    <p style={{fontSize:15, margin:0, display:"flex", justifyContent:"center"}}>
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
            {/* 다음 페이지를 띄우기 위한 추적되는 태그 생성 */}
            <div><img src={bg ? "/static/images/loading.gif" : ""}></img></div>

            <Dialog open={open} maxWidth="lg" scroll="body" onClose={handleCloseDialog}>
                {/* <DialogTitle>
                    <p>asdasd</p>
                </DialogTitle> */}
                <DialogContent>
                    <Portfolio dialogInfo={dialogInfo} clickGood={clickGood} ></Portfolio>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" onClick={handleCloseDialog}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}