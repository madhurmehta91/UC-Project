function isEditorEmpty(aInId) {
    var lEditor = document.getElementById(aInId);
    if(lEditor) {
        if(lEditor.value == "") {
            return true;
        }
        return false;
    }
    return false;
}

function showDelayedStatus(aInStr) {
    setTimeout(function(){showStatus(aInStr)}, 50);
}
function showStatus(aInStr) {
    var lStatusDiv = document.getElementById("status");
    lStatusDiv.innerHTML = aInStr;
}

function getValue(aInId) {
    var lEditor = document.getElementById(aInId);
    if(lEditor) {
        return lEditor.value;
    }
    return "";
}

function isNameValid() {
    if(isEditorEmpty("nameField")) {
        showDelayedStatus("Name cannot be empty");
        return false;
    }
    return true;
}

function isEmailValid() {
    if(isEditorEmpty("emailField")) {
        showDelayedStatus("Email cannot be empty");
        return false;
    }
    var lValue = getValue("emailField");
    if(!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(lValue)) {
        showDelayedStatus("Please enter a valid email");
        return false;
    }
    return true;
}

function isPasswordValid() {
    if(isEditorEmpty("passwordField")) {
        showDelayedStatus("Password cannot be empty");
        return false;
    }
    var lValue = getValue("passwordField");
    if(lValue.length < 8) {
        showDelayedStatus("Password shoule be minumum 8 characters long");
        return false;
    }
    return true;
}

function isContactValid() {
    if(isEditorEmpty("phoneField")) {
        showDelayedStatus("Phone number cannot be empty");
        return false;
    }
    var lValue = getValue("phoneField");
    if(isNaN(parseInt(lValue))) {
        showDelayedStatus("Phone number can have digits only");
        return false;
    }
    if(!/^\d{10}$/.test(parseInt(lValue))) {
        showDelayedStatus("Phone number should be exactly 10 digits long");
        return false;
    }
    return true;
}

function isDateValid() {
    if(isEditorEmpty("dateField")) {
        showDelayedStatus("Date cannot be empty");
        return false;
    }
    var lValue = getValue("dateField");
    if(!/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(lValue)) {
        showDelayedStatus("Date entered is either not valid or should be in the format DD/MM/YYYY");
        return false;
    }
    return true;
}

function isAddressValid() {
    if(isEditorEmpty("addressField")) {
        showDelayedStatus("Address cannot be empty");
        return false;
    }
    return true;
}

function isZipCodeValid() {
    if(isEditorEmpty("zipcodeField")) {
        showDelayedStatus("Zipcode cannot be empty");
        return false;
    }
    var lValue = getValue("zipcodeField");
    if(isNaN(parseInt(lValue))) {
        showDelayedStatus("ZipCode can have digits only");
        return false;
    }
    if(!/^\d{6}$/.test(parseInt(lValue))) {
        showDelayedStatus("Zipcode should be exactly 6 digits long");
        return false;
    }
    return true;
}
function areAllFieldsValid() {
   return isNameValid() && isEmailValid() && isPasswordValid() && isContactValid() && isDateValid() && isAddressValid() && isZipCodeValid();
}

function submitForm() {
    var lObj = {};
    lObj["name"] = getValue("nameField");
    lObj["email"] = getValue("emailField");
    lObj["contact"] = getValue("phoneField");
    lObj["date"] = getValue("dateField");
    lObj["address"] = getValue("addressField");
    lObj["zipcode"] = getValue("zipcodeField");
    var lStorage;
    if(localStorage.getItem("UC_data") == null) {
        lStorage = {};
    }
    else {
        lStorage = JSON.parse(localStorage.getItem("UC_data"));
    }
    if(lStorage[lObj["email"]]) {
        showDelayedStatus("This email is already registered");
        return;
    }
    lStorage[lObj["email"]] = lObj;
    localStorage.setItem("UC_data", JSON.stringify(lStorage));
    showDelayedStatus("Succesfully submitted the details!!");
}

function validateAndSubmit() {
    showStatus("");
    if(areAllFieldsValid()) {
        submitForm();
    }

}
