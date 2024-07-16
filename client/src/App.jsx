import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './app.scss'
import { GoLaw } from "react-icons/go";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IPC from './Pages/IPC'
import CRPC from './Pages/CRPC'
import IEA from './Pages/IEA'
import {Routes,Route,BrowserRouter as Router,Link} from "react-router-dom";
import Linker from './components/Linker'



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
      <div className="heads">
        <div className="pointer">
        </div>
      </div>
      {/* <Linker/> */}
      {/* <Router>
      
        <Routes>
          <Route path="/ipc" element={<IPC/>} />
          <Route path="/crpc" element={<CRPC/>} />
          <Route path="/iea" element={<IEA/>} />
        </Routes>
      </Router> */}
      <div>
        <div className="heading">
        <Link to='/ipc' className="edit-profile">IPC </Link>
        <Link to='/crpc' className="edit-profile">CRPC </Link>
        <Link to='/iea' className="edit-profile">IEA </Link>
        </div>
    </div>
      
        
      
      </div>
      


    </div>


    </>
  )
}

export default App
