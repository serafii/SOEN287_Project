const db = require('./db');


 //* Display My Services Page
 
function displayMyServices(req, res) {

    const username = req.params.username;
    const sqlQuery = `SELECT ServiceType, Date, ID FROM RequestedService WHERE Username = ?`;

    db.query(sqlQuery, username, (err, results) => {
        if (err) {
            return res.status(500).send('An error occurred while retrieving your services.');
        }else if (results.length === 0){
            return res.render('cancellation', { services: [], message: 'No services have been requested.', username });
        }
        return res.render('cancellation', { services: results, username });
    });
}

 // Cancel a Service
 
function cancelService(req, res) {
    const serviceId = req.body.serviceId;

    const deleteQuery = "DELETE FROM RequestedService WHERE ID = ?";

    db.query(deleteQuery, serviceId, (err, result) => {
        if (err) {
            return res.status(500).send('An error occurred while canceling the service.');
        }
        
        res.redirect('/Client dashboard/client.html'); // Redirect back to the dashboard
    });
}

function displayMyBills (req, res){
    const username = req.params.username;

    let sqlStatement = "SELECT * FROM Bills WHERE Username = ? AND Status = 'Unpaid'";

    db.query(sqlStatement, username, (err, result) => {
        if(err) 
           return res.status(500).send("Error displaying bills");

        return res.render('Bills', {bills: result});
    });

}

module.exports.displayMyServices = displayMyServices;
module.exports.cancelService = cancelService;
module.exports.displayMyBills = displayMyBills;