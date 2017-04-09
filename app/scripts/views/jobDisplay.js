import moment from 'moment';

export default function JobDisplay(store) {

  this.renderJobs = function(jobs){
    $('#jobs-list').empty();
    jobs.forEach(function(i){
      let time = moment(i.jobStartTime).format('l')
      let el = `<li>${i.name} at ${time}.  Taken by ${i.taker}<button class="rsvp-btn" id="${i.objectId}">RSVP</button></li>`
      if (i.taker != "open")
        el = `<li>${i.name} at ${time}.  Taken by ${i.taker}.</li>`
      $('#jobs-list').append(el);
    })
    $('.rsvp-btn').on('click',function(e){
      store.dispatch({type:"RSVP_FOR_JOB", jobId:e.currentTarget.id})
    })
  }
}
