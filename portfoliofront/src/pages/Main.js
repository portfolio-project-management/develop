import AppBarCustom from "./modules/components/AppBarCustom";

export default function Main() {
    return(
        <div>
            <AppBarCustom></AppBarCustom>
            <h1>메인페이지</h1>
            <a href="/signin">로그인</a>
            <br></br>
            <a href="/signup">회원가입</a>
            <br></br>
            <a href="/portfolioboard/edit">포폴수정</a>
            <br></br>
            <a href="/portfolioboard">포폴리스트</a>
        </div>
    );
}   