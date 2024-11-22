const db = require('./db');

function displayCurrentServices(req, res){
    let sqlStatement = "SELECT * FROM RequestedService";

    db.query(sqlStatement, (err, result) => {
        if(err)
            return res.status(500).send("Error retrieving data");

        return res.render('availedServices', {services : result});
    });
}


function confirmService(req, res){
    const serviceId = req.body.serviceId;

    let sqlStatement = "SELECT * FROM RequestedService WHERE ID = ?";

    db.query(sqlStatement, serviceId, (err, result) => {
        if(err)
            return res.status(500).send("Error retrieving data");

        if(result.length === 0)
            return res.status(500).send("Error retrieving data");

        let service = {
            Username : result[0].Username,
            Date : result[0].Date,
            Status : "Unpaid",
        };

        let sqlStatement2 = "INSERT INTO Bills SET ?";
        db.query(sqlStatement2, service, (err, result) => {
            if(err)
                return res.status(500).send("Error inserting data");

            let sqlStatement3 = "DELETE FROM RequestedService WHERE ID = ?";

            db.query(sqlStatement3, serviceId, (err, result) => {
                if(err)
                    return res.status(500).send("Error deleting data");

                return res.status(200).send("Service confirmed");
            });
    });
    }
)}

function displayBills(req, res){
    let sqlStatement = "SELECT * FROM Bills";

    db.query(sqlStatement, (err, result) => {   
        if(err)
            return res.status(500).send("Error retrieving data");

        return res.render('Payments', {bills : result});
    });
}

function confirmBill(req, res){
    const serviceId = req.body.billId;
    const status = "Paid";

    let sqlStatement = "UPDATE Bills SET Status = ? WHERE ID = ?";

    db.query(sqlStatement, [status, serviceId], (err, result) => {
        if(err)
            return res.status(500).send("Error updating data");

        return res.status(200).redirect('/Bills');
    });
}

module.exports.displayCurrentServices = displayCurrentServices;
module.exports.confirmService = confirmService;
module.exports.displayBills = displayBills;
module.exports.confirmBill = confirmBill;