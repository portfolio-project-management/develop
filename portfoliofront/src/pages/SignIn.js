import * as React from 'react';
import { Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import { KAKAO_URL, REST_API_KEY, SERVER_URL } from '../Link';
import ButtonBaseDemo from './modules/form/ImageButton';
import TextField from './modules/components/TextField';

import AppBarCustom from './modules/components/AppBarCustom';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [user, setUser] = React.useState({
    userId : "",
    passWord : ""
  })

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  function handleTrySignin() {
    fetch(SERVER_URL + "user/signin", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    })  
    .then(response => response.ok ? response.text() : console.log("로그인 네트워크 오류"))
    .then(data => {
      alert(data);
      setUser({ 
        ...user,
        passWord:"",
      })
      if(data === "로그인"){
        navigate("/");
      }
    })
    .catch(error => console.log(error));
  }

  function handleOnChange(e) {
    setUser({
      ...user,
      [e.target.name] : e.target.value,
    })
  }

  // 카카오 인증 요청
  function handleOnLoginToKakao() {
    window.location.href = KAKAO_URL;
  }

  return (
    <React.Fragment>
      <AppBarCustom ></AppBarCustom>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            로그인
          </Typography>
          <Typography variant="body2" align="center">
            {'회원이 아니신가요? '}
            <Link
              href="/signup" // 링크 수정하기
              align="center"
              underline="always"
            >
              회원가입
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
                size="large"
                color="primary"
                fullWidth
                onClick={handleTrySignin}
              >
                {submitting || sent ? 'In progress…' : '로그인'}
                
              </FormButton>

              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                fullWidth
                onClick={handleOnLoginToKakao}
                style={{
                  backgroundImage:"url(/static/images/kakao_login.png)",
                  borderRadius:11,
                  height:60
                }}
              > 
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          {/* 비밀번호 찾기 보류 */}
          {/* <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            Forgot password?
          </Link> */}
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);