/**@summary algorithm to simulate RR will only iterate once and will require multiple calls usning Activeprocesses as a var*/
async function visualizeRoundRobin() {
  if (queue.length > 0) {
    let process = dequeue(0);

    if (process.arrivalTime > currentTime) {
      idle(process.arrivalTime - currentTime);
    }
    if (process.remainingTime == process.burstTime) {
      process.responseTime = currentTime - process.arrivalTime;
    }
    if (process.remainingTime <= quantum) {
      ActiveProcesses = ActiveProcesses - 1;
      ganttDuration = process.remainingTime;
      process = addToGantt(process, ganttDuration);
      currentTime += ganttDuration;
      process.completionTIme = currentTime;
      process.remainingTime = 0;
    } 
    else if (process.remainingTime > quantum) {
      process = addToGantt(process, quantum);
      currentTime += quantum;
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
