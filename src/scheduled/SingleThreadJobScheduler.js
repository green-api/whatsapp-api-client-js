
class SingleThreadJobScheduler {

    initJobs(jobs = []) {
        this.jobs = jobs
    }

    reschedule() {
        this.jobs.forEach(job => {
            clearInterval(job.timerId)
            job.timerId = setInterval(job.run, job.intervalSec * 1000);
        })
    }    
    
    unschedule() {
        this.jobs.forEach(job => {
            clearInterval(job.timerId)
        })
    }
}

export default SingleThreadJobScheduler;