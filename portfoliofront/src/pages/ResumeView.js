import { useEffect, useState } from "react";
import { SERVER_URL } from "../Link"; // 서버 URL import
import AppBarCustom from "./modules/components/AppBarCustom"; // AppBarCustom 컴포넌트
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography, Box, TextField } from '@mui/material';

function ResumeView() {
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
        if(user !== ""){
            if(user !== "비로그인"){
                fetch(SERVER_URL + "resume/get?userId=" + user)
                .then(response => response.json())
                .then(data => {
                    setResume({
                        ...data,
                        userId:user,
                    })
                })
                .catch(error => console.log(error))
            }else{
                console.log("Navigating to home page..."); // 정보가 없거나, 강제로 url로 들어온 사용자
                navigate('/')
            }
        }
    },[user])

    const handleEditClick = () => {
        navigate(`/resume/edit`);
      };

    const handleGoHome = () => {
    navigate("/"); 
    };

    const handleListClick= () => {
      navigate('/proposal/list');
    }
  return (
    <>
      <AppBarCustom setUser={setUser} /> {/* AppBarCustom 컴포넌트 */}
      <Box sx={{ padding: 4, maxWidth: '50%', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom color="primary">
        {resume.name}의 이력서
      </Typography>
      <Box sx={{ marginBottom: 4, padding: 3, borderRadius: 2, boxShadow: 1, backgroundColor: '#fafafa' }}>
        <Typography variant="h6" gutterBottom color="secondary">
          기본 정보
        </Typography>
        <Box sx={{ marginBottom: 3, padding: 3, borderRadius: 2, boxShadow: 1, backgroundColor: '#ffffff' }}>
          <Typography variant="h6" gutterBottom>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="이름"
                value={resume.name}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#1976d2'
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="이메일"
                value={resume.email}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#1976d2'
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="주소"
                value={resume.address}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#1976d2'
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="핸드폰 번호 또는 자택 번호"
                value={resume.phone}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#1976d2'
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ marginBottom: 4, padding: 3, borderRadius: 2, boxShadow: 2, backgroundColor: '#fafafa' }}>
        <Typography variant="h6" gutterBottom color="secondary">
          상세 정보
        </Typography>
        <Box sx={{ marginBottom: 3, padding: 3, borderRadius: 2, boxShadow: 1, backgroundColor: '#ffffff' }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#388e3c" }}>
            기술, 경력 & 자격증
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="기술"
                value={resume.technology}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#388e3c'
                  },
                }}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="경력"
                value={resume.career}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#388e3c'
                  },
                }}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="자격증"
                value={resume.qualifications}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#388e3c'
                  },
                }}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 1, backgroundColor: '#ffffff' }}>
          <Typography variant="h6" gutterBottom sx={{ color:  "#f57c00" }}>
            기타 정보
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="활동"
                value={resume.activities}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#f57c00'
                  },
                }}
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="직무 선택 이유"
                value={resume.jobSelectionReason}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#f57c00'
                  },
                }}
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="자기 성장 과정"
                value={resume.growProcess}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#f57c00'
                  },
                }}
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="장단점"
                value={resume.personalityProsCons}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#f57c00'
                  },
                }}
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="직무 관련 경험"
                value={resume.jobRelatedExperience}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  marginBottom: 2,
                  '& .MuiInputBase-root.Mui-disabled': {
                    backgroundColor: '#f0f0f0'
                  },
                  '& .MuiFormLabel-root.Mui-disabled': {
                    color: '#f57c00'
                  },
                }}
                multiline
                rows={6}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" size="large" onClick={handleEditClick}>
          수정하기
        </Button>
        <Button variant="outlined" color="success" size="large" onClick={handleListClick}>
          제안서 목록 페이지로 돌아가기
        </Button>
        <Button variant="outlined" color="error" size="large" onClick={handleGoHome}>
          메인 페이지로 돌아가기
        </Button>
      </Box>
      </Box>
      </>
  );
}

export default ResumeView;
