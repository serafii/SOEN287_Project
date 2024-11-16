const db = require('./db');
const path = require('path');

function login (req, res){
        //Redirect based on login credentials

        const username = req.body.username;
        const password = req.body.password;
    
        let sqlUsername = "SELECT * FROM LoginInformation WHERE Username = ?";
        
        let query = db.query(sqlUsername, username, (err, result) => {
            if(err)
              return res.status(500).send("Error retrieving account data");
    
            const client = result[0];
    
            if(client.Username === username && client.Password === password){ //Redirect based on user type
              if(client.Role === "Client")
                return res.sendFile(path.join(__dirname, '..', 'Frontend/Client dashboard', 'client.html'));
    
              else if (client.Role === "Manager")
                return res.sendFile(path.join(__dirname, '..', 'Frontend/Manager dashboard', 'manager.html'));
            }
            else
            return res.send("Password and username do not match"); //Call js function from the client in login form instead, socket.io?
        });
}

    function forgotPassword (req, res){

    }


module.exports.login = login;
//module.exports.forgotPassword = forgotPassword;