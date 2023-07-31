function visualizeFCFS() {
    console.log("Visualize FCFS");
        if(queue.length>0){
            let process = dequeue(0);

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
