btnAdd = document.getElementById('btnadd');
let unorderedProcesses = [];
let Processes = [];
let queue = [];
let quantum = 0;
let currentTime = 0;
let visualizerRunning = new Object()
visualizerRunning = false;
let ActiveProcesses = 0;
let timerId = 0;
let selectedAlgo = ""
/*
let FCFS = new Object()
FCFS.currentTime = 0;
FCFS.queue = [];
let SJFNPremptive = new Object()
SJFNPremptive.currentTime=0;
SJFNPremptive.queue=[];
let SJFPremptive = new Object()
SJFPremptive.currentTime=0;
SJFPremptive.queue=[]
let RoundRobin = new Object()
RoundRobin.currentTime=0;
RoundRobin.queue=[]
let PriorityPremptive = new Object()
PriorityPremptive.avgWT = 0;
PriorityPremptive.avgTRT = 0;
PriorityPremptive.avgCT = 0;
PriorityPremptive.avgRT = 0;
PriorityPremptive.currentTime=0;
PriorityPremptive.queue=[];
let PriorityNPremptive = new Object()
PriorityNPremptive.avgWT = 0;
PriorityNPremptive.avgTRT = 0;
PriorityNPremptive.avgCT = 0;
PriorityNPremptive.avgRT = 0;
PriorityNPremptive.currentTime=0;
PriorityNPremptive.queue=[];
*/

console.log( document.getElementById('color'));
btnAdd.addEventListener('click',function (params) {
    
    procName = document.getElementById('processName');
    arrivalTime = document.getElementById('arrivalTime');
    burstTime = document.getElementById('burstTime');
    priority = document.getElementById('priorityNum');
    color = document.getElementById('color');
    valid = [false,false,false,false,false];

    Processes.map(p=>console.log(toString(p.procName)+" "+toString(procName.value)))
    console.log(Processes.every(p=>p.procName == procName));
    
    if((procName.value == "") ){
        alert('Process name must be non empty and unique !!');
        procName.value="";
        valid[0] = false;
    }
    else if((Processes.length !=0) && (Processes.some(p=>p.procName == procName.value))){
        alert('Process name must be non empty and unique !!');
        procName.value="";
        valid[0] = false;
    }
    else{
        valid[0] =true;
    }
    if((parseInt(arrivalTime.value) < 0) || (parseInt(arrivalTime.value)> 100) ){
        alert('Arrival Time Should be between 0 and 100')
        arrivalTime.value = "";
        valid[1] = false;
    }
    else{
        valid[1] = true;
    }
    if((parseInt(burstTime.value)< 0) || (parseInt(burstTime.value)> 100) ){
        alert('Burst Time Should be between 0 and 100')
        burstTime.value="";
        valid[2] = false;
    }
    else{
        valid[2] = true;
    }
    if(((Processes.length > 0) && Processes.some(p=>p.color == color[color.selectedIndex].value)) || (color[color.selectedIndex].value =="select")){
        valid[3] = false;
        alert('Color should be unique');
    }
    else{
        valid[3] = true;
    }
    if((parseInt(priority.value) < 0) || (parseInt(priority.value)>100)){
        valid[4] = false;
        alert('priority number should be between 0 and 100');
    }
    else{
        valid[4] = true
    }

    if(valid.every(val=> val==true)){
        process = Object();
        process.procName = procName.value;
        process.arrivalTime = parseInt(arrivalTime.value);
        process.burstTime = parseInt(burstTime.value);
        process.color = color[color.selectedIndex].value;
        process.priority = parseInt(priority.value);
        process.responseTime = 0;
        process.completionTIme = 0;
        process.remainingTime = process.burstTime;
        console.log(color[color.selectedIndex])
        color[color.selectedIndex].disabled=true;
        Processes.push(process);
        unorderedProcesses.push(process);
        addToTable(process);
        alert(process.procName+" Added");
        console.log(Processes);
        color.selectedIndex=0;
        ActiveProcesses++;
        console.log("active == " +ActiveProcesses);
        // initialize()   
    } 
})

// TODO EDit and Delete
document.getElementById('generate').addEventListener('click',function () {
    for(i=0;i<5;i++){
        process = Object();
        process.procName = "P"+i;
        process.arrivalTime = Math.floor(Math.random()*10);
        process.burstTime = Math.floor(Math.random()*10)+1;
        process.color = document.getElementById('color')[i+1].value;
        process.priority = Math.floor(Math.random()*10);
        process.responseTime = 0;
        process.completionTIme = 0;
        process.turnRoundTime = 0;
        process.waitTime = 0;
        process.remainingTime = process.burstTime;
        color[color.selectedIndex].disabled=true;
        Processes.push(process);
        unorderedProcesses.push(process);
        addToTable(process);
        color.selectedIndex=0;
        ActiveProcesses++;
    }
    alert("5 processes added")
  })
document.getElementById('btnVisualize').addEventListener('click', function () {
    console.log(document.getElementById('txtQuantum'));
    quantum = document.getElementById('txtQuantum').value;
    console.log((quantum));
    algo = document.getElementById('selectAlgo')[document.getElementById('selectAlgo').selectedIndex].value
    if((quantum == "") || (parseInt(quantum)<=0)){
        alert('quantum number cannot be less or equal to zero')
    }
    else{
        quantum = parseInt(quantum);
            // initialize();
        if(algo == "select"){
            alert('choose an algorithm!');
        }
        else if(algo == "RR"){
            selectedAlgo = algo
            initialize(visualizeRoundRobin);
            //  visualizeRoundRobin();
        }
        else if(algo == "FCFS"){
            selectedAlgo = algo
            initialize(visualizeFCFS);
        }
        else if(algo == "SJFNP"){
            selectedAlgo = algo
            initialize(visualizeSJFNP);
        }
        else if(algo == "SJFP"){
            selectedAlgo = algo
            initialize(visualizeSJFP);
        } 
        else if(algo == "PP"){
            selectedAlgo = algo
            initialize(visualizePP);
        }
        else if(algo == "PNP"){
            selectedAlgo = algo
            initialize(visualizePNP);
        }
        
    }
  })
function addToTable(process) {
    tableRow = document.createElement('tr');
    tableRow.innerHTML='<td>'+process.procName+'</td>'+'<td>'+process.arrivalTime+'</td>'+'<td>'+process.burstTime+'</td>'+'<td>'+process.priority+'</td><td></td><td></td><td></td><td></td>'+'<td style="background-color:'+process.color+'">'+process.color+'</td>'+'<td><button id="edit">Edit</button><button id="delete">Delete</button></td>';
    console.log("last child is");
    document.getElementById('table').lastElementChild.lastElementChild.before(tableRow);

}
 async function initialize(algorithm) {
    queue=[];
    currentTime = 0;
    document.getElementById('ganttChart').innerHTML=""
    clearInterval(timerId);
    ActiveProcesses = Processes.length;

    for(j=0;j<Processes.length;j++){
        for(i=j;i<Processes.length;i++){
            if(Processes[j].arrivalTime>Processes[i].arrivalTime){
                temp = Processes[i];
                Processes[i]=Processes[j];
                Processes[j]=temp;
            }        
        }
    }

    DOMqueue = document.getElementById('readyQueue')
    console.log("Children");
    console.log(DOMqueue.children);
    DOMqueue.innerHTML="";
    
    for(i=0;i<Processes.length;i++){
        let process = Processes[i];
        // Object.assign(process,Processes[i]);
        console.log(process);
        
        setTimeout(function () {
            process.remainingTime = process.burstTime; 
             enqueue(process);
            console.log(Processes);
            console.log(queue);
            console.log(queue.length);
            time(algorithm)
            // algorithm();
            // console.log(visualizerRunning);
            },Processes[0].arrivalTime*1000,process,algorithm,visualizerRunning,i);
            
        }
    

}

async function enqueue(process) {
    DOMqueue = document.getElementById('readyQueue');
    queueItem = document.createElement('div');
    queueItem.className = 'ready time';
    queueItem.id = process.procName;
    queueItem.style.backgroundColor = process.color;
    queueItem.innerHTML = '<strong>'+process.procName+'<sub>  = '+process.remainingTime+'</sub>'+'</strong>';
    DOMqueue.appendChild(queueItem);
    queue.push(process);
    
    return;

}
function dequeue() {
    console.log("dequeue");
    console.log(queue);
    let domItem =document.querySelector('.ready.time'); 
    console.log(domItem);
    domItem.className="past time";
    domItem.style.backgroundColor="grey";
    
    return queue.shift();
}
function wait(duration) {
    setTimeout(function() {
            
    },duration*1000);
}
function idle(duration) {
    let idleJob = document.createElement('div');
    idleJob.innerHTML='<h5>IDLE</h5>'+'<h6 class="checkPoint">'+currentTime+'</h6> ';
    idleJob.className='time idle';
    idleJob.style.animationName="grow"
    idleJob.style.animationDuration=duration+"s"
    // idleJob.style.animationDelay = currentTime+"s"
    idleJob.style.width=(6*duration)+"vw";
    document.getElementById('ganttChart').appendChild(idleJob);
    // setTimeout(function () { document.getElementById('ganttChart').appendChild(idleJob); },duration*1000)
    
    currentTime += duration;
    // wait(duration)
    
}
/***
 * Will add the process to gantt chart and subtract the duration from the remaining time 
 */

function addToGantt(process,duration) {
    let job = document.createElement('div')
    console.log(currentTime);
    console.trace();
    job.innerHTML=' <h5>'+process.procName+'</h5>'+  '<h6 class="checkPoint">'+currentTime+'</h6> '
    job.className='time'
    job.style.backgroundColor=process.color;
    job.title = process.procName;
    job.style.width=(6*duration)+"vw";
    job.style.animationName="grow"
    job.style.animationDuration=duration+"s"
    // job.style.animationDelay = currentTime+"s"
    currentTime+=duration-1;
     document.getElementById('ganttChart').appendChild(job);
    //  job.animate({width:(6*duration)+"vw"},duration+"s")    // setTimeout(function () { },duration*1000)
    process.completionTIme = currentTime+1;
    process.remainingTime-=duration;
    // wait(duration)
    
    return process;    
}
function removeFromGantt(process) {}

function time(algorithm) {
    currentTime=0;
    timerObj = {
        timerID : 0
    }
    timerObj.timerID =  setInterval(function (){
            if(ActiveProcesses>0){
                algorithm();
                currentTime++; 
                console.log("intimer");
                console.log(ActiveProcesses);
                console.log(currentTime);
            }
            else{
                console.log("active processes is zero");
                clearInterval(timerObj.timerID);
                console.log(timerObj.timerID);
                console.log(unorderedProcesses);
                calculate(unorderedProcesses);
                drawBarChart("avgRT")
                drawBarChart("avgTRT")
                drawBarChart("avgWT")
            }
        } ,1000,algorithm,timerObj)
        

}

