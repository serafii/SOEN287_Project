const db = require('./db');
const path = require('path');
const emailModule = require('./Account');

function login (req, res){
        //Redirect based on login credentials

        const username = req.body.username;
        const password = req.body.password;
    
        let sqlUsername = "SELECT * FROM LoginInformation WHERE Username = ?";
        
        let query = db.query(sqlUsername, username, (err, result) => {
            if(err)
              return res.status(500).send("Error retrieving account data");
            if(result.length==0)
              return res.redirect('/Login page/SignIn.html?error=invalid');
    
            const client = result[0];
    
            if(client.Username === username && client.Password === password){ //Redirect based on user type

              req.session.user = { //Start a session for that user
                username: client.Username,
                role: client.Role
            };

              if(client.Role === "Client")
                return res.redirect(`/Client dashboard/client.html?name=${client.Username}`);
              else if (client.Role === "Manager")
                return res.redirect("/Manager dashboard/manager.html?link=manager"); //Change link to actual manager dashboard
            }
            else
              return res.redirect('/Login page/SignIn.html?error=invalid');
        });
      }

    function logout (req, res){
        req.session.destroy((err) => {
            if(err)
              return res.status(500).send("Error logging out");
        });
      }

      //Verify login status and role

      function verifyClient(req, res, next) {
        if (req.session.user && req.session.user.role === 'Client') {
            return next();
        } else {
            return res.redirect('/Login page/SignIn.html');
        }
    }

      function verifyManager(req, res, next) {
        if (req.session.user && req.session.user.role === 'Manager') {
            return next();
        } else {
            return res.redirect('/Login page/SignIn.html');
        }
    }

    function forgotPassword (req, res){
      
      const email = req.body.email;

      let sqlStatement = "SELECT ID, Email, FirstName FROM Clients WHERE Email = ?";

      let query = db.query(sqlStatement, email, (err, result)=>{
          if(err)
            return res.status(500).send("Error retrieving data");
          if(result.length == 0) //if the email doesn't correspond to any account
            return res.sendFile(path.join(__dirname, '..', 'Frontend/Login page', 'password.html'));

          //Replace link later with actual url when website is deployed
          let htmlContent = `<h1>Reset your password</h1><p> Hi ${result[0].FirstName},</p>
          <p>Click on the button below to access the password reset page.</p> <a href="https://soen287-project-fvxv.onrender.com/Login%20page/resetPassword.html?id=${result[0].ID}" target="_blank">Click Here</a> 
          <p>Best regards,<br>Your Support Team</p>`;

          let subject = 'Password reset';
          emailModule.sendEmail(result[0].Email, htmlContent, subject);

          return res.redirect('/Login page/SignIn.html');
      });
    }

    function resetPassword (req, res){ //Improve ID fetching if possible

      const password = req.body.password;
      const id = req.body.id;

      let sqlStatement = "UPDATE LoginInformation SET Password = ? WHERE ID = ?";

      let query = db.query(sqlStatement, [password, id], (err, result) =>{ //Update password
          if(err)
            return res.status(500).send("Error updating data");

          return res.redirect('/Login page/SignIn.html');
      });
    }


module.exports.login = login;
module.exports.logout = logout;
module.exports.verifyClient = verifyClient;
module.exports.verifyManager = verifyManager;
module.exports.forgotPassword = forgotPassword;
module.exports.resetPassword = resetPassword;