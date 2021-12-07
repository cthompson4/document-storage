var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;
var currentContactIndex = 0; 

function viewCurrentContact() {
    currentContact = contactArray[currentContactIndex];
    console.log(currentContact);
    document.getElementById("nameID").value = currentContact.preferredName;   
    document.getElementById("emailID").value = currentContact.email;   
    document.getElementById("cityID").value = currentContact.city;   
    document.getElementById("stateID").value = currentContact.state;
    document.getElementById("zipID").value = currentContact.zip;  

    document.getElementById("statusID").innerHTML = "Status: Viewing contact " + (currentContactIndex+1) + " of " + contactArray.length;
}

function importContacts() {
    console.log("importContacts()");
    loadIndex(); 
}

function saveContactsToServer() {
    console.log("saveContactsToServer()");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('Response: ' + this.responseText);
            setStatus(this.responseText);
        }
    };
    xmlhttp.open("POST", "save-contacts.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("contacts=" + JSON.stringify(contactArray));   
}

function loadContactsFromServer() {
    console.log("loadContactsFromServer()");

    // Clear the current contacts.
    contactArray.length = 0;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            contactArray = JSON.parse(this.responseText);
            setStatus("Loaded contacts (" + contactArray.length + ")");

            currentContactIndex = 0;
            viewCurrentContact();
        }
    };

    xmlhttp.open("GET", "load-contacts.php", true);
    xmlhttp.send();   
}

function logContacts() {
    console.log("ContactArray: ");
    console.log(contactArray);
}

function previous() {
    if (currentContactIndex > 0) {
        currentContactIndex--;
    }
    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();
}

function next() {
    if (currentContactIndex < (contactArray.length-1)) {
        currentContactIndex++;
    }
    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();
}

function openForm() {
    document.getElementById("contactForm").style.display = "block";
  }

function closeForm() {
    document.getElementById("contactForm").style.display = "none";
  }

function openUpdateForm() {
    document.getElementById("updateContactForm").style.display = "block";
  }

function closeUpdateForm() {
    document.getElementById("updateContactForm").style.display = "none";
  }

function add() {
    console.log('add()');
    let newContact = { "firstName":document.getElementById("firstName").value, "lastName":document.getElementById("lastName").value, "preferredName": document.getElementById("preferredName").value, "email": document.getElementById("email").value, "phoneNumber": document.getElementById("phoneNumber").value, "city": document.getElementById("city").value, "state": document.getElementById("state").value, "zip": document.getElementById("zip").value };
	contactArray.push(newContact);
}

function remove() {
    console.log('remove()');
	const index = contactArray.indexOf(currentContact);
	contactArray.splice(index, 1);
}

function update() {
    console.log('update()');
    const index = contactArray.indexOf(currentContact);
    let updatedContact = { "firstName":document.getElementById("ufirstName").value, "lastName":document.getElementById("ulastName").value, "preferredName": document.getElementById("upreferredName").value, "email": document.getElementById("uemail").value, "phoneNumber": document.getElementById("uphoneNumber").value, "city": document.getElementById("ucity").value, "state": document.getElementById("ustate").value, "zip": document.getElementById("uzip").value };
	contactArray.splice(index, 1, updatedContact);
}

function zipFocusFunction() {
    console.log('focusFunction()');
}

function zipBlurFunction() {
    getPlace();
}

function keyPressed() {
    console.log('keyPressed()');

}

function getPlace() {
    var zip = document.getElementById("zipID").value;
    console.log("zip:"+zip);

    console.log("function getPlace(zip) { ... }");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log("result:"+result);
            var place = result.split(', ');
            if (document.getElementById("cityID").value == "")
                document.getElementById("cityID").value = place[0];
            if (document.getElementById("stateID").value == "")
                document.getElementById("stateID").value = place[1];
        }
    }
    xhr.open("GET", "getCityState.php?zip=" + zip);
    xhr.send(null);
}

function initApplication() {
    console.log('Mustang start.'); 
    loadIndex();
}

function loadIndex() {
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    indexRequest.onload = function() {
        console.log("Index JSON:" + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        for (i=0; i<contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
        loadContacts();
    }
    indexRequest.send();
}

function loadContacts() {
    contactArray.length = 0;
    loadingContact = 0;
    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}

function loadNextContact(URL) {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("Contact: " + contact.firstName);
        contactArray.push(contact);

        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

        document.getElementById("statusID").innerHTML = "Status: Loading " + contact.firstName + " " + contact.lastName;

        loadingContact++;
        if (contactURLArray.length > loadingContact) {
            loadNextContact(contactURLArray[loadingContact]);
        }
        else {
            document.getElementById("statusID").innerHTML = "Status: Contacts Loaded (" + contactURLArray.length + ")";
            viewCurrentContact();
            console.log(contactArray);
        }
    }

    contactRequest.send();
}

