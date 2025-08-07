import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './view/LoginPage';
import SignUpPage from './view/SignUpPage';
import ChatPage from './view/chat/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
