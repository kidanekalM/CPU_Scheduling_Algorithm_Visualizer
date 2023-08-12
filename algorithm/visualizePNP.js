function visualizePNP() {
    if (queue.length > 0) {
        let process = queue[0]
        let index = 0;
        for(i=0;i<queue.length;i++){
            if(process.priority>queue[i].priority){
                index = i
                console.log("index");
                console.log(index);
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