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

function deleteAccount(req, res){
  //Need to retrieve user ID of the logged in client
  const id = 1;

  let sqlStatement = "DELETE FROM Clients WHERE ID = ?";
  let query = db.query(sqlStatement, id, (err,result) =>{
      if(err)
        return res.status(500).send("Error deleting account");

      let sqlStatement2 = "DELETE FROM LoginInformation WHERE ID = ?";
        let query2 = db.query(sqlStatement2, id, (err, result) =>{
        if(err)
          return res.status(500).send("Error deleting account");
      
        return res.status(200).send("Account successfully deleted");
      });
  });
}

module.exports.createAccount = createAccount;
module.exports.sendEmail = sendEmail;
//module.exports.deleteAccount = deleteAccount;
