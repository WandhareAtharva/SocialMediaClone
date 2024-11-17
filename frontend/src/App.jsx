import { Routes, Route } from 'react-router-dom';
// import './App.css';
import Landing from './Pages/Landing.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/home" element={<Landing />} />
      </Routes>
    </>
  )
}

export default App
