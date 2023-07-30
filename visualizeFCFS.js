function visualizeFCFS() {
    console.log("Visualize FCFS");
        if(queue.length>0){
            let process = dequeue();

            if(process.remainingTime == process.burstTime){
                process.responseTime = currentTime;
            }
            
            if(process.arrivalTime > currentTime){
                idle(process.arrivalTime-currentTime);
            }
            ActiveProcesses = ActiveProcesses - 1;            
            process = addToGantt(process,process.remainingTime);
            process.remainingTime = 0;
        }
        else{
            console.log("queue is empty");
        }
}

/*
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
                process.responseTime = currentTime;
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

*/