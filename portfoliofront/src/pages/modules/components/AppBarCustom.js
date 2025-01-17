import './AppBarCustom.css';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { SERVER_URL } from '../../../Link';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

export default function AppBarCustom({setUser=(()=>{})}) {
    const [ signinCheck, setSigninCheck ] = React.useState(false);
    // const [ reload, setReload ] = React.useState(true);

    const [cookies, setCookie, deleteCookie ] = useCookies("LOGIN_MEMBER");

    const navigate = useNavigate();

    // 페이지 이동마다 로그인 확인
    React.useEffect(() => {
        fetch(SERVER_URL + "user/checkcookie", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(cookies),
            credentials: "include",
        })
        .then(response => response.text())
        .then(data => {
            console.log(data)
            if(data !== "세션만료" && data !== "쿠키만료"){ // 로그인중
                setSigninCheck(true);
                setUser(data);
            }
        })
        .catch(error => console.log(error))
    },[])

    function handleLogout(){
        if(cookies){
            fetch(SERVER_URL + "user/logout", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(cookies),
                credentials: "include",
            })
            .then(response => {
                if(response.ok){
                    deleteCookie("LOGIN_MEMBER");
                    console.log("로그아웃")
                    navigate("/signin");
                }
            })
            .catch(error => console.log(error))
        }
    }

    return (
        <AppBar position="static" sx={{ bgcolor: 'black', display: 'flex', flexDirection: 'row' }}>
            <Toolbar sx={{ display: 'flex', flex: 1 }}>
                <Typography variant="h4" sx={{textAlign:'right', flexGrow: 60, bgcolor: 'black'}}>
                    <a href='/' className='custom_a'>사이트 이름</a>
                </Typography>
                <Typography variant="h4" sx={{textAlign:'right',  flexGrow: 57, bgcolor: 'black' }}>
                    {/* 로그인 여부에 따라 다르게 출력 */}
                    {signinCheck?
                    <a href='/' className='custom_a' onClick={handleLogout}>Logout</a>
                    :
                    <a href='/signin' className='custom_a'>Login</a>
                    }
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
