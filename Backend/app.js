const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const loginModule = require('./login');
const accountModule = require('./Account');
const serviceRequestModule = require('./serviceRequest');
const editServicesModule = require('./editServices');
const adminModule = require('./admin');
const multer = require("multer");
const myServicesModule = require('./myServices');
 
//This app.js file handles ALL get/post requests from clients
//Actual get/post logic is defined in other js files and imported for simplicity
//**IMPORTANT** 
//This is the only file that handles all express requests

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../Frontend/Common files')));

app.set('view engine', 'ejs');
app.use(express.json());
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

  app.get('/CurrentServices', adminModule.displayCurrentServices);

  app.post('/confirmService', adminModule.confirmService);

  app.get('/Bills', adminModule.displayBills);

  app.post('/confirmBill', adminModule.confirmBill);

  app.get('/myServices/:username', myServicesModule.displayMyServices);

  app.post('/cancelService', myServicesModule.cancelService);

  app.get('/myBills/:username', myServicesModule.displayMyBills);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Frontend/Common files')); 
    },
    filename: (req, file, cb) => {
        cb(null, "Icon.png"); 
    }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
      } else {
          cb(new Error('Only JPEG, PNG, and WebP files are allowed!'));
      }
  },
}); 

  app.post('/editBusinessInfo',upload.single('Icon'), adminModule.editBusinessInfo);

  //Future option to add with express-session isAuthenticated:
  //Block access to dashboards if users are not logged in and trying to access page by URL

  app.get('/', (req, res) => { //Send to home page when accessing the website
    let sqlStatement = "SELECT * FROM Services";
    
    db.query(sqlStatement, (err, result) => {
        if(err) 
           return res.send("Error displaying services");

        let sqlStatement2 = "SELECT * FROM BusinessInfo";
        db.query(sqlStatement2, (err, result2) => {
            if(err)
                return res.send("Error displaying services");
            
            let businessInfo = result2[0];
            return res.render('Index', {services: result, businessInfo});
        });
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

