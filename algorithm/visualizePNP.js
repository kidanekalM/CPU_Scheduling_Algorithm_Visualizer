function visualizePNP() {
    if (queue.length > 0) {
        let process = queue[queue.length]
        let index = 0
        for(i=queue.length;i>queue.length;i--){
            if(process.priority>queue[i].priority){
                index = i
            }
        }
        process = dequeue(index);
        if (process.arrivalTime > currentTime) {
          idle(process.arrivalTime - currentTime);
        }
        if (process.remainingTime == process.burstTime) {
          process.responseTime = currentTime - process.arrivalTime;
        }
        ActiveProcesses = ActiveProcesses - 1; 
        ganttDuration = process.remainingTime; 
        process = addToGantt(process,process.remainingTime);
        currentTime+=ganttDuration;
        process.remainingTime = 0;
        process.completionTIme = currentTime;
      } 
      else {
        idle(1);
        currentTime+=1;
        console.log("queue is empty");
      }
    
    checkArrivingProcess();
}