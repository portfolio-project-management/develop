import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn></SignIn>}></Route>
          <Route path='/signup/:hash?' element={<SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
