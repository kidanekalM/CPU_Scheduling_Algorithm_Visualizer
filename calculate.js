function algo(avgWT ,avgCT ,avgTRT ,avgRT){
    this.avgCT = avgCT
    this.avgRT = avgRT
    this.avgTRT = avgTRT
    this.avgWT = avgWT
}
let algorithms = {
    FCFS : new algo(),
    RR : new algo(),
    SJFNP:new algo(),
    SJFP:new algo(),
    PNP:new algo(),
    PP:new algo()
}

function calculate(Processes) {
    for(i=0;i<Processes.length;i++){
        Processes[i].turnRoundTime = Processes[i].completionTIme-Processes[i].arrivalTime;
        Processes[i].waitTime = Processes[i].turnRoundTime - Processes[i].burstTime;
        tableData = document.querySelector('tr:nth-child('+(i+2)+') td:nth-child(5)')
        tableData.innerText = Processes[i].turnRoundTime;
        tableData = tableData.nextElementSibling;
        tableData.innerText = Processes[i].completionTIme
        tableData = tableData.nextElementSibling;
        tableData.innerText = Processes[i].waitTime
        tableData = tableData.nextElementSibling;
        tableData.innerText = Processes[i].responseTime;
    }
    calcAvg(Processes);
}

function calcAvg(processes) {
    let avgs = new Object()
    avgs.avgCT = 0;
    avgs.avgRT = 0;
    avgs.avgTRT = 0;
    avgs.avgWT = 0;
    let c = 0;
    for(c=0;c<processes.length;c++){
        avgs.avgCT += processes[c].completionTIme
        avgs.avgRT += processes[c].responseTime
        avgs.avgTRT += processes[c].turnRoundTime
        avgs.avgWT += processes[c].waitTime
    }
    console.log("c == "+c);
    avgs.avgCT =Math.round( avgs.avgCT / c)
    avgs.avgRT =Math.round(avgs.avgRT/ c)
    avgs.avgTRT =Math.round(avgs.avgTRT/c) 
    avgs.avgWT = Math.round(avgs.avgWT/c)

    algorithms[selectedAlgo] = avgs;

}