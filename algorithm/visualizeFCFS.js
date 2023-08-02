function visualizeFCFS() {
    console.log("Visualize FCFS");
        if(queue.length>0){
            let process = dequeue(0);

            if(process.remainingTime == process.burstTime){
                process.responseTime = currentTime-process.arrivalTime;
            }
            
            if(process.arrivalTime > currentTime){
                idle(process.arrivalTime-currentTime);
            }
            ActiveProcesses = ActiveProcesses - 1; 
            ganttDuration = process.remainingTime; 
            process = addToGantt(process,process.remainingTime);
            currentTime+=ganttDuration;
            process.remainingTime = 0;
            process.completionTIme = currentTime;
        }
        else{
            idle(1);
            console.log("queue is empty");
        }
    checkArrivingProcess();
}
