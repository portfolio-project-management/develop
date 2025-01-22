import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        fetch(SERVER_URL +  `proposal/list?userId=${params.userId ? params.userId : "없음"}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProposals(data);
                setFilteredProposals(data); // 여러 제안서 목록을 상태에 저장
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
      // 검색 쿼리가 변경될 때마다 필터링
      console.log("Filtered Proposals:", filteredProposals);
      if (searchQuery) {
          setFilteredProposals(proposals.filter(proposal => 
              proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
          ));
          console.log("바뀜")
      } else {
        console.log("안바뀜")
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
            console.log("검색실행")
        } else {
          console.log("검색실행안됨")
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
                      제목: {proposal.title}
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
      </>
  );
}

export default ProposalList;
