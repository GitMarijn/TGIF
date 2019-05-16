var app = new Vue({
    el: '#app',
    data: {
        members: {},
        allMembers: {},
        checkboxR: document.getElementById("checkboxR"),
        checkboxD: document.getElementById("checkboxD"),
        checkboxI: document.getElementById("checkboxI"),
        dropdown: document.getElementById("dropdownState"),
        states: [],
        show: true,
    },
    
    created() {
        if (document.location.pathname === '/senate-data.html') {
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
                app.stateList();
                app.showPage();
            }).catch(function (error) {
                console.log(error)
            })
        },
        filterMembers() {
            var array = [];
            for (var i = 0; i < this.allMembers.length; i++) {
                if (document.getElementById("dropdownState").value === this.allMembers[i].state || document.getElementById("dropdownState").value === "all") {
                    if (document.getElementById("checkboxR").checked && this.allMembers[i].party == "R") {
                        array.push(this.allMembers[i])
                    }
                    if (document.getElementById("checkboxD").checked && this.allMembers[i].party == "D") {
                        array.push(this.allMembers[i])
                    }
                    if (document.getElementById("checkboxI").checked && this.allMembers[i].party == "I") {
                        array.push(this.allMembers[i])
                    }
                }
            }
            this.members = array;
        },
        stateList() {
            var arrayState = [];

            for (var i = 0; i < this.allMembers.length; i++) {
                arrayState.push(this.allMembers[i].state);
            }
            var removeDup = arrayState.filter((v, i, a) => a.indexOf(v) === i);
            var sortArray = removeDup.sort();
            this.states = sortArray;
        },
        showPage() {
           app.show = false;
    }
},
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
