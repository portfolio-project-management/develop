import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../Link";
import AppBarCustom from "./modules/components/AppBarCustom";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Box, Button, Container, Typography } from "@mui/material";

function ResumeEdit() {
  const navigate = useNavigate();

  const [resume, setResume] = useState({
    userId: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    technology: "",
    career: "",
    qualifications: "",
    activities: "",
    jobSelectionReason: "",
    growProcess: "",
    personalityProsCons: "",
    jobRelatedExperience: "",
  });

  const [user, setUser] = useState("");

  useEffect(() => {
    if (user !== "") {
      if (user !== "비로그인") {
        fetch(SERVER_URL + "resume/get?userId=" + user)
          .then((response) => response.json())
          .then((data) => {
            setResume({
              ...data,
              userId: user,
            });
          })
          .catch((error) => console.log(error));
      } else {
        console.log("Navigating to home page...");
        navigate("/");
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    setResume((prevResume) => ({
      ...prevResume,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSave = () => {
    fetch(SERVER_URL + "resume/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resume),
    })
      .then((response) => response.text())
      .then((data) => {
        setResume();
        navigate('/resume/view');
      });
  };

  const handleDeleteClick = () => {
    fetch(SERVER_URL + "resume/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resume),
    })
      .then((response) => response.text())
      .then((data) => {
        navigate('/resume/view');
      })
      .catch((error) => {
        console.log("삭제 실패:", error);
      });
  };

  return (
    <>
      <AppBarCustom setUser={setUser} />
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          이력서 작성
        </Typography>
        <form>
          {/* 기본 정보 그룹 */}
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
              기본 정보
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="이름"
                  fullWidth
                  variant="outlined"
                  name="name"
                  value={resume?.name || ""}
                  onChange={handleInputChange}
                  sx={{ input: { color: "#1976d2" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="이메일 (변경불가)"
                  fullWidth
                  variant="outlined"
                  name="email"
                  value={resume?.email || ""}
                  onChange={handleInputChange}
                  sx={{ input: { color: "#1976d2" } }}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="주소"
                  fullWidth
                  variant="outlined"
                  name="address"
                  value={resume?.address || ""}
                  onChange={handleInputChange}
                  sx={{ input: { color: "#1976d2" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="핸드폰 번호 또는 자택 번호"
                  fullWidth
                  variant="outlined"
                  name="phone"
                  value={resume?.phone || ""}
                  onChange={handleInputChange}
                  sx={{ input: { color: "#1976d2" } }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* 경력 및 자격증 그룹 */}
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#388e3c" }}>
              기술, 경력 & 자격증
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="기술"
                  fullWidth
                  variant="outlined"
                  name="technology"
                  value={resume?.technology || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      color: "#388e3c"
                    }
                  }}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="경력"
                  fullWidth
                  variant="outlined"
                  name="career"
                  value={resume?.career || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      color: "#388e3c"
                    }
                  }}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="자격증"
                  fullWidth
                  variant="outlined"
                  name="qualifications"
                  value={resume?.qualifications || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      color: "#388e3c"
                    }
                  }}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </Box>

          {/* 기타 정보 그룹 */}
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#f57c00" }}>
              기타 정보
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="활동"
                  fullWidth
                  variant="outlined"
                  name="activities"
                  value={resume?.activities || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      color: "#f57c00"
                    }
                  }}
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="직무 선택 이유"
                  fullWidth
                  variant="outlined"
                  name="jobSelectionReason"
                  value={resume?.jobSelectionReason || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      color: "#f57c00"
                    }
                  }}
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="자기 성장 과정"
                  fullWidth
                  variant="outlined"
                  name="growProcess"
                  value={resume?.growProcess || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      color: "#f57c00"
                    }
                  }}
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="장단점"
                  fullWidth
                  variant="outlined"
                  name="personalityProsCons"
                  value={resume?.personalityProsCons || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      color: "#f57c00"
                    }
                  }}
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="직무 관련 경험"
                  fullWidth
                  variant="outlined"
                  name="jobRelatedExperience"
                  value={resume?.jobRelatedExperience || ""}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      color: "#f57c00"
                    }
                  }}
                  multiline
                  rows={6}
                />
              </Grid>
            </Grid>
          </Box>

          {/* 저장 및 삭제 버튼 */}
          <Box sx={{ marginTop: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleOnSave}
                >
                  저장하기
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={handleDeleteClick}
                >
                  삭제하기
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default ResumeEdit;
