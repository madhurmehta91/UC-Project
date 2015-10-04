store1 = ["Delhi","Hyderabad", "Kolkatta", "Mumbai", "Bangalore", "Chennai"];
store2 = ["Dosa", "Rice", "Chapati", "Burger", "Pizza", "Pasta"];
ALL_STORE = [store1, store2];

function selectValue(aInEditor, aInItem) {
    var lValue = aInItem.innerHTML;
    aInEditor.field.innerHTML = lValue;
}

function createDropDown(aInEditor) {
    var lDropDown = document.createElement("div");
    lDropDown.className = "dropDowndiv";
    var lSearchField = document.createElement("input");
    lDropDown.appendChild(lSearchField);
    lSearchField.autofocus = true;
    lSearchField.focus();
    lSearchField.className = "searchField";
    aInEditor["dropdown"] = lDropDown;
    aInEditor["searchfield"] = lSearchField;
    aInEditor["searchfield"].onclick = function (e) { e.stopPropagation();}
    aInEditor["searchfield"].oninput = function (e) { e.stopPropagation(); filterResults(aInEditor)};
}

function showDropDown(aInEditor) {
    if(aInEditor.isShowing) {
        return;
    }
    createDropDown(aInEditor);
    aInEditor["combo"].appendChild(aInEditor.dropdown);
    for(var i = 0; i < aInEditor.store.length; i++) {
        var lItem = document.createElement("div");
        lItem.className = "option";
        lItem.innerHTML = aInEditor.store[i];
        aInEditor.visibleStore[aInEditor.store[i]] = lItem;
        aInEditor.dropdown.appendChild(lItem);
        lItem.onclick = function(e) { e.stopPropagation(); selectValue(aInEditor, this); hideDropDown(aInEditor);};
        if(aInEditor.store[i] == aInEditor.field.textContent) {
            lItem.className = lItem.className + " selectedOption";
        }
    }
    //aInEditor.combo.focus();
    aInEditor.isShowing = true;
    aInEditor.searchfield.value = "";
}

function hideDropDown(aInEditor) {
    aInEditor.isShowing = false;
    var lKeys = Object.keys(aInEditor.visibleStore)
    for(var i = 0; i < lKeys.length; i++) {
        aInEditor.dropdown.removeChild(aInEditor.visibleStore[lKeys[i]]);
        delete aInEditor.visibleStore[lKeys[i]];
    }
    if(aInEditor.dropdown) {
        aInEditor.combo.removeChild(aInEditor.dropdown);
        delete aInEditor.dropdown;
        delete aInEditor.searchField;
    }
}

function filterResults(aInEditor) {
    var lValue = aInEditor.searchfield.value;
    for(var i = 0; i < aInEditor.store.length; i++) {
        if(aInEditor.store[i].toLowerCase().indexOf(lValue) == -1) {
            aInEditor.visibleStore[aInEditor.store[i]].style.display = "none";
        }
        else {
            aInEditor.visibleStore[aInEditor.store[i]].style.display = "block";
        }
    }
}

function createEditorActions(aInEditor) {
    aInEditor["field"].onclick = function(e) { e.stopPropagation(); hideAllCombo(); showDropDown(aInEditor)};
    //aInEditor["combo"].onblur = function(event) {event.stopPropagation();
    //if(event.target != this) {
    //    hideDropDown(aInEditor)};
    //}

}

function createEditor(aInStore) {
    var lCombo = document.createElement("div");
    lCombo.style.width = "150px";
    lCombo.style.display = "inline-block";
    //lCombo.tabIndex = 0;
    var lInput = document.createElement("div");
    lCombo.appendChild(lInput);
    lInput.className = "field"
    var lEditor = {};
    lEditor["combo"] = lCombo;
    lEditor["field"] = lInput;
    lEditor["store"] = aInStore;
    lEditor["visibleStore"] = {};
    lEditor["isShowing"] = false;
    createEditorActions(lEditor);
    return lEditor;
}

function createComboBox() {
    editors = [];
    editors.push(createEditor(ALL_STORE[0]));
    var lDiv = document.createElement("div");
    lDiv.style.padding = "20px";
    var lLabel = document.createElement("label");
    lLabel.innerHTML = "City: ";
    lDiv.appendChild(lLabel);
    lDiv.appendChild(editors[0].combo);
    document.getElementById("outerBox").appendChild(lDiv);

    editors.push(createEditor(ALL_STORE[1]));
    var lDiv = document.createElement("div");
    lDiv.style.padding = "20px";
    var lLabel = document.createElement("label");
    lLabel.innerHTML = "Food: ";
    lDiv.appendChild(lLabel);
    lDiv.appendChild(editors[1].combo);

    document.getElementById("outerBox").appendChild(lDiv);
}

function hideAllCombo() {
    for(var i = 0; i < editors.length; i++) {
        hideDropDown(editors[i]);
    }
}
