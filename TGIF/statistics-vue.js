var app = new Vue({
    el: "#app",
    data: {
        members: {},
        allMembers: {},
        statistics: {},
        show: true,
    },
    created() {
        if (document.location.pathname === '/senate-attendance.html') {
            this.getData("https://api.propublica.org/congress/v1/113/senate/members.json")
        } else if (document.location.pathname === '/senate-party-loyalty.html') {
            this.getData("https://api.propublica.org/congress/v1/113/senate/members.json")
        } else {
            this.getData("https://api.propublica.org/congress/v1/113/house/members.json")
        }
    },
    methods: {
        getData(url) {
            fetch(url, {
                method: "GET",
                headers: new Headers({
                    "X-API-key": "v4sqptNeMzBSU3RNmxocLmVm95rP9hzUZmooMwU6"
                })
            }).then(function (response) {
                return response.json()
            }).then(function (data) {
                app.members = data.results[0].members;
                app.allMembers = data.results[0].members;
                app.statistics = {
                    number_of_dem: app.numberOfRep("D"),
                    number_of_rep: app.numberOfRep("R"),
                    number_of_ind: app.numberOfRep("I"),
                    voted_with_party_dem: Math.round(app.pctVotes("D") / app.numberOfRep("D")),
                    voted_with_party_rep: Math.round(app.pctVotes("R") / app.numberOfRep("R")),
                    voted_with_party_ind: Math.round(app.pctVotes("I") / app.numberOfRep("I")),
                    least_engaged: app.leastEngaged(),
                    most_engaged: app.mostEngaged(),
                    least_loyal: app.leastLoyal(),
                    most_loyal: app.mostLoyal(),
                }
                app.showPage();
            }).catch(function (error) {
                console.log(error)
            })
        },

        numberOfRep(party) {
            var members = this.allMembers;
            var array = [];

            for (var i = 0; i < members.length; i++) {
                if (members[i].party == party) {
                    array.push(members[i])
                }
            }
            return array.length;
        },

        pctVotes(party) {
            var members = this.allMembers;
            var total = 0;
            for (var i = 0; i < members.length; i++) {
                if (members[i].party == party) {
                    total += members[i].votes_with_party_pct;
                }
            }
            return total;
        },
        
        leastLoyal() {
            var members = this.members;
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
        },

        mostEngaged() {
            var members = this.members;
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
        },

        leastEngaged() {
            var members = this.members;
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
        },

        mostLoyal() {
            var members = this.members;
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
        },

        showPage() {
            app.show = false;
        },
    }
});

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
