import {React,useState,useEffect} from 'react'
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './page.scss'
import Footer from '../components/Footer';

function IPC() {

    const url = 'https://lawcodes.onrender.com';
    // const url = 'http://localhost:3000';
    const [ipc_law, setLaw] = useState('');
    const [ans, setans] = useState([]);
    const [ready,setready]=useState(false);


    // useEffect( () => {

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
      
      const onchange = () => { 
        const setchange = async () => {
          await axios.post(`${url}/ipcSection`, {ipc_Section: ipc_law})
          .then((response) => {
            setLaw('');
            setans(response.data);
            console.log(response.data);
            toast.success('Result Found!', {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
            });
          })
          .catch((error) => {
            toast.error('Enter Correct IPC!', {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
            });
            console.error(error);
          });
        }
        setchange();
      }


  return (
    <>
    <div className='Main'>
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
            
  )) : <p>Please Enter Correct Ipc</p>}
          </div>  
        </div>
        <Footer/>
    </div>
    </>
    
  )
}

export default IPC