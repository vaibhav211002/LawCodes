import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './app.scss'

function App() {

  const url = 'https://lawcodes-server.onrender.com';

  const [ipc_law, setLaw] = useState('');
  const [ans, setans] = useState([]);

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

  return (
    <>
    <div className='main'>
      <div className="secondary-main">
        <div className="box">
          <h2>Law Converter</h2>
          <p>Convert the law into a more readable format</p>
          <input 
          type="number" 
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
              <div key={entry.IpcSection} className="result-entry">
              <p className='bns'><strong>BNS Section:</strong> {entry.bnsSection}</p>
              <p className='sub'><strong>Subject:</strong> {entry.Subject}</p>
              <p className='ipc'><strong>IPC Section:</strong> {entry.IpcSection}</p>
              <p className='chnge'><strong>Change:</strong> {entry.change}</p>
          </div>
            </div>
            
  )) : <p>Enter Correct IPC</p>}
          </div>
        </div>
      </div>
      <footer>
      <p className='footer'>Made By Vaibhav Bhatt</p>
    </footer>

    </div>

    </>
  )
}

export default App
