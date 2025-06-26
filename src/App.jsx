import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FileUpload from './components/file/FileUpload';
import FileList from './components/file/FileList';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Profile from './components/user/Profile';  
import Index from './components/Index';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import UserProvider from './context/UserProvider';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer 
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <BrowserRouter>
        <UserProvider> {/* Wrap the entire app */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/file" element={<FileUpload />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
