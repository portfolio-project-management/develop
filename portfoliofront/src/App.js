import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResumeEdit from './pages/ResumeEdit';
import Main from './pages/Main';
import ResumeView from './pages/ResumeView';
import ProposalEdit from './pages/ProposalEdit';
import ProposalView from './pages/ProposalView';
import ProposalList from './pages/ProposalList';
import PortfolioBoardEdit from './pages/PortfolioBoardEdit';
import PortfolioBoard from './pages/PortfolioBoard';
import MyPage from './pages/MyPage';
import ChatRoomList from './pages/ChatRoomList';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/signin' element={<SignIn></SignIn>}></Route>
          <Route path='/signup/:hash?' element={<SignUp></SignUp>}></Route>

          <Route path='/mypage' element={<MyPage></MyPage>}></Route>

          <Route path='/resume/view' element={<ResumeView></ResumeView>}></Route>
          <Route path='/resume/edit'element={<ResumeEdit></ResumeEdit>}></Route>

          <Route path='/proposal/edit/:proposalId?'element={<ProposalEdit></ProposalEdit>}></Route>
          <Route path='/proposal/view/:proposalId?'element={<ProposalView></ProposalView>}></Route>
          <Route path='/proposal/list/:userId?'element={<ProposalList></ProposalList>}></Route>

          <Route path='/portfolioboard' element={<PortfolioBoard></PortfolioBoard>}></Route>
          <Route path='/portfolioboard/edit' element={<PortfolioBoardEdit></PortfolioBoardEdit>}></Route>

          <Route path='/chat/roomlist' element={<ChatRoomList></ChatRoomList>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
