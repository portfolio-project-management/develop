import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import AppBarCustom from './modules/components/AppBarCustom'
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../Link';
import { useNavigate } from 'react-router-dom';
import Portfolio from './Portfolio';
import { Box, Grid } from '@mui/system';


export default function MyPage() {
    const [ openInputPhoto, setOpenInputPhoto ] = useState(false);
    const [ openPortfolio, setOpenPortfolio ] = useState(false);

    const [ photo, setPhoto ] = useState("");
    const [ file, setFile ] = useState();
    const [ user, setUser ] = useState("");

    const [ dialogInfo, setDialogInfo ] = useState("");

    const [ portfolio, setPortfolio ] = useState();
    const [ proposals, setProposals ] = useState();
    const [ userInfo, setUserInfo ] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if(user !== ""){
            if(user !== "비로그인"){ // 로그인 된 유저라면
                // 마이페이지 사진
                fetch(SERVER_URL + "user/getphoto?userId=" + user)
                .then(response => response.text())
                .then(data => {
                    setPhoto(data);
                })
                .catch(error => console.log(error))

                // 포트폴리오
                fetch(SERVER_URL + "portfolioboard/getone?userId=" + user)
                .then(respones => respones.json())
                .then(data => {
                    //console.log(data)
                    setPortfolio({
                        ...data,
                        userId:user
                    })
                })
                .catch(error => console.log(error))

                //로그인, 작성 전부 본인
                setDialogInfo({
                    loginUser : user,
                    writerUser : user,
                });

                // 제안서
                fetch(SERVER_URL + `proposal/list?userId=${user}&page=` + 0)
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data)
                    setProposals(data);  // 배열인 경우 상태에 저장
                })
                .catch((error) => console.log(error));

                //본인 정보
                fetch(SERVER_URL + `user/getInfo?userId=` + user)
                .then(response => response.json())
                .then(data => {
                    setUserInfo(data);
                })
                .catch(error => console.log(error))

                // 팀

            }else{
                //console.log("아님")
                alert("로그인 후 이용해 주세요.")
                navigate("/signin");
            }
        }
        
    },[user])

    // 마이페이지 사진 변경
    function handleChangeMainPhoto(e){

        const file = e.target.files[0];

        if (file) {
            //사진파일인지 확인
            const fileType = file.type;

            if(fileType === "image/png" || fileType === "image/jpeg" || fileType === "image/gif"){
                setFile(file);

                const reader = new FileReader();

                // 파일이 로드되었을 때 실행되는 콜백 함수
                reader.onloadend = function () {
                    const base64String = reader.result; // Base64로 인코딩된 이미지 데이터

                    //포멧에 맞추기
                    setPhoto(base64String.replace(/^data:image\/(png|jpeg);base64,/, ""));
                };
            
                // 파일을 읽어서 base64로 변환
                reader.readAsDataURL(file); // 'data:image/*;base64,' 형식으로 읽기
            }else{
                alert("png,jpeg,gif 파일만 가능합니다.");
            }
        }
    }


    //사진 삽입창 열기
    function handleOpenInputPhoto(){
        setOpenInputPhoto(true);
    }

    //사진 삽입 창 닫기
    function handleCloseInputPhoto(){
        setOpenInputPhoto(false);

        if(file){
            const formData = new FormData();

            formData.append('photo',file);
            formData.append('userId',user);
            
            //서버에 사진 저장
            fetch(SERVER_URL + "user/change/photo",{        
                method:"POST",
                body:formData
            })
            .then(response => {
                if(!response.ok){
                    alert("전송 오류 ( 사진이 저장되지 않았습니다. )")
                }
            })
            .catch(error => console.log(error))
        }
    }

    function handleOpenDialog () {
        setPortfolio({
            ...portfolio,
            view : portfolio.view+1,
        })

        setOpenPortfolio(true);
    }

    function handleCloseDialog() {
        setOpenPortfolio(false);
    }

    function clickGood(click) {
        setPortfolio({
            ...portfolio,
            goods : click ? portfolio.goods+1 : portfolio.goods-1,
        });
    }

    function handleGoMyProposal () {
        navigate(`/proposal/list/${user}`)
    }

    const handleProposalClick = (proposalId) => {
        navigate(`/proposal/view/${proposalId}`); // 제안서를 클릭하면 해당 제안서 상세 페이지로 이동
    };

    function handleGoResumeEdit () {
        navigate("/resume/edit");
    }

    function handleGoPortfolioEdit () {
        navigate("/portfolioboard/edit");
    }

    return (
        <div>
            <AppBarCustom setUser={setUser}></AppBarCustom>
            <div className='myPage_div'>
                <div className='myPage_Top_div'>
                    <div className='myPage_TopLeft_div'>
                        <div 
                            onClick={handleOpenInputPhoto}
                            style={{
                                backgroundImage:`url(${photo !== "전송오류" ? "data:image/jpeg;base64,"+photo : "/static/images/myPage_basicPhoto.jpg"})`, 
                                backgroundSize: '100% 100%',
                                border:'1px solid black', 
                                height:130,
                                margin: '20px 50px 0px 50px',
                                borderRadius:20
                            }}
                        ></div>
                        <br></br>
                        <Button color='info' onClick={handleOpenInputPhoto}>이미지 바꾸기</Button>
                        <br></br>
                        {
                            userInfo ?
                            <div style={{margin:'0 auto', paddingLeft:20, textAlign:'left'}}>
                                <p>아이디 : {userInfo.userId}</p>
                                <p>이름 : {userInfo.name}</p>
                                <p>이메일 : {userInfo.email}</p>
                                <p>폰번호 : {userInfo.phone}</p>
                            </div>
                            :
                            <p>정보를 불러오지 못했습니다.</p>
                        }
                        
                        <Button color='info' variant='contained' onClick={handleGoResumeEdit}>이력서 수정</Button>
                    </div>
                    <div className='myPage_TopMiddle_div'>
                        {
                            portfolio &&
                            portfolio.path &&
                            portfolio.path.length > 0 ?(
                                <div className='portfolio' onClick={handleOpenDialog} style={{width:300, margin:'0 auto', marginTop:30}}>                            
                                    <img src={`data:image/jpeg;base64,${portfolio.path[0]}`} alt="메인 이미지" width={300} height={187}></img>
                                    <div className="portfolioBoard_ListInfo_div">
                                        <div className="portfolioBoard_ListInfoFirst_div">
                                            <p style={{fontSize:20, fontWeight:"bold", margin:0, marginLeft:20}}>{portfolio.title} </p>
                                            <p style={{margin:20}}>작성자 : {portfolio.userId}</p>
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
                            ):(
                                <p>작성된 포트폴리오가 없습니다.</p>
                            )
                        }    
                        <br></br>
                        <br></br>
                        <br></br>
                        <Button color='info' variant='contained' onClick={handleGoPortfolioEdit}>포트폴리오 수정</Button>

                    </div>
                    <div className='myPage_TopRight_div'>
                        <p>팀 프로젝트</p>
                    </div>
                </div>
                <div className='myPage_Bottom_div'>
                    <div className='myPage_BottomTitle_div'>
                        <p>최근 제안서</p>
                        <Button color='info' variant='contained' onClick={handleGoMyProposal}>나의 제안서 보러가기</Button>
                    </div>
                    <div className='myPage_BottomContent_div'>
                        <Grid container spacing={3}>
                            {
                            proposals &&
                            proposals.length > 0 ? (
                                proposals.map((proposal, index) => {
                                    if(index < 4){
                                        return(
                                            <Grid item xs={12} sm={6} md={4} key={proposal.id}>
                                                <Card sx={{ cursor: 'pointer' }} onClick={() => handleProposalClick(proposal.id)}>
                                                <CardContent>
                                                    <Typography variant="h6">{proposal.title}</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                    예상 팀원 수: {proposal.expectedTeamMembers}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                    만료 시간: {proposal.expiredTime ? (String)(proposal.expiredTime).replace("T", " / ") : "2099-12-31 / 23:59:59"}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                    작성자 : {proposal.userId}
                                                    </Typography>
                                                </CardContent>
                                                </Card>
                                            </Grid>
                                        );
                                    }
                                })
                            ) : (
                                <Typography variant="h6" color="textSecondary">제안서가 없습니다. 새로운 제안서를 작성하세요.</Typography>
                                )
                            }
                        </Grid>
                    </div>
                </div>
            </div>

            {/* 사진 변경 팝업 */}
            <Dialog open={openInputPhoto} onClose={handleCloseInputPhoto}>
                <DialogTitle>

                </DialogTitle>
                <DialogContent>
                    <input 
                        type='file'
                        onChange={handleChangeMainPhoto} 
                        style={{
                            backgroundImage:`url(${photo ? "data:image/jpeg;base64,"+photo : "/static/images/myPage_basicPhoto.jpg"})`,
                            backgroundSize: '100% 100%',
                            width:400,
                            height:300,
                        }}>
                    </input>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" onClick={handleCloseInputPhoto}>닫기</Button>
                </DialogActions>
            </Dialog>

            {/* 포트폴리오 띄우는 팝업 */}
            <Dialog open={openPortfolio} maxWidth="lg" scroll="body" onClose={handleCloseDialog}>
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