const express = require('express');
const app = express();
const response = require('./response');
const response_bnss = require('./response2.json');
const response_iea = require('./response3.json');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('dotenv');


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Backend Engine Working');
})

app.get('/getready',(req,res)=>{
    try {    
        setTimeout(() => {
        res.status(200).send('We are online');
    }, 6000);
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ error: 'An error occurred' });
          }
    }
    
})

app.post('/ipcSection', async (req, res) => {
    const { ipc_Section } = req.body;
    console.log(" ipc  " , ipc_Section);
    const result = [];
    await response.find(item => {
        if(item.IpcSection === ipc_Section){
            result.push(item);
        }
    });
    console.log("api " ,result);
    if (result) {
        res.status(200).json(result);
    }
    else{
        res.status(404).json({ error: 'IPC section not found' });
    }
})

app.post('/crpcSection', async (req, res) => {
    const { CrPC_section_new } = req.body;
    console.log(" crpc  " , CrPC_section_new);
    const result = [];
    await response_bnss.find(item => {
        if(item.CrPC_section === CrPC_section_new){
            result.push(item);
        }
    });
    console.log("api " ,result);
    if (result) {
        res.status(200).json(result);
    }
    else{
        res.status(404).json({ error: 'CRPC section not found' });
    }
})

app.post('/ieasearch', async (req, res) => {
    const { iea_section_new } = req.body;
    console.log(" iea  " , iea_section_new);
    const result = [];
    await response_iea.find(item => {
        if(item.IEA_Section === iea_section_new){
            result.push(item);
        }
    });
    console.log("api " ,result);
    if (result) {
        res.status(200).json(result);
    }
    else{
        res.status(404).json({ error: 'CRPC section not found' });
    }
})


app.post('/BnsSection', (req, res) => {
    const { bns_Section } = req.body;
    const result = response.find(item => item.bnsSection === bns_Section);
    console.log(result);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message : 'BNS section not found'});
    };
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});         

