const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const loginModule = require('./login');
const accountModule = require('./Account');
const serviceRequestModule = require('./serviceRequest');
const editServicesModule = require('./editServices');
const myServicesModule = require('./myServices');


 
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

  app.post('/serviceRequest', serviceRequestModule.submitServiceRequest);

  app.get('/ServiceHandler', editServicesModule.displayEditServicesPage);

  app.post('/modifyService', editServicesModule.modifyService);

  app.post('/modifyServicePricing', editServicesModule.modifyServicePricing);

  app.post('/deleteService', editServicesModule.deleteService);

  app.post('/addService', editServicesModule.addService);

  app.get('/Services', editServicesModule.displayServices);

  app.get('/Pricing', editServicesModule.displayPricing);

  app.get('/ServiceRequest', serviceRequestModule.displayServiceRequestPage);

  app.get('/myServices', myServicesModule.displayMyServices);

  app.post('/cancelService', myServicesModule.cancelService);



  //Future option to add with express-session isAuthenticated:
  //Block access to dashboards if users are not logged in and trying to access page by URL

  app.get('/', (req, res) => { //Send to home page when accessing the website
    let sqlStatement = "SELECT * FROM Services";
    
    db.query(sqlStatement, (err, result) => {
        if(err) 
           return res.send("Error displaying services");
        
        return res.render('Index', {services: result});
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

