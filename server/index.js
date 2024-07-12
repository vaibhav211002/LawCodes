const express = require('express');
const app = express();
const response = require('./response');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('dotenv');


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Backend Engine Working');
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

