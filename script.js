let InPlus = document.getElementById("InPeoplePlus");
let Waiting = document.getElementById("Waiting");
let OutPlus = document.getElementById("OutPeoplePlus");
let Done = document.getElementById("Done");
let Indicator = document.getElementById("WaitTime");
let Graph = document.getElementById("Graph");
let ClassesSelector = document.getElementById("classes");
let Classes = 1;
let InPeople = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let WaitPeople = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let OutPeople = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let NowTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let WaitTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let tmp = 0;
let Rotation = [[], [], [], [], [], [], [], [], [], [], []];
let Labels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let GraphContext = new Chart(Graph, {
    type: "line",
    data: {
        labels: Labels,
        datasets: [
            {
                label: "客の回転率(人/分)",
                data: Rotation[Classes - 1],
                borderColor: "rgba(0, 0, 255, 1)",
                backgroundColor: "rgba(255, 255, 255, 0)"
            },
        ],
    },
    options: {
        title: {
            display: true,
            text: "回転率の推移"
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMax: 40,
                        suggestedMin: 0,
                        stepSize: 10,
                        callback: function (value, index, values) {
                            return value + "人";
                        }
                    }
                }
            ]
        }
    }
});

ClassesSelector.onchange = function () {
    Classes = ClassesSelector.value;
    alert("appap");
}

InPlus.onclick = function () {
    InPeople[Classes - 1]++;
    WaitPeople[Classes - 1]++;
    Waiting.innerHTML = WaitPeople[Classes - 1];
}
OutPlus.onclick = function () {
    WaitPeople[Classes - 1]--;
    OutPeople[Classes - 1]++;
    Waiting.innerHTML = WaitPeople[Classes - 1];
    Done.innerHTML = OutPeople[Classes - 1];
    tmp++;
}
function WaitTimeCalc() {
    NowTime[Classes - 1]++;
    WaitTime[Classes - 1] = NowTime[Classes - 1] / OutPeople[Classes - 1] * WaitPeople[Classes - 1];
    Indicator.innerHTML = Math.floor(WaitTime[Classes - 1]) + 1;
    Rotation[Classes - 1][Rotation[Classes - 1].length] = tmp;
    tmp = 0;
    for (let i = 0; i < Rotation[Classes - 1].length * 2; i++) {
        Labels[i] = i + 1;
    }
    GraphContext.update();
}

/*
function Send(Data) {
    let SendData = new FormData();
    SendData.append("Translation", SendData);
    fetch("POST", {
        method: "POST",
        body: SendData
    }).catch(function (e) {
        console.error(e);
        alert("You did it! I understand that you made mistake, but you shoud not give up. I'm sure that you will make it someday!");
    });
}
*/
 window.setInterval(WaitTimeCalc, 60000);
