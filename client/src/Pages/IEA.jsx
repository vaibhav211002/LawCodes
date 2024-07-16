import {React,useState,useEffect} from 'react'
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './page.scss'


function IEA() {
    const url = 'https://lawcodes.onrender.com';
    const [iea_law, setLaw_iea] = useState('');
    const [ans2, setans2] = useState([]);

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
    <div className='Main'>
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
    </div>
    </>
    
  )
}

export default IEA