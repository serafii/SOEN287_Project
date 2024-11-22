const express = require('express');
const path = require('path');
const app = express();
const loginModule = require('./login');
const accountModule = require('./Account');
const businessinfo = require('./Admin');
 
//This app.js file handles ALL get/post requests from clients
//Actual get/post logic is defined in other js files and imported for simplicity
//**IMPORTANT** 
//This is the only file that handles all express requests

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend/views'));

const PORT = 5000;
  
app.use(express.static(path.join(__dirname, '../Frontend')));

  app.post('/createAccount', accountModule.createAccount); 

  app.post('/login',loginModule.login);

  app.post('/forgotPassword', loginModule.forgotPassword);

  app.post('/resetPassword', loginModule.resetPassword);

  app.post('/deleteAccount', accountModule.deleteAccount);

  app.get('/profile', accountModule.displayClientInfo);

  app.post('/editProfile', accountModule.editProfile);


  businessinfo(app);
  //Future option to add with express-session isAuthenticated:
  //Block access to dashboards if users are not logged in and trying to access page by URL

  app.get('/', (req, res) => {
    res.render('index'); // Render the EJS file instead of serving HTML
});

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

