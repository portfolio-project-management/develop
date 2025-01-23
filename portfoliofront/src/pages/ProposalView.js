import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Grid } from '@mui/material';
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";

function ProposalView() {
  const navigate = useNavigate();
  const params = useParams();

  const [proposal, setProposal] = useState({
    userId: "",
    title: "",
    expectedTeamMembers: 0,
    expectedTechnologyStack: "",
    plan: "",
    content: "",
    createdTime: "",
    expiredTime: ""
  })

  const [user, setUser] = useState("");

  useEffect(() => {
    if (user !== "") {
      if (user !== "비로그인") {
        fetch(SERVER_URL + "proposal/get?proposalId=" + params.proposalId)
          .then((response) => response.json())
          .then((data) => {
            setProposal(data);
          })
          .catch((error) => console.log(error));
      } else {
        console.log("Navigating to home page...");
        navigate("/");
      }
    }
  }, [user]);

  const handleEditClick = () => {
    navigate(`/proposal/edit/${params.proposalId}`);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleButtonClick = () => {
    navigate('/resume/view');
  }

  const handleListClick = () => {
    navigate('/proposal/list');
  }
  return (
    <>
      <AppBarCustom setUser={setUser} />
      <Box sx={{ padding: 3, maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3f51b5', marginBottom: '50px' }}>제안서 보기</h2>
        <Grid container spacing={1} alignItems="center" marginBottom={10}>
          <Grid item xs={6}>
            <Button
              variant="text"
              color="primary"
              sx={{
                backgroundColor: '#90caf9',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  color: '#ffffff',
                },
              }}
              onClick={handleButtonClick}
            >
              개인정보(이력서) 페이지로 이동하기
            </Button>
          </Grid>
          {/* 등록시간과 만료시간은 오른쪽으로 배치 */}
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="등록 시간"
                  value={(String(proposal?.createdTime || "")).substring(0, 10) + " / " + (String(proposal?.createdTime || "")).substring(11, 19)}
                  variant="outlined"
                  disabled
                  sx={{ marginBottom: 2, width: '100%' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="만료 시간"
                  value={(String)(proposal.expiredTime).replace("T", " / ")}
                  disabled
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: 2, width: '100%' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center" marginBottom={5}>
          <Grid item xs={6}>
            <TextField
              label="제목"
              value={proposal.title}
              disabled
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="예상 팀원 수"
              value={proposal.expectedTeamMembers}
              disabled
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <TextField
          label="예상 기술 스택"
          value={proposal.expectedTechnologyStack}
          disabled
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 5 }}
          multiline
          rows={4}
        />
        <TextField
          label="계획"
          value={proposal.plan}
          disabled
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 5 }}
          multiline
          rows={6}
        />
        <TextField
          label="내용"
          value={proposal.content}
          disabled
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 5 }}
          multiline
          rows={12}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {user === proposal.userId ?
          <Button variant="contained" color="primary" size="large" onClick={handleEditClick}>
            수정하기
          </Button>
          :
          null
        }
        <Button variant="outlined" color="success" size="large" onClick={handleListClick}>
          제안서 목록 페이지로 돌아가기
        </Button>
        <Button variant="outlined" color="error" size="large" onClick={handleGoHome}>
          메인 페이지로 돌아가기
        </Button>
      </Box>
    </>
  )
}
export default ProposalView