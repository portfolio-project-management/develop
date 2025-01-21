import './AppBarCustom.css';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { SERVER_URL } from '../../../Link';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

export default function AppBarCustom({ setUser = () => {} }) {
    const [signinCheck, setSigninCheck] = React.useState(false);
    const [cookies, setCookie, deleteCookie] = useCookies("LOGIN_MEMBER");
    const [open, setOpen] = React.useState(false);  // Drawer 열림/닫힘 상태 관리

    const navigate = useNavigate();

    // 페이지 이동마다 로그인 확인
    React.useEffect(() => {
        fetch(SERVER_URL + "user/checkcookie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cookies),
            credentials: "include",
        })
        .then(response => response.text())
        .then(data => {
            // 유저 정보 확인
            if (data !== "세션만료" && data !== "쿠키만료") { // 로그인 중
                setSigninCheck(true);
                setUser(data);
            } else {
                setUser("비로그인");
            }
        })
        .catch(error => console.log(error))
    }, [cookies, setUser]);

    function handleLogout() {
        if (cookies) {
            fetch(SERVER_URL + "user/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cookies),
                credentials: "include",
            })
            .then(response => {
                if (response.ok) {
                    deleteCookie("LOGIN_MEMBER");
                    console.log("로그아웃");
                    navigate("/signin");
                }
            })
            .catch(error => console.log(error));
        }
    }

    function toggleDrawer () {
        setOpen(!open);
    };

    // Drawer 내부 리스트 항목
    const DrawerList = (
        <div>
            <List sx={{
                width:300,
                fontSize:22
            }}>
                <ListItem button onClick={() => navigate('/')} 
                    sx={{
                        '&:hover': {
                            textDecoration:"underline",  // 마우스 오버 시 배경색
                            cursor: 'pointer',
                        },
                    }}>
                    <p>메인</p>
                </ListItem>

                <ListItem ButtonBase onClick={() => navigate('/portfolioboard')}
                    sx={{
                        '&:hover': {
                            textDecoration:"underline",  // 마우스 오버 시 배경색
                            cursor: 'pointer',
                        },
                    }}>
                    <p>포트폴리오 게시판</p>
                </ListItem>
                {/* <ListItem button onClick={() => navigate('/contact')}>
                    <ListItemText primary="Contact" />
                </ListItem> */}
            </List>
        </div>
    );

    return (
        <AppBar position="static" sx={{ bgcolor: 'black', display: 'flex', flexDirection: 'row' }}>
            <Toolbar sx={{ display: 'flex', flex: 1 }}>
                {/* 메뉴 버튼 - Drawer 열기 */}
                <Typography variant="h6" sx={{ textAlign: 'left', flexGrow: 1, color:'white'}}>
                    <Button onClick={toggleDrawer} color="inherit">{open ? "X" : "메뉴"}</Button>
                </Typography>

                {/* 사이트 이름 */}
                <Typography variant="h4" sx={{ textAlign: 'center', flexGrow: 5, bgcolor: 'black' }}>
                    <a href='/' className='custom_a'>사이트 이름</a>
                </Typography>

                {/* 로그인 여부에 따른 출력 */}
                <Typography variant="h6" sx={{ textAlign: 'right', flexGrow: 1, bgcolor: 'black' }}>
                    {signinCheck ?
                        <a href='/' className='custom_a' onClick={handleLogout}>Logout</a>
                        :
                        <a href='/signin' className='custom_a'>Login</a>
                    }
                </Typography>
            </Toolbar>  

            {/* Drawer 메뉴 */}
            <Drawer open={open} onClose={toggleDrawer} variant="persistent" >
                {DrawerList}
            </Drawer>
        </AppBar>
    );
}
