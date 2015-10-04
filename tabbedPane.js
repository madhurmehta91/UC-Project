MENU = ["Home", "Company", "We're Hiring", "Individual", "Products", "About", "Contact"];

function loadTabs() {
   allTabs = addTabs();
   visibleTabs = [];
   for(var i = 0; i < allTabs.length; i++) {
    visibleTabs.push(allTabs[i]);
   }
    extraTabsWidth = addExtraTabs();
    document.getElementById("navigation").style.minWidth = extraTabsWidth + "px";
    resizeInitTabs();
}
function calculateWidth(aInStr) {
    var lCanvas = document.createElement("canvas");
    var lContext = lCanvas.getContext("2d");
    lContext.font = "16px Times";
    return lContext.measureText(aInStr).width;
}

function addTabs() {
    var lTabbedPane = document.getElementById("tabbedpane");
    var lTabs = [];
    for(var i = 0; i < MENU.length; i++) {
        var lTab = createTab(MENU[i]);
        lTabbedPane.appendChild(lTab);
        lTabs.push(lTab);
    }
    return lTabs;
}
function createTab(aInTitle) {
    var lDiv = document.createElement("div");
    lDiv.innerHTML = aInTitle;
    lDiv.className = "tab";
    return lDiv;
}

function addExtraTabs() {
    var lTabbedPane = document.getElementById("tabbedpane");
    var lDiv = document.createElement("div");
    lDiv.innerHTML = ">>";
    lDiv.className = "tab";
    lTabbedPane.appendChild(lDiv);
    var lWidth = lDiv.offsetWidth;
    var lDiv = document.createElement("div");
    lDiv.innerHTML = "+ Add Page";
    lDiv.className = "tab";
    lTabbedPane.appendChild(lDiv);
    return lWidth + lDiv.offsetWidth;

}

function resizeTabs() {
    var tabbedpane = document.getElementById("tabbedpane");
    var size = tabbedpane.offsetWidth - extraTabsWidth - 5;
    var i = 0;
    while(size > allTabs[visibleTabs.length-1].offsetWidth && i < visibleTabs.length) {
        size -= allTabs[i].offsetWidth;
        i++;
    }
    var isReducing = false;
    while(i < visibleTabs.length) {
        isReducing = true;
       allTabs[i++].style.display = "none";
       visibleTabs.pop();
    }
    if(isReducing) {
        return;
    }
    while(size > allTabs[visibleTabs.length - 1].offsetWidth && i < allTabs.length) {
        visibleTabs.push(allTabs[i]);
        allTabs[i].style.display = "inline-block";
        size -= allTabs[i].offsetWidth;
        i++;
    }
}


function resizeInitTabs() {
    var tabbedpane = document.getElementById("tabbedpane");
    var size = tabbedpane.offsetWidth - extraTabsWidth - 5;
    var i = 0;
    while(size > allTabs[visibleTabs.length-1].offsetWidth && i < visibleTabs.length) {
        size -= allTabs[i].offsetWidth;
        i++;
    }
    var z = allTabs.length - 1;
    while(z >= i) {
       allTabs[z].style.display = "none";
       visibleTabs.splice(z,1);
       z--;
    }
}
