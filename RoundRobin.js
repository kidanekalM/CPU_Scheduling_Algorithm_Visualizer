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
                console.log("Process remaining time < quantum");
                console.log("active  = "+ActiveProcesses);
                ActiveProcesses = ActiveProcesses - 1;
                console.log("Active processes after subtra = " +ActiveProcesses);
                console.log(process);

                process = addToGantt(process,process.remainingTime);
                // process = Processes.find((proc)=>{proc.procName === process.procName;});
                console.log(Processes);
                process.remainingTime = 0;

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
            // currentTime++;
        }
        // checkProcesses();
        
    // }
        
        
    visualizerRunning = false;
}


function calculate(Processes) {
    console.log("calculateing");
    console.log(Processes);
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
        tableData.innerText = Processes[i].responseTime
    }
}
