
import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Link';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from '@mui/material';

import AppBarCustom from './modules/components/AppBarCustom'; 

function SignUp() {
  const [sent, setSent] = React.useState(false);
  const [ user, setUser ] = React.useState({
    userId:"",
    passWord:"",
    passWordCheck:"",
    email:"",
    emailCheck:false,
    name:"",
    phone:"",
    address:""
  })

  const navigate = useNavigate();

  const [otp, setOTP] = React.useState();
  const [checkOTP, setCheckOTP] = React.useState();

  const [ openEmailAccess, setOpenEmaillAccess] = React.useState(false);
  
  const params = useParams();

  const validate = (values) => {
    const errors = required(['name','userId','passWord','passWordCheck','phone','address', 'email'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  
    React.useEffect(() => {
      if(params.hash !== undefined){ // 해시 파라미터가 존재할 때
        fetch(SERVER_URL + "user/checkemail?hash=" + params.hash)
        .then(response => response.text())
        .then(data => {
            if(data === "정보없음"){
                // 정상진행
            }else{
                setUser({
                    ...user,
                    email:data,
                    emailCheck:true,
                })
            }
        })
        .catch(error => console.log(error))
      }
    },[]);

  const handleSubmit = () => {
    setSent(true);
  };

  function handleOnChange(e) {
    setUser({
        ...user,
        [e.target.name] : e.target.value,
    })
  }

  function handleTrySignUP() {
    if(user.name === ""){
        alert("이름을 입력해 주세요");
    }else if(user.userId === ""){
        alert("아이디를 입력해 주세요");
    }else if(user.passWord === ""){
        alert("비밀번호를 입력해 주세요");
    }else if(user.passWord !== user.passWordCheck){
        alert("비밀번호와 비밀번호 확인이 다릅니다");
    }else if(user.phone === ""){
      alert("폰번호를 입력해 주세요");
    }else if(user.address === ""){
      alert("주소를 입력해 주세요");
    }else if(user.emailCheck !== true){
        alert("이메일 인증을 진행해 주세요");
    }else{
        // 회원가입 시도
        fetch(SERVER_URL + "user/signup", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user),
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if(data === "성공"){
                navigate('/signin');
            }else if(data === "실패"){
              setUser({
                  userId:"",
                  passWord:"",
                  passWordCheck:"",
                  email:"",
                  emailCheck:false,
                  name:"",
                  phone:"",
                  address:""
              });
            }
        })
        .catch(error => console.log(error))
    }
  }

  function handleAccessEmail() {
    //이메일 인증 시도
    setUser({
        ...user,
        email:"",
    })
    setCheckOTP();
    setOpenEmaillAccess(true);
  }

  function handleOnChangeOTP (e) {
    setOTP(e.target.value);
  }

  function handleSendOTP () {
    if(user.email === ""){
        alert("이메일을 입력해 주세요")
    }else{
        fetch(SERVER_URL + "user/sendotp")
        .then(response => response.text())
        .then(data => {
            alert("OTP : " + data);
            console.log(data);
            setCheckOTP(data);

            //임시
            setOTP(data);
        })
        .catch(error => console.log(error))
    }
  }

  function handleCheckOTP () {
    if(checkOTP === otp && checkOTP !== undefined){
        alert("인증이 완료되었습니다");
        setUser({
            ...user,
            emailCheck:true,
        })
        setOpenEmaillAccess(false);
    }else{
        alert("OTP가 일치하지 않습니다");
        setOTP();
    }
  }

  return (
    <React.Fragment>

      <Dialog open={openEmailAccess}>
          <DialogTitle>
              <p>이메일 인증 진행</p>
          </DialogTitle>
          <DialogContent>
              <input placeholder='이메일 입력' type='text' name="email" value={user.email} onChange={handleOnChange}></input>
              <br></br>
              <p>OTP 입력</p>
              <input placeholder='OTP 입력' type='text' value={otp} onChange={handleOnChangeOTP}></input>
          </DialogContent>
          <DialogActions>
              <button onClick={handleSendOTP}>OTP 받기</button>
              <button onClick={handleCheckOTP}>인증확인</button>
          </DialogActions>
      </Dialog>

      <AppBarCustom ></AppBarCustom>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            회원가입
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/signin" underline="always">
              이미 회원이신가요?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <TextField
                label="name"
                fullWidth
                margin="normal"
                name='name'
                value={user.name}  // `user.name`을 직접 사용
                onChange={handleOnChange}  // 상태 업데이트 함수 사용
                disabled={submitting || sent}
              />

              <TextField
                label="userId"
                fullWidth
                margin="normal"
                name='userId'
                value={user.userId}  // `user.name`을 직접 사용
                onChange={handleOnChange}  // 상태 업데이트 함수 사용
                disabled={submitting || sent}
              />

              <TextField
                label="password"
                fullWidth
                margin="normal"
                name='passWord'
                type="password"
                value={user.passWord}  // `user.name`을 직접 사용
                onChange={handleOnChange}  // 상태 업데이트 함수 사용
                disabled={submitting || sent}
              />

              <TextField
                label="password_check"
                fullWidth
                margin="normal"
                name='passWordCheck'
                type="password"
                value={user.passWordCheck}  // `user.name`을 직접 사용
                onChange={handleOnChange}  // 상태 업데이트 함수 사용
                disabled={submitting || sent}
              />

              <TextField
                label="phone"
                fullWidth
                margin="normal"
                name='phone'
                type="text"
                value={user.phone}  // `user.name`을 직접 사용
                onChange={handleOnChange}  // 상태 업데이트 함수 사용
                disabled={submitting || sent}
              />

              <TextField
                label="address"
                fullWidth
                margin="normal"
                name='address'
                type="text"
                value={user.address}  // `user.name`을 직접 사용
                onChange={handleOnChange}  // 상태 업데이트 함수 사용
                disabled={submitting || sent}
              />
              
              <FormControlLabel
                disabled
                control={<Checkbox checked={user.emailCheck} />}
                label={user.emailCheck ? user.email : "이메일 인증을 진행해 주세요"}
              />
              
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="info"
                fullWidth
                onClick={handleAccessEmail}
              >
                {submitting || sent ? 'In progress…' : '이메일 인증'}
              </FormButton>

              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="primary"
                fullWidth
                onClick={handleTrySignUP}
              >
                {submitting || sent ? 'In progress…' : '회원가입'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);