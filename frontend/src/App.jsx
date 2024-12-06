import { Routes, Route } from 'react-router-dom';
// import './App.css';
import Landing from './Pages/Landing.jsx';
import Dashboard from './Pages/Dashboard.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
