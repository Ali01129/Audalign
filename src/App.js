import './App.css';
import AuthPage from './pages/AuthPage';
import Editor from './pages/Editor';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import ResultPage from './pages/ResultPage';
import UploadPage from './pages/UploadPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Auth" element={<AuthPage />} />
          <Route path="/Upload" element={<UploadPage />} />
          <Route path="/Result" element={<ResultPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Editor" element={<Editor />} />
          <Route path="*" element={<LandingPage />} /> 
         

          {/* <Route path="/" element={<Editor />} />
          <Route path="*" element={<Editor />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;