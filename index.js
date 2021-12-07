function checkPassword() {
    password = "password";
    if (document.getElementById("password").value == password) {
        document.getElementById("checkPassword").style.display = "none";
    }
    else {
        document.getElementById("password2").replaceWith("Wrong Password!");
    }
}