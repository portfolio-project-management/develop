import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import PortfolioBoardEdit from './pages/PortfolioBoardEdit';
import PortfolioBoard from './pages/PortfolioBoard';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/signin' element={<SignIn></SignIn>}></Route>
          <Route path='/signup/:hash?' element={<SignUp></SignUp>}></Route>
          <Route path='/portfolioboard' element={<PortfolioBoard></PortfolioBoard>}></Route>
          <Route path='/portfolioboard/edit' element={<PortfolioBoardEdit></PortfolioBoardEdit>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
