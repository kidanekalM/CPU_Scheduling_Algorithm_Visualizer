btnAdd = document.getElementById('btnadd');
let Processes = [];
let queue = [];
let quantum = 0;
let currentTime = 0;
console.log( document.getElementById('color'));
btnAdd.addEventListener('click',function (params) {
    
    procName = document.getElementById('processName');
    arrivalTime = document.getElementById('arrivalTime');
    burstTime = document.getElementById('burstTime');
    color = document.getElementById('color');
    valid = [false,false,false,false];

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
    if(((Processes.length > 0) && Processes.some(p=>p.color == color[color.selectedIndex].value)) || (color[color.selectedIndex].value =="select")){
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
        console.log(color[color.selectedIndex])
        color[color.selectedIndex].disabled=true;
        Processes.push(process);
        addToTable(process);
        alert(process.procName+" Added");
        console.log(Processes);
        color.selectedIndex=0;
        initialize()   
    } 
})
document.getElementById('btnVisualize').addEventListener('click',function () {
    quantum = document.getElementById('txtQuantum').value;
    if(parseInt(quantum)>=0){
        alert('quantum number cannot be less or equal to zero')
    }
    else{
        visualize();
    }
  })
function addToTable(process) {
    tableRow = document.createElement('tr');
    tableRow.innerHTML='<td>'+process.procName+'</td>'+'<td>'+process.arrivalTime+'</td>'+'<td>'+process.burstTime+'</td>'+'<td style="background-color:'+process.color+'">'+process.color+'</td>'+'<td></td>';
    console.log("last child is");
    document.getElementById('table').lastElementChild.lastElementChild.before(tableRow);

}
// document.getElementsByClassName('ready time')[0].className='past time';
function initialize() {
    queue=[];
    for(i=0;i<Processes.length;i++){
        process = Object();
        
        process.procName = Processes[i].procName;
        process.arrivalTime = Processes[i].arrivalTime;
        process.burstTime = Processes[i].burstTime;
        process.color = Processes[i].color;
        queue.push(process);
    }

    for(j=0;j<queue.length;j++){
        for(i=j;i<queue.length;i++){
            if(queue[j].arrivalTime>queue[i].arrivalTime){
                temp = queue[i];
                queue[i]=queue[j];
                queue[j]=temp;
            }        
        }
    }
    queue = queue.sort((a,b)=>{b.arrivalTime-a.arrivalTime});
    
    DOMqueue = document.getElementById('readyQueue')
    console.log("CHildrem");
    console.log(DOMqueue.children);
    DOMqueue.innerHTML="";
    for(i=0;i<queue.length;i++){
        addToQueue(queue[i]);
    }
    console.log(queue);
    console.log(Processes);
}
// function addToGantt(process){
    
//     document.getElementsByClassName('ready time')[0].className='past time';
    
//     div = document.createElement('div');
//     div.className = 'time'
//     div.style.backgroundColor = 'blue';
//     div.style.width = quantum+"vw";
//     document.getElementById('readyQueue').appendChild(div);
// }
function addToQueue(process) {
    DOMqueue = document.getElementById('readyQueue');
    queueItem = document.createElement('div');
    queueItem.className = 'ready time';
    queueItem.style.backgroundColor = process.color;
    queueItem.innerHTML = '<strong>'+/*process.procName+*/'<sub> RT = '+process.burstTime+'</sub>'+'</strong>';
    DOMqueue.appendChild(queueItem);
    queue.push(process);
}
function removeFromQueue() {
    document.querySelector('.ready.time').className="past time";
    return queue.shift();
}
function wait(duration) {
    setTimeout(function() {
            
    },idleDuration*1000);
}
function addToGantt(process) {
    if(currentTime<process.arrivalTime){
        idle = document.createElement('div');
        idle.innerHTML='<h6 class="checkPoint">'+currentTime+'</h6>';
        idle.className='time idle';
        idleDuration = process.arrivalTime-currentTime;
        idle.style.animationName="grow"
        idle.style.animationDuration=duration+"s"
        idle.style.width=(6*idleDuration)+"vh";
        document.getElementById('ganttChart').appendChild(idle);
        currentTime += idleDuration;
        wait(idleDuration)
    }
    duration = process.burstTime>quantum?process.burstTime-quantum:process.arrivalTime;
    job = document.createElement('div')
    job.innerHTML='<h6 class="checkPoint">'+currentTime+'</h6>'
    job.className='time'
    job.style.backgroundColor=process.color;
    job.title = process.procName;
    job.style.width=(duration)+'vh';
    job.style.animationName="grow"
    job.style.animationDuration=duration+"s"
    currentTime+=duration;
    document.getElementById('ganttChart').appendChild(idle);
    process.burstTime-=quantum;
    wait(duration)
    return process;

}
function removeFromGantt(process) {}
function visualize() {
    time = 0

    while(queue.length!=0){
        
        process = removeFromQueue();
        //IF current time is > arrival time IDLE
        process = addToGantt(process);

        if(process.burstTime !=0){
            addToQueue(process);
        }

    }
}
