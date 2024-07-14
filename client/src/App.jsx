import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './app.scss'

function App() {

  const url = 'https://lawcodes-server.onrender.com';
  // const url = 'http://localhost:3000';

  const [ipc_law, setLaw] = useState('');
  const [ans, setans] = useState([]);
  const [crpc_law, setLaw_crpc] = useState('');
  const [ans1, setans1] = useState([]);
  const [iea_law, setLaw_iea] = useState('');
  const [ans2, setans2] = useState([]);
  

  const onchange = () => { 
    const setchange = () => {
      axios.post(`${url}/ipcSection`, {ipc_Section: ipc_law})
      .then((response) => {
        console.log(response.data);
        setLaw('');
        setans(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    setchange();
  }

  const onchange_crpc = () => { 
    const setchange = () => {
      axios.post(`${url}/crpcSection`, {CrPC_section_new: crpc_law})
      .then((response) => {
        console.log(response.data);
        setLaw_crpc('');
        setans1(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    setchange();
  }

  const onchange_iea = () => { 
    const setchange = () => {
      axios.post(`${url}/ieasearch`, {iea_section_new: iea_law})
      .then((response) => {
        console.log(response.data);
        setLaw_iea('');
        setans2(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    setchange();
  }

  return (
    <>
    <div className='main'>
      <div className="secondary-main">
        <div className="box">
          <h2>Law Converter</h2>
          <p>Convert the law into a more readable format</p>
          <input 
          type="text" 
          placeholder="Enter the law here"
          value={ipc_law}
          onChange={(e) => setLaw(e.target.value)}
          />
          <button onClick={onchange}>Convert</button>
        </div>
        <div className="ans">
          <h2>Result </h2>
          <div className='result-box'> 
          { (ans.length>0 )? ans.map(entry => (
            <div className="card">
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
          placeholder="Enter the law here"
          value={crpc_law}
          onChange={(e) => setLaw_crpc(e.target.value)}
          />
          <button onClick={onchange_crpc}>Convert</button>
        </div>
        <div className="ans">
          <h2>Result </h2>
          <div className='result-box'> 
          { (ans1.length>0 )? ans1.map(entry => (
            <div className="card">
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
          placeholder="Enter the law here"
          value={iea_law}
          onChange={(e) => setLaw_iea(e.target.value)}
          />
          <button onClick={onchange_iea}>Convert</button>
        </div>
        <div className="ans">
          <h2>Result </h2>
          <div className='result-box'> 
          { (ans2.length>0 )? ans2.map(entry => (
            <div className="card">
              <div key={entry.BSA_Section} className="result-entry">
              <p className='bns'><strong>BSA Section:</strong> {entry.BSA_Section}</p>
              <p className='sub'><strong>Subject:</strong> {entry.subject}</p>
              <p className='ipc'><strong>IEA Section:</strong> {entry.IEA_Section}</p>
              <p className='chnge'><strong>Comparison:</strong> {entry.comparison}</p>
          </div>
            </div>
            
  )) : <p>Enter Correct IEA</p>}
          </div>
          </div>

      </div>
      
      {/* <footer>
      <p className='footer'>Made By Vaibhav Bhatt</p>
    </footer> */}

    </div>

    </>
  )
}

export default App
