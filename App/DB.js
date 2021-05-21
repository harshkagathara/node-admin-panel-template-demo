const mongoose = require('mongoose')
require('dotenv').config();

mongoose.Promise = global.Promise;
//const url = process.env.DATABase_url;

const LocalURL = 'mongodb://localhost:' + process.env.DB_Port + '/' + process.env.DB_Name

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(LocalURL,connectionParams)
    .then( () => {
        console.log('Successfully connected to the database')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

