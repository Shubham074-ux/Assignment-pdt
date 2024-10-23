import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Navbar from './components/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode >
    <Router>
    <App />
    </Router>
  </StrictMode>,
)
