const db = require('./db');

// Function to handle the service request form submission
function submitServiceRequest(req, res) {
    // Get the form data from the request body
    const service = req.body.services; // The selected service
    const date = req.body.date; // The selected date
    const username=req.body.username;
    console.log(username);
    // Check if service or date are missing
    if (!service || !date) {
        return res.status(400).send("Service and date are required.");
    }

    // Check if clientId is available
    if (!clientId) {
        return res.status(401).send("You must be logged in to request a service.");
    }

    // Prepare the service request data
    const serviceRequest = {
        ServiceType: service,
        Date: date,
        Username: username, // Associate the service request with the logged-in user
    };
 console.log(serviceRequest);
    // SQL query to insert the data into the RequestedService table
    const sqlStatement = "INSERT INTO RequestedService SET ?";

    // Use executeQuery for running the SQL
    db.query(sqlStatement, serviceRequest, (err, result) => {
        if (err) {
            console.error("Error saving service request:", err);
            return res.status(500).send("Error saving service request.");
        }

        // Send a response or redirect upon success
        res.status(200).send("Service request submitted successfully.");
    });
}

module.exports.submitServiceRequest = submitServiceRequest;
