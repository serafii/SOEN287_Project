const express = require('express');
const path = require('path');
const app = express();
const loginModule = require('./login');
const createAccountModule = require('./createAccount');
 
//This app.js file handles ALL get/post requests from clients
//Actual get/post logic is defined in other js files and imported for simplicity
//**IMPORTANT** 
//This is the only file that handles all express requests

app.use(express.urlencoded({ extended: false }));

const PORT = 5000;
  
app.use(express.static(path.join(__dirname, '../Frontend')));

  app.post('/createAccount', createAccountModule.createAccount); 

  app.post('/login',loginModule.login);

  app.post('/forgotPassword', loginModule.forgotPassword);

  app.post('/resetPassword', loginModule.resetPassword);

  app.get('/', (req, res) => { //Send to home page when accessing the website
    res.sendFile(path.join(__dirname, '..', 'Frontend/Home page', 'Index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

