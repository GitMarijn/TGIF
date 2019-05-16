///////Global Var///////

var members = data.results[0].members;

var checkboxR = document.getElementById("checkboxR");
var checkboxD = document.getElementById("checkboxD");
var checkboxI = document.getElementById("checkboxI");
var dropdown = document.getElementById("dropdownState");

var sortList = stateList();


//////Function Calling\\\\\\\\\

createTable("table-data", members);

checkboxR.addEventListener("change", function () {
    createTable("table-data", filterMembers());
    tableEmptyAlert("table-data", filterMembers());
})
checkboxD.addEventListener("change", function () {
    createTable("table-data", filterMembers());
    tableEmptyAlert("table-data", filterMembers());
})
checkboxI.addEventListener("change", function () {
    createTable("table-data", filterMembers());
    tableEmptyAlert("table-data", filterMembers());
})
dropdown.addEventListener("change", function () {
    createTable("table-data", filterMembers());
    tableEmptyAlert("table-data", filterMembers());
})

createOptions();


////////Function Declaration\\\\\\\\\\\\

function createTable(tableID, members) {
    var tbody = document.getElementById(tableID);
    tbody.innerHTML = "";
    for (var i = 0; i < members.length; i++) {
        var member = members[i];

        var name = member.first_name + " " + member.middle_name + " " + member.last_name
        if (member.middle_name == null) {
            var name = member.first_name + " " + member.last_name;
        }
        var party = member.party;
        var state = member.state;
        var yearsInOffice = member.seniority;
        var votes = member.votes_with_party_pct + "%"

        var link = document.createElement("a");
        link.setAttribute("href", member.url);
        link.append(name);

        var row = document.createElement("tr");
        row.insertCell().appendChild(link);
        row.insertCell().innerHTML = party;
        row.insertCell().innerHTML = state;
        row.insertCell().innerHTML = yearsInOffice;
        row.insertCell().innerHTML = votes;
        tbody.appendChild(row);

    }
}

function filterMembers() {
    var array = [];
    for (var i = 0; i < members.length; i++) {

        if (dropdown.value === members[i].state || dropdown.value === "all") {
            if (checkboxR.checked && members[i].party == "R") {
                array.push(members[i])
            }
            if (checkboxD.checked && members[i].party == "D") {
                array.push(members[i])
            }
            if (checkboxI.checked && members[i].party == "I") {
                array.push(members[i])
            }
        }
    }
    return array;
}


function tableEmptyAlert(tableID, array) {
    if (array.length == 0) {
        var tbody = document.getElementById(tableID);
        tbody.innerHTML = "<tr><td class='message'>No results for this selection. Please make a different selection.</td></tr>";
    }
}

function stateList() {
    var arrayState = [];

    for (var i = 0; i < members.length; i++) {
        arrayState.push(members[i].state);
    }
    var removeDup = arrayState.filter((v, i, a) => a.indexOf(v) === i);
    var sortArray = removeDup.sort();
    return sortArray;
}

function createOptions() {

    for (var i = 0; i < sortList.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = sortList[i];
        option.setAttribute("value", sortList[i])
        dropdownState.appendChild(option);
    }
}

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}

function topButton() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
