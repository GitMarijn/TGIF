var members = data.results[0].members;

var statistics = {
    "number_of_dem": numberOfRep("D"),
    "number_of_rep": numberOfRep("R"),
    "number_of_ind": numberOfRep("I"),
    "voted_with_party_dem": Math.round(pctVotes("D")/numberOfRep("D")),
    "voted_with_party_rep": Math.round(pctVotes("R")/numberOfRep("R")),
    "voted_with_party_ind": Math.round(pctVotes("I")/numberOfRep("I")),
    "least_engaged": leastEngaged(),
    "most_engaged": mostEngaged(),
    "least_loyal": leastLoyal(),
    "most_loyal": mostLoyal(),
};

createAtGlanceTable("table-at-glance");
createTableEngagement("tableleastengaged", statistics.least_engaged);
createTableEngagement("tablemostengaged", statistics.most_engaged);
createTableLoyalty("tableleastloyal", statistics.least_loyal);
createTableLoyalty("tablemostloyal", statistics.most_loyal);
window.onscroll = function() {scrollFunction()};

function numberOfRep(party) {
    var array = []
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == party) {
            array.push(members[i])
        }
    }
    return array.length;
}

function pctVotes(party) {
    var total = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == party) {
            total += members[i].votes_with_party_pct;
        }
    }
    return total;
}

function leastLoyal() {
    var sortArray = members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    });

    var array = []
    for (var i = 0; i < members.length; i++) {
        if (i < members.length / 10) {
            array.push(members[i]);
        } else if (array[array.length - 1].votes_with_party_pct == members[i].votes_with_party_pct) {
            array.push(members[i]);
        } else {
            break;
        }
    }
    return array.filter(val => val !== "0");
}

function mostEngaged() {
    var sortArray = members.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    });
    var array = []
    for (var i = 0; i < members.length; i++) {
        if (i < members.length / 10) {
            array.push(members[i]);
        } else if (array[array.length - 1].missed_votes_pct == members[i].missed_votes_pct) {
            array.push(members[i]);
        } else {
            break;
        }
    }
    return array
}

function leastEngaged() {
    var sortArray = members.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });
    var array = []
    for (var i = 0; i < members.length; i++) {
        if (i < members.length / 10) {
            array.push(members[i]);
        } else if (array[array.length - 1].missed_votes_pct == members[i].missed_votes_pct) {
            array.push(members[i]);
        } else {
            break;
        }
    }
    return array
}

function mostLoyal() {
    var sortArray = members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    });
    var array = []
    for (var i = 0; i < members.length; i++) {
        if (i < members.length / 10) {
            array.push(members[i]);
        } else if (array[array.length - 1].votes_with_party_pct == members[i].votes_with_party_pct) {
            array.push(members[i]);
        } else {
            break;
        }
    }
    return array
}

function createAtGlanceTable(tableID) {
    var tbody = document.getElementById(tableID);
    tbody.innerHTML = ""

    var partyR = statistics.number_of_rep;
    var votesR = statistics.voted_with_party_rep;
    var partyD = statistics.number_of_dem;
    var votesD = statistics.voted_with_party_dem
    var partyI = statistics.number_of_ind;
    var votesI = statistics.voted_with_party_ind;
    var totalReps = (partyR + partyD + partyI);
    
    if (partyI != 0) {
        var totalPct = ((votesR + votesD + votesI) / 3);
    } else {
        var totalPct = ((votesR + votesD) / 2);
    }

    var row = document.createElement("tr");
    row.insertCell().innerHTML = "Republican";
    row.insertCell().innerHTML = partyR;
    row.insertCell().innerHTML = votesR + " %";
    tbody.appendChild(row);

    var demRow = document.createElement("tr");
    demRow.insertCell().innerHTML = "Democrat";
    demRow.insertCell().innerHTML = partyD;
    demRow.insertCell().innerHTML = votesD + " %";
    tbody.appendChild(demRow);

    if (partyI != 0) {
        var indRow = document.createElement("tr");
        indRow.insertCell().innerHTML = "Independent";
        indRow.insertCell().innerHTML = partyI;
        indRow.insertCell().innerHTML = votesI + " %";
        tbody.appendChild(indRow);
    }
    var totalRow = document.createElement("tr");
    totalRow.insertCell().innerHTML = "Total";
    totalRow.insertCell().innerHTML = totalReps;
    totalRow.insertCell().innerHTML = totalPct + " %";
    tbody.appendChild(totalRow);

}

function createTableEngagement(tableID, members) {

    var tbody = document.getElementById(tableID);
    if (tbody != null) {
        tbody.innerHTML = "";
        for (var i = 0; i < members.length; i++) {
            var name = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name
            if (members[i].middle_name == null) {
                var name = members[i].first_name + " " + members[i].last_name;
            }

            var missedVotes = members[i].missed_votes;
            var missedVotesPercentage = members[i].missed_votes_pct;

            var link = document.createElement("a");
            link.setAttribute("href", members[i].url);
            link.append(name);

            var row = document.createElement("tr");
            row.insertCell().appendChild(link);
            row.insertCell().innerHTML = missedVotes
            row.insertCell().innerHTML = missedVotesPercentage + " %";

            tbody.appendChild(row);
        }
    }
}

function createTableLoyalty(tableID, members) {

    var tbody = document.getElementById(tableID);
    if (tbody != null) {
        tbody.innerHTML = "";
        for (var i = 0; i < members.length; i++) {
            var name = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name
            if (members[i].middle_name == null) {
                var name = members[i].first_name + " " + members[i].last_name;
            }

            var votesWithPartyPercentage = members[i].votes_with_party_pct;
            var votesWithParty = (members[i].total_votes / 100) * votesWithPartyPercentage;
            var roundedVotes = votesWithParty.toFixed(0);

            var link = document.createElement("a");
            link.setAttribute("href", members[i].url);
            link.append(name);

            var row = document.createElement("tr");
            row.insertCell().appendChild(link);
            row.insertCell().innerHTML = roundedVotes;
            row.insertCell().innerHTML = votesWithPartyPercentage + " %";

            tbody.appendChild(row);
        }
    }
}

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