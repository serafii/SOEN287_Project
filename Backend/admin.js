const db = require('./db');
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Configure Multer to save the uploaded file directly to the destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads")); // Save in the "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, "logo.png"); // Save as "logo.png"
    }
});

const upload = multer({ storage }); // Initialize multer with the defined storage configuration

// Define the businessinfo function
const businessinfo = (app) => {
    // Route to serve the uploaded logo
    app.get("/logo", (req, res) => {
        const uploadedLogoPath = path.join(__dirname, "uploads", "logo.png");
        const defaultLogoPath = path.join(__dirname, "Common files", "Icon.png");
    
        // Serve uploaded logo if it exists
        if (fs.existsSync(uploadedLogoPath)) {
            return res.sendFile(uploadedLogoPath);
        }
    
        // Serve default logo if no upload exists
        if (fs.existsSync(defaultLogoPath)) {
            return res.sendFile(defaultLogoPath);
        }
    
        res.status(404).send("Logo not found");
    });
    
    app.post("/upload-logo", upload.single("logo"), (req, res) => {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        res.send("Logo updated successfully!");
    });
};

//End of logo update

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

function editBusinessInfo(req, res){
    const businessName = req.body.businessName;
    const businessSlogan = req.body.businessSlogan;

    let info = {
        Name : businessName,
        Slogan : businessSlogan
    };

    let sqlStatement = "UPDATE BusinessInfo SET ? WHERE ID = 1";

    db.query(sqlStatement, info, (err, result) => {
        if(err)
            return res.status(500).send("Error updating data");

        return res.redirect('/Manager dashboard/manager.html');
    });

}

module.exports.displayCurrentServices = displayCurrentServices;
module.exports.confirmService = confirmService;
module.exports.displayBills = displayBills;
module.exports.confirmBill = confirmBill;
module.exports.businessinfo = businessinfo;
module.exports.editBusinessInfo = editBusinessInfo;