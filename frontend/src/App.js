import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import  { Toaster } from 'react-hot-toast';
import { themeSettings } from './theme';
import Navbar from './Component/Navbar';
import Homepage from './Pages/Homepage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import  Summary from './Pages/Summary';
import Paragraph from './Pages/Paragraph';
import ChatBot from './Pages/ChatBot';
import JsConverter from './Pages/JsConverter';
import ScifiImage from './Pages/ScifiImage'

function App() {
  const theme = useMemo(() => createTheme(themeSettings(),[]));
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/paragraph" element={<Paragraph />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/js-converter" element={<JsConverter />} />
          <Route path="/scifi-image" element={<ScifiImage />} />

        </Routes>
      </ThemeProvider>
    </>


  );
}

export default App;
