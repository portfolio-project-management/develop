import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './pages/Chat';
import ChatPage from './pages/ChatPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn></SignIn>}></Route>
          <Route path='/signup/:hash?' element={<SignUp></SignUp>}></Route>
          <Route path='/chat' element={<Chat></Chat>}></Route>
          <Route path='/chat/room/:roomId' element={<ChatPage></ChatPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
