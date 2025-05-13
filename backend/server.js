const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors());
app.use(express.json())
app.use('/uplodes', express.static('uplodes'));






app.listen(4000,()=>{
    console.log(' Amringizga mumtazirman ');
 })
