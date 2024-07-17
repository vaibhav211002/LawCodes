import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import  React from 'react';
import './app.scss'
import { GoLaw } from "react-icons/go";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IPC from './Pages/IPC'
import CRPC from './Pages/CRPC'
import IEA from './Pages/IEA'
import {Routes,Route,BrowserRouter as Router,Link} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Footer from './components/Footer';


function App() {

  const url = 'https://lawcodes.onrender.com';
  // const url = 'http://localhost:3000';

  const [ipc_law, setLaw] = useState('');
  const [ans, setans] = useState([]);
  const [crpc_law, setLaw_crpc] = useState('');
  const [ans1, setans1] = useState([]);
  const [iea_law, setLaw_iea] = useState('');
  const [ans2, setans2] = useState([]);
  const [ready,setready]=useState(false);
  useEffect( () => {

    const effect = async ()=>{
      try {
        await axios.get(`${url}/getready`)
        .then(()=>{
          setready(true);
          toast.success('We are Online', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
          });
        })
      } catch (error) {
        console.error(error);
      }
      
    }
    effect();
  }, [url])



  return (
    <>
    <div className="main-1">
    <ToastContainer/>
    <div className='main'>
      <div className="secondary-main">
      <h2> <GoLaw className='image'/>Law-Code-Translator</h2>
      <div className="textdept">
        <p> <strong>Welcome</strong> to our legal conversion tool, your comprehensive guide for navigating India's newly reformed criminal laws.

With the recent transition from the old criminal laws to newly passed criminal laws, many legal professionals and scholars face challenges in correlating old sections with their new counterparts.

Our website simplifies this process by providing a seamless conversion system.</p>
      <div className="steps">
      <strong>Steps to Use Our Website : </strong>
      <br />
<br />
1. <strong>Select the Law</strong>: Choose the specific law for conversion.
<br />
<br />
2. <strong>Enter the Section Number</strong>: Type the section number of the old law which you want to convert with its new counterpart. For sections with letters, type them in capital letters without spaces <strong>(e.g., 171B)</strong>.
<br />
<br />
3. <strong>Click Convert</strong>: Press the convert button to see the result.
<br />
<br />
4. <strong>View Results</strong>: The new section number in the updated law will be displayed.
<br />
<br />
Follow these steps to easily find the updated section numbers in the new legal frameworks.
<br />
<strong>Wait For the Notification to get the service started.</strong>
      </div>
      </div>
      {(!ready)?        <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box> :<div className="heading">
          <div className="ipc">
            <Link to='/ipc' className="edit-profile">Indian Penal Code, 1860 to Bharatiya Nyaya Sanhita, 2023</Link>
          </div>
          <div className="crpc">
            <Link to='/crpc' className="edit-profile">Code of Criminal Procedure, 1973 to Bharatiya Nagarik Suraksha Sanhita, 2023 </Link>
          </div>
          <div className="iea">
            <Link to='/iea' className="edit-profile">Indian Evidence Act, 1872 to Bharatiya Sakshya Adhiniyam, 2023 </Link>
          </div>
        </div> 
        }
        
      </div>

      
    </div>
    
    </div>

    </>
  )
}

export default App
