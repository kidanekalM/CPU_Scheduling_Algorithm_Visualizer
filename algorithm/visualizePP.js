function visualizePP() {
    if (queue.length > 0) {
        let process = queue[0]
        let index = 0
        for(i=0;i<queue.length;i++){
            if(process.priority<queue[i].priority){
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
        if (process.remainingTime <= 1) {
          ActiveProcesses = ActiveProcesses - 1;
          process = addToGantt(process, 1);
          currentTime += 1;
          process.completionTIme = currentTime;
          process.remainingTime = 0;
        } 
        else if (process.remainingTime > 1) {
          process = addToGantt(process, 1);
          currentTime += 1;
          enqueue(process);
        }
      } 
      else {
        idle(1);
        currentTime+=1;
        console.log("queue is empty");
      }
        
    checkArrivingProcess();
}