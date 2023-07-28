/*******************************
 * Make it run parallely
 */


btnAdd = document.getElementById('btnadd');
let Processes = [];
let queue = [];
let quantum = 0;
let currentTime = 0;
let visualizerRunning = new Object()
visualizerRunning = false;
let ActiveProcesses = 0;
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
             initialize(visualizeRoundRobin);
            //  visualizeRoundRobin();
        }
        else if(algo == "FCFS"){
            initialize(visualizeFCFS);
        }
        else if(algo == "SJFNP"){
            initialize(visualizeSJFNP);
        }
        else if(algo == "SJFP"){
            initialize(visualizeSJFP);
        } 
        else if(algo == "PP"){
            initialize(visualizePP);
        }
        else if(algo == "PNP"){
            initialize(visualizePNP);
        }
        
    }
  })
function addToTable(process) {
    tableRow = document.createElement('tr');
    tableRow.innerHTML='<td>'+process.procName+'</td>'+'<td>'+process.arrivalTime+'</td>'+'<td>'+process.burstTime+'</td>'+'<td>'+process.priority+'</td>'+'<td style="background-color:'+process.color+'">'+process.color+'</td>'+'<td><button id="edit">Edit</button><button id="delete">Delete</button></td>';
    console.log("last child is");
    document.getElementById('table').lastElementChild.lastElementChild.before(tableRow);

}
 async function initialize(algorithm) {
    queue=[];
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
        let process = new Object();
        Object.assign(process,Processes[i]);
        console.log(process);
        
        setTimeout(function () { 
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
    // checkProcesses();
    DOMqueue = document.getElementById('readyQueue');
    queueItem = document.createElement('div');
    queueItem.className = 'ready time';
    queueItem.id = process.procName;
    queueItem.style.backgroundColor = process.color;
    queueItem.innerHTML = '<strong>'+/*process.procName+*/'<sub> RT = '+process.remainingTime+'</sub>'+'</strong>';
    DOMqueue.appendChild(queueItem);
    queue.push(process);
    
    return;

}
function dequeue() {
    // checkProcesses();
    console.log("dequeue");
    console.log(queue);
    let domItem =document.querySelector('.ready.time'); 
    console.log(domItem);
    domItem.className="past time";
    // domItem.style.backgroundColor="grey";
    
    return queue.shift();
}
function wait(duration) {
    setTimeout(function() {
            
    },duration*1000);
}
function idle(duration) {
    let idleJob = document.createElement('div');
    idleJob.innerHTML='<h6 class="checkPoint">'+currentTime+'</h6>';
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
    // duration = process.burstTime>quantum?process.burstTime-quantum:process.arrivalTime;
    // if (currentTime == 0){
    //     currentTime = process.arrivalTime;
    // }
    let job = document.createElement('div')
    console.log(currentTime);
    console.trace();
    job.innerHTML='<h6 class="checkPoint">'+currentTime+'</h6>'
    job.className='time'
    job.style.backgroundColor=process.color;
    job.title = process.procName;
    job.style.width=(6*duration)+"vw";
    job.style.animationName="grow"
    job.style.animationDuration=duration+"s"
    // job.style.animationDelay = currentTime+"s"
    currentTime+=duration;
     document.getElementById('ganttChart').appendChild(job);
    // setTimeout(function () { },duration*1000)
    
    process.remainingTime-=duration;
    // wait(duration)
    return process;    
}
function removeFromGantt(process) {}

function checkProcesses() {
    console.log("Check Process");
    for(i=0;i<Processes.length;i++){
        if((Processes[i].arrivalTime<=currentTime) && (!(queue.some((job)=>{job.procName == Processes[i].procName}))) ){
            enqueue(Object.assign(Processes[i]));
            console.log("added ***************************");
            console.log(Processes[i]);
        }
    }
    if(queue.length==0){
        // currentTime++;
    }
}
function time(algorithm) {
    let num =  setInterval(function (){
            if(ActiveProcesses>0){
                algorithm();
                currentTime++; 
                console.log("intimer");
                console.log(currentTime);
            }
        } ,1000,algorithm)
        

}
async function visualizeRoundRobin() {
    console.log("Visualize round Robin");
    console.log(ActiveProcesses);
    visualizerRunning = true;
    
    // while( (ActiveProcesses > 0)){
        if(queue.length>0){

            console.log("in while loop of Visualize Round Robin");   
            let process = dequeue();
            console.log("removed");
            if(process.remainingTime == process.burstTime){
                process.responseTime = process.arrivalTime;
            }
            
            if(process.arrivalTime > currentTime){
                idle(process.arrivalTime-currentTime);
            }
            console.log("in loop");
            //IF current time is > arrival time IDLE
            if(process.remainingTime<=quantum){
                process = addToGantt(process,process.remainingTime);
                process = Processes.find((proc)=>{proc.procName == process.procName});
                process.completionTIme = currentTime;
                process.remainingTime = 0;
                ActiveProcesses--;

            }
            else if (process.remainingTime > quantum){
                process = addToGantt(process,quantum);
                // process.remainingTime -= quantum;
                enqueue(process);
            }
            // process = Object.assign(process);
        }
        else{
            console.log("queue is empty");
            // await wait(1);
            currentTime++;
        }
        // checkProcesses();
        
    // }
        
        
    visualizerRunning = false;
}
