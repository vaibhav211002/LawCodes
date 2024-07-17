import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import IPC from './Pages/IPC'
import CRPC from './Pages/CRPC'
import IEA from './Pages/IEA'
import {Routes,Route,BrowserRouter as Router,Link} from "react-router-dom";
import Footer from './components/Footer.jsx'
import { Navigate } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Router>
    <App />
        <Routes>
          <Route path="/ipc" element={<IPC/>} />
          <Route path="/crpc" element={<CRPC/>} />
          <Route path="/iea" element={<IEA/>} />
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect unknown routes to /ipc */}
        </Routes>
      </Router>
      
  </React.StrictMode>,
)
