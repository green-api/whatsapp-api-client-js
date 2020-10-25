
class SingleThreadJobScheduler {

    initJobs(jobs = []) {
        this.jobs = jobs
    }

    reschedule() {
        this.jobs.forEach(job => {
            job.needInterrupt = false;
            clearInterval(job.timerId)
            job.timerId = setInterval(job.run, job.intervalSec * 1000);
        })
    }    
    
    unschedule() {
        this.jobs.forEach(job => {
            job.needInterrupt = true;
            clearInterval(job.timerId)
        })
    }
}

export default SingleThreadJobScheduler;