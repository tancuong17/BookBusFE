import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Main/>}/>
        <Route path='/admin/*' element={<Admin/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
