//Templates for clients and managers

class Client{
    constructor(firstName,lastName,username,email,address,city,zip,phone,password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.address = address;
        this.city = city;
        this.zip = zip;
        this.phone = phone;
        this.password = password;
    }
}

class Manager{
    constructor(username,password){
        this.username = username;
        this.password = password;
    }
}

var client1 = new Client("Alex","Brown","alex123","alex123@gmail.com","123 fake street","Montreal","H1H 2P4","123-456-789","abc0123456");
var manager = new Manager("@manage","abc654321");

const clients = [client1];
const managers = [manager];

function verifyPassword(){
    let x = document.getElementById("inputUsername").value;
    let y = document.getElementById("inputPassword").value;
    let clientCheck = false;
    let managerCheck = false;

    for(let i = 0; i<clients.length;i++){
        if(clients[i].username==x && clients[i].password==y){
            clientCheck = true;
            break;
        }
    }
    for(let i = 0; i<managers.length;i++){
            if(managers[i].username==x && managers[i].password==y){
                managerCheck = true;
                break;
            } 
    }

    if(clientCheck){
        window.location.href = "../Client dashboard/client.html"; 
    }
    else if (managerCheck){
        window.location.href = "../Manager dashboard/manager.html";
    }
    else{
        document.getElementById("check").innerHTML = "Invalid username or password. Please try again";
    }
    return false;
}

//Using session storage to store temporarily data for demo purposes
//Doesnt work well, have to review form.checkValidity()
var client2;
function createAccount(){
    let a = document.getElementById("firstName").value;
    let b = document.getElementById("lastName").value;
    let c = document.getElementById("username").value;
    let d = document.getElementById("email").value;
    let e = document.getElementById("address").value;
    let f = document.getElementById("city").value;
    let g = document.getElementById("zip").value;
    let h = document.getElementById("phone").value;
    let i = document.getElementById("password").value;
   
    client2 = new Client(a,b,c,d,e,f,g,h,i);
    clients.push(client2);
    
    sessionStorage.setItem('clients', JSON.stringify(clients));
    window.location.href = "../Login page/SignIn.html";
}
//Test

window.onload = function() {
    const storedClients = sessionStorage.getItem('clients');
    if (storedClients) {
        clients.push(...JSON.parse(storedClients)); 
    }
};