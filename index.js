function checkPassword() {
    password = "password";
    if (document.getElementById("password").value == password) {
        document.getElementById("checkPassword").style.display = "none";
    }
    else {
        document.getElementById("password2").replaceWith("Wrong Password!");
    }
    textBox = document.getElementById("password");
    button = document.getElementById("submit");
    textBox.addEventListener("keydown", function (event) {
        if (event.keyCode == 13) {
            button.click();
        }
    });
}