var i1 = 0;
var width1 = 0;
var id1;

var i2 = 0;
var width2 = 0;
var id2;

var i3 = 0;
var width3 = 0;
var id3;

var i4 = 0;
var width4 = 0;
var id4;

function frame1() {
    if (width1 >= 100) {
        clearInterval(id1);
        i1 = 0;
    } else {
        width1++;
        var elem1 = document.getElementById("progress-bar1");
        elem1.style.width = width1 + "%";
        elem1.innerHTML = width1 + "%";
    }
}

function frame2() {
    if (width2 >= 80) {
        clearInterval(id2);
        i2 = 0;
    } else {
        width2++;
        var elem2 = document.getElementById("progress-bar2");
        elem2.style.width = width2 + "%";
        elem2.innerHTML = width2 + "%";
    }
}

function frame3() {
    if (width3 >= 43) {
        clearInterval(id3);
        i3 = 0;
    } else {
        width3++;
        var elem3 = document.getElementById("progress-bar3");
        elem3.style.width = width3 + "%";
        elem3.innerHTML = width3 + "%";
    }
}

function frame4() {
    if (width4 >= 67) {
        clearInterval(id4);
        i4 = 0;
    } else {
        width4++;
        var elem4 = document.getElementById("progress-bar4");
        elem4.style.width = width4 + "%";
        elem4.innerHTML = width4 + "%";
    }
}

function start1() {
    if (i1 == 0) {
        i1 = 1;
        id1 = setInterval(frame1, 10);
    }
}

function start2() {
    if (i2 == 0) {
        i2 = 1;
        id2 = setInterval(frame2, 10);
    }
}

function start3() {
    if (i3 == 0) {
        i3 = 1;
        id3 = setInterval(frame3, 10);
    }
}

function start4() {
    if (i4 == 0) {
        i4 = 1;
        id4 = setInterval(frame4, 10);
    }
}

start1(); // 자동 실행
start2(); // 자동 실행
start3(); // 자동 실행
start4(); // 자동 실행

/*doughnutChar*/
const doughnutChart = document.querySelector("#doughnut-chart");

const doughnutData = {
    labels: ["A+ ~ A0", "B+ ~ B0", "C+ ~ C0", "F"],
    data: [32, 35, 28, 5],
};

new Chart(doughnutChart, {
    type: "doughnut",
    data: {
        labels: doughnutData.labels,
        datasets: [{
            label: [],
            data: doughnutData.data,
        }, ],
    },
    options: {
        borderWidth: 1,
        borderRadius: 2,
        hoverBorderWidth: 4,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const labelIndex = context.dataIndex;
                        const dataValue = doughnutData.data[labelIndex];
                        return dataValue + "%";
                    },
                },
            },
        },
    },
});

/*line chart*/
const linetChart = document.querySelector("#line-chart");
const lineChartData = new Chart(linetChart, {
    type: "line",
    data: {
        labels: [
            "1-1",
            "1-2",
            "2-1",
            "2-2",
            "3-1",
            "3-2",
            "4-1",
            "4-2",
        ],
        datasets: [{
            data: [1.3, 4.1, 3.0, 4.0, 2.4, 3.1, 4.5, 3.8],
        }, ],
    },
    options: {
        plugins: {
            legend: {
                display: false,
            },
        },
    },
});