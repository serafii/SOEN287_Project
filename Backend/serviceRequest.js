const db = require('./db');

// Function to handle the service request form submission
function submitServiceRequest(req, res) {
    // Get the form data from the request body
    const service = req.body.services; 
    const date = req.body.date;
    const username = req.body.username;

    // Check if service or date are missing
    if (!service || !date) {
        return res.status(400).send("Service and date are required.");
    }

    const serviceRequest = {
        ServiceType: service,
        Date: date,
        Username: username, 
    };

    const sqlStatement = "INSERT INTO RequestedService SET ?";

 
    db.query(sqlStatement, serviceRequest, (err, result) => {
        if (err) {
            console.error("Error saving service request:", err);
            return res.status(500).send("Error saving service request.");
        }
        res.redirect('/Client dashboard/client.html?name=' + username);
    });
}

function displayServiceRequestPage(req, res){
        let sqlStatement = "SELECT * FROM Services";
        let services1;
        let servicePricing1;
        const username = req.query.name;

        
        db.query(sqlStatement, (err, result) => {
            if(err) 
               return res.send("Error displaying services");

            services1 = result;

            let sqlStatement2 = "SELECT * FROM ServicePricing";
            
            db.query(sqlStatement2, (err, result) => {
                if(err) 
                   return res.send("Error displaying services pricing");

                servicePricing1 = result;

                return res.render('servicereq', {services : services1, servicePricing: servicePricing1, username: username});
            });
        });
}

module.exports.submitServiceRequest = submitServiceRequest;
module.exports.displayServiceRequestPage = displayServiceRequestPage;