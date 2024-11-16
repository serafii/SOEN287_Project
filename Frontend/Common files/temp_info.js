//Templates for clients and managers

/*class Client{
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

function verifyPassword1(){
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
}*/


    /*const socket = io();

    socket.on('callFunction', (data) => {
        verifyPassword()
    });*/

    function verifyPassword(){
        document.getElementById("check").innerHTML = "Invalid username or password. Please try again";
    }