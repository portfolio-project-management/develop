import React, { useState, useEffect,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, Grid, Card, CardContent, Typography, TextField } from '@mui/material';
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";

function ProposalList() {
    const navigate = useNavigate();
    const params = useParams();

    const [user, setUser] = useState("");
    const [proposals, setProposals] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // 검색 쿼리 상태 추가
    const [filteredProposals, setFilteredProposals] = useState([]);
    const ref = useRef(null);
    const [ page, setPage ] = useState(0);

    //총 페이지(객체 수) 저장
    const [ maxPage, setMaxPage ] = useState(-100);

    const [ bg, setBg ] = useState(true);

    // 페이징 기법을 위한 observer 구현
    useEffect(() => {
      //페이징 기법의 종료 지점 확인을 위한 데이터베이스 총 데이터 개수 확인
      fetch(SERVER_URL + "proposal/countpage")
      .then(response => response.text())
      .then(data => {
          //정상적인 응답일 때 페이지 수 저장 (기존에 로드된 데이터 수 만큼 제거)
          setMaxPage((Number)(data)-15);
          
        })
        .catch(error => console.log(error))
    },[])

    useEffect(() => {
        // console.log(maxPage,"최고 페이지")
        
        //탐지 객체 생성
        if(maxPage !== -100 && maxPage > 0){
            let maxPageLet = maxPage
            const observe = new IntersectionObserver(entries => {
                if(entries[0].isIntersecting){ 
                    if(maxPageLet > 0){
                        maxPageLet -= 15;

                        //20개씩 객체 가져오기
                        setPage(prevPage => prevPage + 1);
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
        }else if(maxPage !== -100 && maxPage < 15){
          setBg(false)
        }
      },[maxPage])

    useEffect(() => {
        fetch(SERVER_URL +  `proposal/list?userId=${params.userId ? params.userId : "없음"}&page=` + page)
            .then((response) => response.json())
            .then((data) => {
              if (Array.isArray(data)) {
                // console.log("Received data is an array:", data);
                setProposals([...proposals,...data]);  // 배열인 경우 상태에 저장
                setFilteredProposals([...filteredProposals,...data]); // 필터링된 제안서 목록 업데이트
              } else {
                console.error("Received data is not an array:", data);
              }
            })
            .catch((error) => console.log(error));
    }, [page]);

    useEffect(() => {
      // 검색 쿼리가 변경될 때마다 필터링
      // console.log("Filtered Proposals:", filteredProposals);
      if (searchQuery) {
          setFilteredProposals(proposals.filter(proposal => 
              proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      } else {
          setFilteredProposals(proposals); // 검색어가 없으면 모든 제안서를 다시 표시
      }
    }, [searchQuery, proposals])

    const handleProposalClick = (proposalId) => {
        navigate(`/proposal/view/${proposalId}`); // 제안서를 클릭하면 해당 제안서 상세 페이지로 이동
    };

    const handleAddProposalClick = () => {
        const proposalId = null;  // proposalId가 없거나 null일 경우
      
        if (proposalId) {
          navigate(`/proposal/edit/${proposalId}`);  // proposalId가 있을 경우 수정 화면으로 이동
        } else {
          navigate(`/proposal/edit`);  // proposalId가 없으면 새 제안서 생성 화면으로 이동
        }
      };

      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // 검색어를 상태로 저장
      };

      const handleSearch = () => {
        if (searchQuery) {
            setFilteredProposals(proposals.filter(proposal => 
                proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            setFilteredProposals(proposals); // 검색어가 없으면 모든 제안서를 다시 표시
        }
      };

      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Enter 키를 누르면 검색 실행
        }
      };
    return (
        <>
          <AppBarCustom setUser={setUser} />
          <Box sx={{ padding: 3, maxWidth: '1000px', margin: '0 auto' }}>
  {/* h2 태그와 검색창, 추가하기 버튼을 동일한 행에 배치 */}
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      {/* 검색창 */}
    <TextField
      variant="outlined"
      size="small"
      sx={{ marginRight: '10px' }}  // 검색창과 버튼 사이 간격
      placeholder="검색..."
      value={searchQuery} // 검색어 상태와 연결
      onChange={handleSearchChange} // 검색어가 변경될 때마다 상태 업데이트
      onKeyDown={handleKeyPress} // Enter 키 입력 시 검색 실행
    />
    {/* 검색 버튼 */}
    <Button
      variant="contained"
      color="primary"
      onClick={handleSearch} // 클릭 시 검색 실행
      sx={{
        fontSize: '1rem',
        padding: '8px 16px',
        height: '40px',
        minWidth: '120px',
      }}
    >
      검색
    </Button>
  </Box>
      {/* 제목 */}
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3f51b5', paddingRight:'200px' }}>
        제안서 목록
      </h2>
      {/* 제안서 추가하기 버튼 */}
      {
        params.userId === undefined || user === params.userId ? (
          <Button variant="contained" color="primary" onClick={handleAddProposalClick} 
          sx={{
            fontSize: '1.25rem',  
            padding: '12px 24px', 
            height: '48px',        
            minWidth: '150px',     
          }}
          >
            제안서 추가하기
          </Button>
        ) : null
      }
    </Box>

      {/* 제안서 리스트 출력 */}
        <Grid container spacing={3}>
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <Grid item xs={12} sm={6} md={4} key={proposal.id}>
                <Card sx={{ cursor: 'pointer' }} onClick={() => handleProposalClick(proposal.id)}>
                  <CardContent>
                    <Typography variant="h6">{proposal.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      예상 팀원 수: {proposal.expectedTeamMembers}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      만료 시간: {(String)(proposal.expiredTime).replace("T"," / ")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      작성자 : {proposal.userId}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary">제안서가 없습니다. 새로운 제안서를 작성하세요.</Typography>
          )}
        </Grid>
        </Box>

        {/* 다음 페이지를 띄우기 위한 추적되는 태그 생성 */}
        <div><img ref={ref} src={bg ? "/static/images/loading.gif" : ""}></img></div>
      </>
  );
}

export default ProposalList;
