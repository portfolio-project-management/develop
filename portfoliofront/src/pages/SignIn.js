import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import { KAKAO_URL, REST_API_KEY, SERVER_URL } from '../Link';
import ButtonBaseDemo from './modules/form/ImageButton';

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [user, setUser] = React.useState({
    userId : "",
    passWord : ""
  })

  React.useEffect(() => {
    
  });

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
      body: JSON.stringify(user)
    })
    .then(response => response.ok ? response.text() : console.log("로그인 네트워크 오류"))
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error));
  }

  function handleOnChange(e) {
    setUser({
      ...user,
      [e.target.name] : e.target.value,
    })
  }

  function handleOnLoginToKakao() {
    fetch(KAKAO_URL + "response_type=code&client_id=" + REST_API_KEY + "&redirect_uri=" + SERVER_URL + "user/signin/kakao")
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <button onClick={handleOnLoginToKakao}>카카오</button>
      <a href={"https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" + REST_API_KEY + "&redirect_uri=" + SERVER_URL + "user/signin/kakao"}>dsadas</a>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            로그인
          </Typography>
          <Typography variant="body2" align="center">
            {'회원이 아니신가요? '}
            <Link
              href="/premium-themes/onepirate/sign-up/" // 링크 수정하기
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
              <Field
                autoComplete="userId"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="userId"
                margin="normal"
                name="userId"
                required
                size="large"
                onChange={handleOnChange}
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="password"
                type="password"
                margin="normal"
                onChange={handleOnChange}
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
              <ButtonBaseDemo onClick={handleOnLoginToKakao}>
              </ButtonBaseDemo>
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