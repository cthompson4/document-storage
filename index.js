var jsonArray = [];
var currentplace = 0;

function passwordStart() {
    document.getElementById("checkPassword").style.display = "block";
    pullJSON();
}

function checkUserPass() {
    userpass = jsonArray[currentplace];
    username = userpass.Username;
    password = userpass.Password;
    username = "admin";
    password = "password";
    if (document.getElementById("password").value == password && document.getElementById("username").value == username) {
        document.getElementById("checkPassword").style.display = "none";
    }
    else if (document.getElementById("username").value != username && document.getElementById("password").value != password) {
        var target1 = document.getElementById("username2");
        var target2 = document.getElementById("password2");
        var newtarget1 = target1.cloneNode(true);
        var newtarget2 = target2.cloneNode(true);
        newtarget1.textContent = "Wrong Username!";
        newtarget2.textContent = "Wrong Password!";
        target1.parentNode.replaceChild(newtarget1, target1);
        target2.parentNode.replaceChild(newtarget2, target2);
    }
    else if (document.getElementById("password").value != password && document.getElementById("username").value == username){
        var target1 = document.getElementById("username2");
        var target2 = document.getElementById("password2");
        var newtarget1 = target1.cloneNode(true);
        var newtarget2 = target2.cloneNode(true);
        newtarget1.textContent = "Enter Username:";
        newtarget2.textContent = "Wrong Password!";
        target1.parentNode.replaceChild(newtarget1, target1);
        target2.parentNode.replaceChild(newtarget2, target2);
    }
    else if (document.getElementById("password").value == password && document.getElementById("username").value != username){
        var target1 = document.getElementById("username2");
        var target2 = document.getElementById("password2");
        var newtarget1 = target1.cloneNode(true);
        var newtarget2 = target2.cloneNode(true);
        newtarget1.textContent = "Wrong Username!";
        newtarget2.textContent = "Enter Password:";
        target1.parentNode.replaceChild(newtarget1, target1);
        target2.parentNode.replaceChild(newtarget2, target2);
    }
    else {
        console.log("Something went wrong.")
    }
    textBox = document.getElementById("password");
    button = document.getElementById("submit");
    textBox.addEventListener("keydown", function (event) {
        if (event.keyCode == 13) {
            button.click();
        }
    });
}

function pullJSON() {
    var jsonRequest = new XMLHttpRequest();
    jsonRequest.open('GET', 'https://document-storage.azurewebsites.net/index.json');
    jsonRequest.onload = function() {
        document.getElementById("list").innerHTML = jsonRequest.responseText;
        jsonIndex = JSON.parse(jsonRequest.responseText);
        for (i=0; i<jsonIndex.length; i++) {
            jsonArray.push(jsonIndex[i].ContactURL);
        }
    }
    jsonRequest.send();
}
