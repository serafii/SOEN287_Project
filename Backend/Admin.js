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
    

module.exports = businessinfo; // Export the businessinfo function
