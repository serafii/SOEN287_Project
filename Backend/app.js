const express = require('express');
const path = require('path');
const app = express();
const loginModule = require('./login');
const createAccountModule = require('./createAccount');
const serviceRequestModule = require('./serviceRequest');

app.use(express.urlencoded({ extended: false }));


const PORT = 5000;

app.use(express.static(path.join(__dirname, '../Frontend')));

app.post('/createAccount', createAccountModule.createAccount);
app.post('/login', loginModule.login);
app.post('/forgotPassword', loginModule.forgotPassword);
app.post('/resetPassword', loginModule.resetPassword);
app.post('/submit-service-request', serviceRequestModule.submitServiceRequest);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend/Home page', 'Index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
