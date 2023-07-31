/** Queue enqueue dequeue addtogantt */
async function visualizeRoundRobin() {
    visualizerRunning = true;
    
        if(queue.length>0){

            let process = dequeue(0);
            
            if(process.arrivalTime > currentTime){
                idle(process.arrivalTime-currentTime);
            }
            if(process.remainingTime == process.burstTime){
                 process.responseTime = currentTime;
            }
            if(process.remainingTime<=quantum){
                ActiveProcesses = ActiveProcesses - 1;
           
                process = addToGantt(process,process.remainingTime);
                process.remainingTime = 0;

            }
            else if (process.remainingTime > quantum){
                process = addToGantt(process,quantum);
                enqueue(process);
            }
        }
        else{
        }
        
        
    visualizerRunning = false;
}


