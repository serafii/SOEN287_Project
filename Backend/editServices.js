const db = require('./db');

function displayEditServicesPage(req, res){
    let sqlStatement = "SELECT * FROM Services";
    
    db.query(sqlStatement, (err, result) => {
        if(err) 
           return res.send("Error displaying services");
        
        return res.render('ServiceHandler', {services: result});
    });
}

function displayServices(req, res){
    let sqlStatement = "SELECT * FROM Services";
    
    db.query(sqlStatement, (err, result) => {
        if(err) 
           return res.send("Error displaying services");
        
        return res.render('services', {services: result});
    });
}

function displayPricing(req, res){
    let sqlStatement = "SELECT * FROM ServicePricing";

    db.query(sqlStatement, (err, result) => {
        if(err) 
           return res.send("Error displaying services pricing");
        
        return res.render('Pricing', {services: result});
    });
}

function addService(req, res){
    const serviceName = req.body.serviceName;
    const serviceDescription = req.body.serviceDescription;
    const servicePrice = req.body.servicePrice0;
    const point1 = req.body.point01;
    const point2 = req.body.point02;
    const point3 = req.body.point03;

    let service = {
        ServiceName: serviceName,
        ServiceDescription: serviceDescription,
    }
    
    let servicePricing = {
        ServiceName: serviceName,
        Price: servicePrice,
        Point1: point1,
        Point2: point2,
        Point3: point3
    }

    let sqlStatement = "INSERT INTO Services SET ?";
    
    db.query(sqlStatement, service, (err, result) => {
        if(err) 
           return res.send("Error adding service");

        let sqlStatement2 = "INSERT INTO ServicePricing SET ?";
        db.query(sqlStatement2, servicePricing, (err, result) => {
            if(err) 
               return res.send("Error adding service pricing");
        });
        
        return res.redirect('/Manager dashboard/manager.html');
    });
}

function modifyService(req, res){
    const serviceName = req.body.selectedService;
    const serviceDescription = req.body.serviceDescription2;

    let sqlStatement = "UPDATE Services SET ServiceDescription = ? WHERE ServiceName = ?";
    
    db.query(sqlStatement, [serviceDescription, serviceName], (err, result) => {
        if(err) 
           return res.send("Error modifying service");
        
        return res.redirect('/Manager dashboard/manager.html');
    });
}

function modifyServicePricing(req, res){
    const serviceName = req.body.selectedService3;
    const servicePricing = req.body.servicePrice;
    const point1 = req.body.point1;
    const point2 = req.body.point2;
    const point3 = req.body.point3;

    let sqlStatement = "UPDATE ServicePricing SET Price = ?, Point1 = ?, Point2 = ?, Point3 = ? WHERE ServiceName = ?";
    
    db.query(sqlStatement, [servicePricing, point1, point2, point3, serviceName], (err, result) => {
        if(err) 
           return res.send("Error modifying service pricing");
        
        return res.redirect('/Manager dashboard/manager.html');
    }); 
}

function deleteService(req, res){
    const serviceName = req.body.selectedService2;
   
    let sqlStatement = "DELETE FROM Services WHERE ServiceName = ?";
    
    db.query(sqlStatement, serviceName, (err, result) => {
        if(err) 
           return res.send("Error deleting service");

        let sqlStatement2 = "DELETE FROM ServicePricing WHERE ServiceName = ?";
        db.query(sqlStatement2, serviceName, (err, result) => {
            if(err) 
               return res.send("Error deleting service pricing");
        });
        
        return res.redirect('/Manager dashboard/manager.html');
    });
}

module.exports.displayEditServicesPage = displayEditServicesPage;
module.exports.displayServices = displayServices;
module.exports.displayPricing = displayPricing;
module.exports.addService = addService;
module.exports.modifyService = modifyService;
module.exports.modifyServicePricing = modifyServicePricing;
module.exports.deleteService = deleteService;
