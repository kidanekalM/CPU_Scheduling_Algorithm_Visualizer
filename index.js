btnAdd = document.getElementById('btnadd');
let Processes = [];
let queue = [];
console.log( document.getElementById('color'));
let currentTime = 0;
btnAdd.addEventListener('click',function (params) {
    
    procName = document.getElementById('processName');
    arrivalTime = document.getElementById('arrivalTime');
    burstTime = document.getElementById('burstTime');
    color = document.getElementById('color');
    valid = [false,false,false,false];
    console.log(Processes.every(p=>p.procName == procName));
    
    if((procName.value == "") ){
        alert('Process name must be non empty and unique !!');
        procName.value="";
        valid[0] = false;
    }
    else if((Processes.length !=0) && (Processes.every(p=>p.procName == procName))){
        alert('Process name must be non empty and unique !!');
        procName.value="";
        valid[0] = false;
    }
    else{
        valid[0] =true;
    }
    if((parseInt(arrivalTime.value)< 0) || (parseInt(arrivalTime.value)> 100) ){
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
    if((Processes.length > 0) && Processes.every(p=>p.color!= color[color.selectedIndex])){
        valid[3] = false;
        alert('Color should be unique');
    }
    else{
        valid[3] = true;
    }

    if(valid.every(val=> val==true)){
        process = Object();
        process.procName = procName.value;
        process.arrivalTime= arrivalTime.value;
        process.burstTime=burstTime.value;
        process.color = color[color.selectedIndex].value;
        Processes.push(process);

        alert(process.procName+" Added");
        console.log(Processes);
    } 
    initialize()   
})

// document.getElementsByClassName('ready time')[0].className='past time';
function initialize() {
    for(i=0;i<Processes.length;i++){
        process = Object();
        
        process.procName = Processes[i].procName;
        process.arrivalTime = Processes[i].arrivalTime;
        process.burstTime = Processes[i].burstTime;
        process.color = Processes[i].color;
        queue.push(process);
    }
    let temp;
    for(i=0;i<queue.length;i++){
        for(j=0;j<i;j++)
        if(queue[j].arrivalTime < queue[i].arrivalTime ){
            temp = queue[j]
            queue[j]= queue[i]
            queue[i] = temp
        }
    }
    console.log(queue);
    console.log(Processes);
}
function addToGantt(process){
    
    document.getElementsByClassName('ready time')[0].className='past time';
    
    div = document.createElement('div');
    div.className = 'time'
    div.style.backgroundColor = 'blue';
    div.style.width = quantum+"vw";
    document.getElementById('readyQueue').appendChild(div);
}
function addToQueue(process) {
    div = document.createElement('div');
    div.className = 'ready time'
    div.style.backgroundColor=process.color;
    div.innerHTML = '<h4>'+process.procName+'<sub> RT = '+process.burstTime+'</sub>' +'<h4>';
    
}

function visualize(queue) {

    // queue.sort();
    // console.log(queue);
    for(i=0;i<queue.length;i++){
        
        removeFromQueue(queue[i]);
        //IF current time is > arrival time IDLE
        addToGantt(queue[i]);

        if(queue[i].burstTime !=0){
            addToQueue(queue[i]);
        }

    }
}
