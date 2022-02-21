const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 6000;
const {MONGOURI} = require('./Keys');

mongoose.connect(MONGOURI,{ 
    useNewUrlParser: true
   
})

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo instance');
})
mongoose.connection.on('error',(err)=>{
    console.log('error to mongo instance',err);
})



require('./models/user') // user schema
require('./models/post') // post schema

app.use(express.json()); // Middleware to parse to json
app.use(require('./routes/auth'))//resister rpoutes
app.use(require('./routes/post'))
app.use(require('./routes/user'))



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});