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
const session = require('express-session');
 
//This app.js file handles ALL get/post requests from clients
//Actual get/post logic is defined in other js files and imported for simplicity
//**IMPORTANT** 
//This is the only file that handles all express requests

app.use(session({
    secret: 'soen287Test',
    resave: false,            
    saveUninitialized: false,
    cookie: { secure: false }      
}));


app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.json());
app.set('views', path.join(__dirname, '../Frontend/views'));

const PORT = 5000;


  //Block access to dashboards if users are not logged in and trying to access page by URL

    //Client dashboard links 

    app.get('/Client dashboard/client.html', loginModule.verifyClient, (req, res) => {
        return res.sendFile(path.join(__dirname, '..', 'Frontend/Client dashboard', 'client.html'));
    });
    
    app.get('/Client dashboard/profile page/deleteAccount.html', loginModule.verifyClient, (req, res) => {
        return res.sendFile(path.join(__dirname, '..', 'Frontend/Client dashboard/profile page', 'deleteAccount.html'));
    });

    app.get('/profile/:username',loginModule.verifyClient, accountModule.displayClientInfo);

    app.get('/myServices/:username', loginModule.verifyClient, myServicesModule.displayMyServices);

    app.get('/myBills/:username', loginModule.verifyClient, myServicesModule.displayMyBills);

    app.get('/ServiceRequest', loginModule.verifyClient, serviceRequestModule.displayServiceRequestPage);

    //Manager dashboard links

    app.get('/Manager dashboard/manager.html', loginModule.verifyManager, (req, res) => {
        return res.sendFile(path.join(__dirname, '..', 'Frontend/Manager dashboard', 'manager.html'));
    });

    app.get('/Admin files/Business Info/Info.html', loginModule.verifyManager, (req, res) => {
        return res.sendFile(path.join(__dirname, '..', 'Frontend/Admin files/Business Info', 'Info.html'));
    });

    app.get('/ServiceHandler', loginModule.verifyManager, editServicesModule.displayEditServicesPage);

    app.get('/CurrentServices', loginModule.verifyManager, adminModule.displayCurrentServices);

    app.get('/Bills', loginModule.verifyManager, adminModule.displayBills);

    

    app.use(express.static(path.join(__dirname, '../Frontend/Common files')));

    app.use(express.static(path.join(__dirname, '../Frontend')));


  //Serve all routes

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

  app.post('/modifyAboutUs', adminModule.editAboutUs);

  app.post('/modifyTerms', adminModule.editTerms);

  app.get('/terms', accountModule.displayTerms);

  app.post('/logout', loginModule.logout);

  //For edit business logo, replace the current Icon.png with the one uploaded by the admin

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

  //Route for home page

  app.get('/', (req, res) => { 
    let sqlStatement = "SELECT * FROM Services";
    
    db.query(sqlStatement, (err, result) => {
        if(err) 
           return res.send("Error displaying services");

        let sqlStatement2 = "SELECT * FROM BusinessInfo";
        db.query(sqlStatement2, (err, result2) => {
            if(err)
                return res.send("Error displaying services");

            let sqlStatement3 = "SELECT * FROM BusinessTerms WHERE ID = 1";
            db.query(sqlStatement3, (err, result3) => {
                if(err)
                    return res.send("Error displaying services");

                let businessInfo = result2[0];
                let terms = result3[0];
                return res.render('Index', {services: result, businessInfo, terms});
            });
        });
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

