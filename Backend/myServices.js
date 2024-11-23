const db = require('./db');


 //* Display My Services Page
 
function displayMyServices(req, res) {

    const username = req.query.name;
    console.log(username);
    const sqlQuery = `SELECT ServiceType, Date FROM RequestedService WHERE Username = ?`;

    db.query(sqlQuery, [username], (err, results) => {
        if (err) {
            return res.status(500).send('An error occurred while retrieving your services.');
        }else if (results.length === 0){
            return res.render('cancellation', { services: [], message: 'No services have been requested.', username });
        }

        res.render('cancellation', { services: results, username });
    });
}

 // Cancel a Service
 
function cancelService(req, res) {
    const { serviceType, serviceID } = req.body;
    const username = req.query.name;

    const deleteQuery = `
        DELETE FROM RequestedService WHERE ServiceType = ? AND Username = ? AND ID = ?`;

    db.query(deleteQuery, [serviceType, username, serviceID], (err, result) => {
        if (err) {
            return res.status(500).send('An error occurred while canceling the service.');
        }
        
        res.redirect('/Client%20dashboard/client.html?name=' + username); // Redirect back to the dashboard
    });
}

module.exports.displayMyServices = displayMyServices;
module.exports.cancelService = cancelService;
