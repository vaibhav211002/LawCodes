import {React,useState,useEffect} from 'react'
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './page.scss'


function CRPC() {
    const url = 'https://lawcodes.onrender.com';

    const [crpc_law, setLaw_crpc] = useState('');
    const [ans1, setans1] = useState([]);
    const [ready,setready]=useState(false);
//   useEffect( () => {

//     const effect = async ()=>{
//       try {
//         await axios.get(`${url}/getready`)
//         .then(()=>{
//           setready(true);
//           toast.success('We are Online', {
//             position: "top-right",
//             autoClose: 500,
//             hideProgressBar: true,
//           });
//         })
//       } catch (error) {
//         console.error(error);
//       }
      
//     }
//     effect();
//   }, [url])

  
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



  return (
    <>
    <div className='Main'>
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
    </div>
    </>
  )
}

export default CRPC