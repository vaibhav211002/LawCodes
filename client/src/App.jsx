import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './app.scss'
import image from './assets/image.png'
import { GoLaw } from "react-icons/go";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  
  const onchange = () => { 
    const setchange = async () => {
      await axios.post(`${url}/ipcSection`, {ipc_Section: ipc_law})
      .then((response) => {
        setLaw('');
        setans(response.data);
        toast.success('Result Found!', {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
    setchange();
  }

  const onchange_crpc = () => { 
    const setchange = async () => {
      await axios.post(`${url}/crpcSection`, {CrPC_section_new: crpc_law})
      .then((response) => {
        setLaw_crpc('');
        setans1(response.data);
        toast.success('Result Found!', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
    setchange();
  }

  const onchange_iea = () => { 
    const setchange = async () => {
     await axios.post(`${url}/ieasearch`, {iea_section_new: iea_law})
      .then((response) => {
        setLaw_iea('');
        setans2(response.data);
        toast.success('Result Found!', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
    setchange();
  }

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
        <div className="box">
          <p>Find your  IPC to BNS </p>
          <input 
          type="text" 
          placeholder="Enter the IPC Section here"
          value={ipc_law}
          onChange={(e) => setLaw(e.target.value)}
          />
          <button onClick={onchange}>Convert</button>
        </div>
        <div className="ans">
          
          <div className='result-box'> 
          { (ans.length>0 )? ans.map(entry => (
            <div className="card">
              <h2>Result </h2>
              <div key={entry.bnsSection} className="result-entry">
              <p className='bns'><strong>BNS Section:</strong> {entry.bnsSection}</p>
              <p className='sub'><strong>Subject:</strong> {entry.Subject}</p>
              <p className='ipc'><strong>IPC Section:</strong> {entry.IpcSection}</p>
              <p className='chnge'><strong>Change:</strong> {entry.change}</p>
          </div>
            </div>
            
  )) : <p>Enter Correct IPC</p>}
          </div>  
        </div>
        <div className="box">
          <p>Find your CRPC to BNSS </p>
          <input 
          type="text" 
          placeholder="Enter the Cr PC Section here"
          value={crpc_law}
          onChange={(e) => setLaw_crpc(e.target.value)}
          />
          <button onClick={onchange_crpc}>Convert</button>
        </div>
        <div className="ans">
          <div className='result-box'> 
          { (ans1.length>0 )? ans1.map(entry => (
            <div className="card">
              <h2>Result </h2>
              <div key={entry.IpcSection} className="result-entry">
              <p className='bns'><strong>BNSS Section:</strong> {entry.BNSS_section}</p>
              <p className='sub'><strong>Subject:</strong> {entry.subject}</p>
              <p className='ipc'><strong>CRPC Section:</strong> {entry.CrPC_section}</p>
              <p className='chnge'><strong>Comparison:</strong> {entry.comparison}</p>
          </div>
            </div>
            
  )) : <p>Enter Correct CRPC</p>}
          </div>
          </div>
          
          <div className="box">
          <p>Find your IEA to BSA </p>
          <input 
          type="text" 
          placeholder="Enter the IEA Section here"
          value={iea_law}
          onChange={(e) => setLaw_iea(e.target.value)}
          />
          <button onClick={onchange_iea}>Convert</button>
        </div>
        <div className="ans">
          <div className='result-box'> 
          { (ans2.length>0 )? ans2.map(entry => (
            <div className="card">
              <h2>Result </h2>
              <div key={entry.BSA_Section} className="result-entry">
              <p className='bns'><strong>BSA Section:</strong> {entry.BSA_Section}</p>
              <p className='sub'><strong>Subject:</strong> {entry.Subject}</p>
              <p className='ipc'><strong>IEA Section:</strong> {entry.IEA_Section}</p>
              <p className='chnge'><strong>Comparison:</strong> {entry.Comparison}</p>
          </div>
            </div>
            
  )) : <p>Enter Correct IEA</p>}
          </div>
          </div>
          <footer>
      <p className='footer'>
        <strong>Contribution : </strong>
        <br />
        <strong>Ashutosh Singh</strong> - Legal Advisor  
        <br />
        <strong>Vaibhav Bhatt</strong> - Website Creator and Developer  
      </p>
    </footer>
      </div>
      


    </div>


    </>
  )
}

export default App
