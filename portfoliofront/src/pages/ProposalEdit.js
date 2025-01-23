import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Grid } from '@mui/material';
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";


function ProposalEdit() {
  const navigate = useNavigate()
  const params = useParams();  // URL에서 제안서 ID를 받기 위한 useParams
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
        fetch(SERVER_URL + `proposal/get?proposalId=${params.proposalId ? params.proposalId : "없음"}`)
          .then((response) => response.json())
          .then((data) => {
            //만약 잘못된 접근 ( 작성자가 아니면 )
            if (data.userId !== null && data.userId !== user) {
              alert("잘못된 접근입니다.");
              navigate("/");
            } else { // 작성자일 시
              setProposal({
                ...data,
                userId: user,
              });
            }
          })
          .catch((error) => console.log(error));
      } else {
        console.log("Navigating to home page...");
        alert("로그인 후 이용가능합니다.")
        navigate("/signin");
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 예상 팀원 수가 음수로 입력되면 0으로 설정
    if (name === "expectedTeamMembers" && value < 0) {
      setProposal((prevProposal) => ({
        ...prevProposal,
        [name]: 0,  // 음수일 경우 0으로 설정
      }));
    } else {
      setProposal((prevProposal) => ({
        ...prevProposal,
        [name]: value,
      }));
    }
  };

  const handleOnSave = () => {
    fetch(SERVER_URL + "proposal/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proposal),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data)
        setProposal();
        navigate('/proposal/list'); // 제안서 작성 후 목록 페이지로 이동
      })
      .catch((error) => {
        console.error("Failed to save proposal:", error);
      });
  };

  const handleDeleteClick = () => {
    if (params.proposalId) {
      fetch(SERVER_URL + `proposal/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposal)
      })
        .then((response) => {
          if (response.ok) {
            navigate("/proposal/list");
          }
        })// 삭제 후 제안서 목록 페이지로 이동
        .catch((error) => {
          console.error("Failed to delete proposal:", error);
        });
    } else {
      navigate("/proposal/list");
    }
  };
  return (
    <>
      <AppBarCustom setUser={setUser} />
      <Box sx={{ padding: 3, maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3f51b5', marginBottom: '50px' }}>제안서 편집하기</h2>
        <form>
          <Grid container spacing={1} alignItems="center" marginBottom={10}>
            {/* 등록시간과 만료시간은 오른쪽으로 배치 */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    label="등록 시간"
                    name="createdTime"
                    value={(String(proposal?.createdTime || "")).substring(0, 10) + " / " + (String(proposal?.createdTime || "")).substring(11, 19)}
                    disabled
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2, width: '100%' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="만료 시간"
                    name="expiredTime"
                    type="datetime-local"
                    value={proposal?.expiredTime || ""}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: 2, width: '100%' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center" marginBottom={5}>
            <Grid item xs={6}>
              <TextField
                label="제목"
                name="title"
                value={proposal?.title || ""}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="예상 팀원 수"
                name="expectedTeamMembers"
                type="number"
                value={proposal?.expectedTeamMembers || 0}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  inputMode: 'numeric',
                  min: 0,
                }}
              />
            </Grid>
          </Grid>
          <TextField
            label="예상 기술 스택"
            name="expectedTechnologyStack"
            value={proposal?.expectedTechnologyStack || ""}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 5 }}
            multiline
            rows={4}
          />
          <TextField
            label="계획"
            name="plan"
            value={proposal?.plan || ""}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 5 }}
            multiline
            rows={6}
          />
          <TextField
            label="내용"
            name="content"
            value={proposal?.content || ""}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 5 }}
            multiline
            rows={12}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnSave}
            sx={{ marginRight: 2 }}
          >
            저장하기
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteClick}
          >
            삭제하기
          </Button>
        </form>
      </Box>
    </>
  )
}
export default ProposalEdit