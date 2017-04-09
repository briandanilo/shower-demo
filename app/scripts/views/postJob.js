import moment from 'moment';

export default function PostJob(store) {


  $('#submit-new-job').on('click',function(e){
    console.log("btn clicked!")
    let t = $('#new-job-title').val();
    let d = $('#new-job-date').val();
    $('#new-job-title').val("");
    $('#new-job-date').val("");
    store.dispatch({type:"POST_NEW_JOB",jobTitle:t,jobDate:d})
  })

  this.hideNewJobForm = function(){
    $('#job-post-form').hide();
  }


}
