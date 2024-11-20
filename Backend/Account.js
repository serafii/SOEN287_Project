const db = require('./db');
const path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');


//The sending email code is taken from ProgrammingInBlood's nodemailer-gmail-Oauth2 public repository
//From github: URL :https://github.com/ProgrammingInBlood/nodemailer-gmail-Oauth2

/*DO NOT MODIFY*/ 
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });


  const sendEmail = async (email, htmlContent, subject) => {
    try {
      const { token } = await oauth2Client.getAccessToken();
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_ADDRESS,  
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: token,  
        },
        tls: {
          rejectUnauthorized: false, 
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,  
        subject: subject,
        html: htmlContent,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.log('Error sending email:', error);
    }
  }; // End of sendMail function


function createAccount(req, res){ //Create account logic, need to send email and update html based on response
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const zip = req.body.zip;
    const phone = req.body.phone;
    const password = req.body.password;
    
    let client = {
        FirstName : firstName,
        LastName : lastName,
        Email : email,
        Address : address,
        City : city,
        Zip : zip,
        Phone : phone,
    };

    let sqlVerification = "SELECT * FROM LoginInformation WHERE Username = ?";

    let query0 = db.query(sqlVerification, username, (err, result)=>{ //Verify username
      if(err)
        return res.status(500).send("Error creating account");
      
      if (result.length > 0) 
        return res.redirect('/Create account page/Account.html?error=invalidUsername'); //Works but page reloads and form data is cleared

        let sqlMail = "SELECT * FROM Clients WHERE Email = ?";

        let query01 = db.query(sqlMail, email, (err, result)=>{ //Verify email address
          if(err)
            return res.status(500).send("Error creating account");
          if (result.length > 0) 
            return res.redirect('/Create account page/Account.html?error=invalidEmail'); //Works but page reloads and form data is cleared
           
            let sqlStatement = "INSERT INTO Clients SET ?";

            let query = db.query(sqlStatement, client, (err, result) => { //Create account
              if (err) {
                return res.status(500).send("Error creating account");
              }
                let role = {
                  Username : username,
                  Password : password,
                  Role : "Client",
                };

                let sqlStatement2 = "INSERT INTO LoginInformation SET ?"
                let query001 = db.query(sqlStatement2, role, (err, result) =>{
                  if (err) {
                    return res.status(500).send("Error creating account");
                  }
                });
                //Send email
                let htmlContent = `<h1>Welcome to businessName!</h1><p>👋 Hi ${username},</p><p>Thank you for creating an account with us!<br>You can now access all of our features and start enjoying the full benefits of your account.</p><p>Best regards,<br>businessName Team</p>`;
                let subject = 'Account Creation';
                sendEmail(email, htmlContent, subject);
            });
            return res.sendFile(path.join(__dirname, '..', 'Frontend/Create account page', 'accountCreated.html')); 
            
        });
    }); 
} //End of create account post method


function deleteAccount(req, res) {
  const username = req.body.usernameInput;
  let id = 0;
  let email = "";

  // Get client's ID
  let sqlStatement0 = "SELECT ID FROM LoginInformation WHERE Username = ?";
  db.query(sqlStatement0, [username], (err, result) => {
      if (err) {
          console.error("Error retrieving account ID:", err);
          return res.status(500).send("Error retrieving account data");
      }
      if (result.length == 0) {
          console.error("No account found with the given username");
          return res.status(500).send("Error retrieving account data");
      }

      id = result[0].ID;

      // Get client's email
      let sqlStatement01 = "SELECT Email FROM Clients WHERE ID = ?";
      db.query(sqlStatement01, [id], (err, result) => {
          if (err) 
              return res.status(500).send("Error retrieving account data");
          
          if (result.length == 0) 
              return res.status(500).send("Error retrieving account data");
          

          email = result[0].Email;

          // Delete client's information all tables
          let sqlStatement = "DELETE FROM Clients WHERE ID = ?";
          db.query(sqlStatement, [id], (err, result) => {
              if (err) {
                  console.error("Error deleting from Clients table:", err);
                  return res.status(500).send("Error deleting account");
              }

              let sqlStatement2 = "DELETE FROM LoginInformation WHERE ID = ?";
              db.query(sqlStatement2, [id], (err, result) => {
                  if (err) 
                      return res.status(500).send("Error deleting account");
                  

                  // Send email
                  let htmlContent = 
                  `<h1>Account Deletion Confirmation - businessName</h1>
                  <p>👋 Hi ${username},</p>
                  <p>We're reaching out to confirm that your account with us has been successfully deleted. If you did not request this action or believe this was done in error, please contact our support team immediately.</p>
                  <p>Thank you for being part of our community. We're here if you ever wish to join us again.</p><p>Best regards,<br>businessName Team</p>`;
                  let subject = 'Account Deletion';
                  sendEmail(email, htmlContent, subject);

                  return res.redirect('/Home page/Index.html'); // Send to home page after
              });
          });
      });
  });
}

  //Display Client's information on the edit account form with fields already filled
  function displayClientInfo(req, res){

    const username = req.query.name;

    //Retrieve client's data from all tables
    let sqlStatement = "SELECT * FROM LoginInformation WHERE Username = ?";

    let query = db.query(sqlStatement, username, (err, result) =>{
      if(err)
        return res.status(500).send("Error retrieving account data");
      if(result.length == 0)
        return res.status(500).send("Error retrieving account data");

      let id = result[0].ID;
      const password = result[0].Password;

      let sqlStatement2 = "SELECT * FROM Clients WHERE ID = ?";

      let query2 = db.query(sqlStatement2, id, (err, result) =>{
        if(err)
          return res.status(500).send("Error retrieving account data");
        if(result.length == 0)
          return res.status(500).send("Error retrieving account data");

        const user = { //Client's data
          Username : username,
          FirstName : result[0].FirstName,
          LastName : result[0].LastName,
          Email : result[0].Email,
          Address : result[0].Address,
          City : result[0].City,
          Zip : result[0].Zip,
          Phone : result[0].Phone,
          Password : password,
        };

        res.render('profile', { profile: user }); //Fill the profile.ejs form with the client's data
      });
    });
  }

  function editProfile(req, res){
    //Get all the data from the form
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const address = req.body.address;
    const city = req.body.city;
    const zip = req.body.zip;
    const phone = req.body.phone;
    const password = req.body.password;
    
    let client = {
        FirstName : firstName,
        LastName : lastName,
        Email : email,
        Address : address,
        City : city,
        Zip : zip,
        Phone : phone,
    };

    let id = 0;
    //Retrieve client's ID
    let sqlStatement0 = "SELECT ID FROM LoginInformation WHERE Username = ?";
    let query0 = db.query(sqlStatement0, username, (err, result) =>{
      if(err)
        return res.status(500).send("Error updating account");
      if(result.length == 0)
        return res.status(500).send("Error updating account");

      id = result[0].ID;

        //Update profile informations from all tables
    let sqlStatement = "UPDATE Clients SET ? WHERE ID = ?";
    let query = db.query(sqlStatement, [client, id], (err, result) =>{
      if(err){
        console.error("Error updating Clients table:", err);
        return res.status(500).send("Error updating account");
      }
      
      let sqlStatement2 = "UPDATE LoginInformation SET Password = ? WHERE Username = ?";
      let query2 = db.query(sqlStatement2, [password, username], (err, result) =>{
        if(err)
          return res.status(500).send("Error updating account");

        //Send email
        let htmlContent = `<h1>Account Update - businessName</h1><p>👋 Hi ${username},</p>
        <p>Your account has been successfully updated. If you did not request this action or believe this was done in error, please contact our support team immediately.</p>
        <p>Thank you for being part of our community. We're here if you ever wish to join us again.</p><p>Best regards,<br>businessName Team</p>`;
        let subject = 'Account Update';
        sendEmail(email, htmlContent, subject);

        return res.redirect('/Home page/Index.html'); //Send to home page after
      });
    });
  });  
}

module.exports.createAccount = createAccount;
module.exports.sendEmail = sendEmail;
module.exports.deleteAccount = deleteAccount;
module.exports.editProfile = editProfile;
module.exports.displayClientInfo = displayClientInfo;
