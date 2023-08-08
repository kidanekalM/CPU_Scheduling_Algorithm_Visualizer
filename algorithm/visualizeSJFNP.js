function visualizeSJFNP(){
    if (queue.length > 0) {
        let process = queue[queue.length-1];
        index = queue.length-1;
        for(i=queue.length-1;i>=0;i--){
            if(process.remainingTime>queue[i].remainingTime){
                index = i;
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
        process = addToGantt(process, ganttDuration);
        currentTime += ganttDuration;
        process.completionTIme = currentTime;
        process.remainingTime = 0;
        
      } 
      else {
        idle(1);
        currentTime+=1;
        console.log("queue is empty");
      }    
    checkArrivingProcess();
}