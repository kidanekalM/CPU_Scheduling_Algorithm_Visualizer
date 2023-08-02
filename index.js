
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

btnAdd.addEventListener('click',function (params) {
    
    procName = document.getElementById('processName');
    arrivalTime = document.getElementById('arrivalTime');
    burstTime = document.getElementById('burstTime');
    priority = document.getElementById('priorityNum');
    color = document.getElementById('color');
    valid = [false,false,false,false,false];

    // Processes.map(p=>console.log(toString(p.procName)+" "+toString(procName.value)))
    
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
        process.isNew = true;
        process.remainingTime = process.burstTime;
        color[color.selectedIndex].disabled=true;
        Processes.push(process);
        unorderedProcesses.push(process);
        addToTable(process);
        alert(process.procName+" Added");
        console.log(Processes);
        color.selectedIndex=0;
        ActiveProcesses++;
    } 
})
// TODO EDit and Delete
let procsList = procList
document.getElementById('generate').addEventListener('click',function () {
    console.log(procsList);
    ChoosenType = document.getElementById('selectType')[document.getElementById('selectType').selectedIndex].value
    console.log(ChoosenType);
    if(ChoosenType != "random"){
        newProcs = procsList[ChoosenType]
        for(i=0;i<newProcs.length;i++){
            Processes.push(newProcs[i])
            unorderedProcesses.push(newProcs[i]);
            addToTable(newProcs[i]);
            ActiveProcesses++;
        }
    }
    else{
        
        for(i=0;i<5;i++){
            let process = Object();
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
            process.isNew=true;
            color[color.selectedIndex].disabled=true;
            Processes.push(process);
            unorderedProcesses.push(process);
            addToTable(process);
            ActiveProcesses++;
            color.selectedIndex=0;
        }/**/
        alert("5 processes added")
    }
})
document.getElementById('btnVisualize').addEventListener('click', function () {
    quantum = document.getElementById('txtQuantum').value;
    selectedAlgo = document.getElementById('selectAlgo')[document.getElementById('selectAlgo').selectedIndex].value
    if((quantum == "") || (parseInt(quantum)<=0)){
        alert('quantum number cannot be less or equal to zero')
    }
    else{
        quantum = parseInt(quantum);
            // initialize();
        if(selectedAlgo == "select"){
            alert('choose an algorithm!');
        }
        else if(selectedAlgo == "RR"){
            initialize(visualizeRoundRobin);
        }
        else if(selectedAlgo == "FCFS"){
            initialize(visualizeFCFS);
        }
        else if(selectedAlgo == "SJFNP"){
            initialize(visualizeSJFNP);
        }
        else if(selectedAlgo == "SJFP"){
            initialize(visualizeSJFP);
        } 
        else if(selectedAlgo == "PP"){
            initialize(visualizePP);
        }
        else if(selectedAlgo == "PNP"){
            initialize(visualizePNP);
        }
        
    }
  })
function addToTable(process) {
    tableRow = document.createElement('tr');
    tableRow.innerHTML='<td>'+process.procName+'</td>'+'<td>'+process.arrivalTime+'</td>'+'<td>'+process.burstTime+'</td>'+'<td>'+process.priority+'</td><td></td><td></td><td></td><td></td>'+'<td style="background-color:'+process.color+'">'+process.color+'</td>'+'<td><button id="edit">Edit</button><button id="delete">Delete</button></td>';
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
    for(i=0;i<Processes.length;i++){
        Processes[i].isNew = true;
        Processes[i].remainingTime = Processes[i].burstTime;
    }
    DOMqueue = document.getElementById('readyQueue')
    DOMqueue.innerHTML="";
    
    time(algorithm)

}

function checkArrivingProcess() {
    for(i=0;i<Processes.length;i++){
        if((Processes[i].arrivalTime<=currentTime)&&(Processes[i].isNew)){
            Processes[i].isNew = false;
            console.log(Processes[i].procName+"is in queue");
            process = Processes[i];
            DOMqueue = document.getElementById('readyQueue');
            queueItem = document.createElement('div');
            queueItem.className = 'ready time';
            queueItem.id = process.procName+process.remainingTime;
            queueItem.style.backgroundColor = process.color;
            queueItem.innerHTML = '<strong>'+process.procName+'<sub>  = '+process.remainingTime+'</sub>'+'</strong>';
            DOMqueue.appendChild(queueItem);
            queue.push(process);
        }
    }
}
/**@summary adds a process to the queue  @param process the proceess to add to queue */
async function enqueue(process,duration) {
    setTimeout(() => {
        DOMqueue = document.getElementById('readyQueue');
        queueItem = document.createElement('div');
        queueItem.className = 'ready time';
        queueItem.id = process.procName+process.remainingTime;
        queueItem.style.backgroundColor = process.color;
        queueItem.innerHTML = '<strong>'+process.procName+'<sub>  = '+process.remainingTime+'</sub>'+'</strong>';
        DOMqueue.appendChild(queueItem);
        queue.push(process);
    }, duration*1000);
    return;

}
/**@summary removes a process from the queue  */
/**@param index the the index of the process to remove from the queue */
function dequeue(index) {
    let removedProcess = queue.splice(index,1)[0];
    let domItem =document.querySelector('#'+removedProcess.procName+removedProcess.remainingTime); 

    domItem.className="past time";
    domItem.style.backgroundColor="grey";
    
    return removedProcess;
}
/**@summary to set idle time in the gantt chart */
function idle(duration) {
    let idleJob = document.createElement('div');
    idleJob.innerHTML='<h5>IDLE</h5>'+'<h6 class="checkPoint">'+currentTime+'</h6> ';
    idleJob.className='time idle';
    idleJob.style.animationName="grow"
    idleJob.style.animationDuration=duration+"s"
    idleJob.style.width=(6*duration)+"vw";
    document.getElementById('ganttChart').appendChild(idleJob);
}
/**@summary Will add the process to gantt chart and subtract the duration from the remaining time    */
function addToGantt(process,duration) {
    let job = document.createElement('div')
    job.innerHTML=' <h5>'+process.procName+'</h5>'+  '<h6 class="checkPoint">'+currentTime+'</h6> '
    job.className='time'
    job.style.backgroundColor=process.color;
    job.title = process.procName;
    job.style.width=(6*duration)+"vw";
    job.style.animationName="grow"
    job.style.animationDuration=duration+"s"
    document.getElementById('ganttChart').appendChild(job);
    process.remainingTime-=duration;
    return  process;    
}
function removeFromGantt(process) {}

function time(algorithm) {
    currentTime=0;
    timerObj = {
        timerID : 0
    }
    checkArrivingProcess();
    timerObj.timerID =  setInterval(function (){
        if(ActiveProcesses>0){
            algorithm();
            }
            else{
                clearInterval(timerObj.timerID);
                calculate(unorderedProcesses);
                drawBarChart("avgRT")
                drawBarChart("avgTRT")
                drawBarChart("avgWT")
            }
        } ,1000,algorithm,timerObj)
        

}

