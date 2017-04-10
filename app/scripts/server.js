export default function Server(store) {

  const EMAIL_SERVER = 'https://friendlywager.herokuapp.com/sendEmail'
  const REG_URL = 'https://api.backendless.com/v1/users/register';
  const QUERY_URL = 'http://api.backendless.com/v1/data/jobs'
  const AUTH_URL = 'https://api.backendless.com/v1/users/login';
  const APP_ID =  '83DD562A-8221-C480-FF2A-2F7C87E9F700';
  const SECRET_KEY =  '3ED81095-FAB1-DF19-FF8C-794481769700';



  this.rsvp = function (user, email, token, job){
    console.log("about to rsvp!!!!")
    console.log("user,token,job",user,token,job)
    let settings = {
      type: 'PUT',
      contentType: 'application/json',
      url: QUERY_URL+`/${job}`,
      headers: {
        "application-id": APP_ID,
        "secret-key": SECRET_KEY,
        "user-token":token
      },
      data: JSON.stringify({
        "taker":user,
        "takerEmail":email
      }),
   }

   $.ajax(settings).then(function(d,s,x){
     console.log("rsvp response ",d,s,x);
     console.log("lets send a fucking email!");
     sendEmail(d.listerEmail,d.takerEmail,d.jobDate,d.jobTitle)
     store.dispatch({type:"JOB_TAKEN",d});
   })
  }

  this.postJob = function(state,action){
    let settings = {
      type: 'POST',
      contentType: 'application/json',
      url: QUERY_URL,
      headers: {
        "application-id": APP_ID,
        "secret-key": SECRET_KEY,
        "user-token":state.userToken
      },
      data: JSON.stringify({
        "name":action.jobTitle,
        "jobStartTime":action.jobDate,
        "ownerId":state.username,
        "listerEmail":state.email
      }),
   }

   $.ajax(settings).then(function(d,s,x){
     console.log("response from post job ",d,s,x)
     store.dispatch({type:"UPDATE_JOBS"});
   })
  }

  const sendEmail = function(lister,shower,jobDate,jobTitle){
    let settings = {
      type: 'POST',
      contentType: 'application/json',
      url: EMAIL_SERVER,
      data: JSON.stringify({
        "lister":lister,
        "shower":shower,
        "emailPeople":[lister,shower],
        "jobDate":jobDate,
        "jobTitle":jobTitle
      }),
   }
   console.log("sending an email w/ content ",settings.data)
   $.ajax(settings).then(function(d,s,x){
     console.log("response from post job ",d,s,x)
   })
  }

  this.getJobs = function(state){
    console.log("getting jobs!")
    console.log("state ",state)
    //let whereClause = `?where=ownerId%3D%27${action.name}%27`;
    let settings = {
      type: 'GET',
      contentType: 'application/json',
      url: QUERY_URL,//+whereClause,
      headers: {
        "application-id": APP_ID,
        "secret-key": SECRET_KEY,
        "user-token":state.userToken
      }
   }

   $.ajax(settings).then(function(d,s,x){
     store.dispatch({type:"HANDLE_JOBS_QUERY",d});
   })

  }

  this.authenticateUser = function(username,password){
    console.log("attempting to authneticate")
    let settings = {
      type: 'POST',
      contentType: 'application/json',
      applicationType: 'REST',
      url: AUTH_URL,
      headers: {
        "application-id": APP_ID,
        "secret-key": SECRET_KEY,
      },
      data: JSON.stringify({
        "login":username,
        "password":password
      }),
      processData:false,
      error: function(d,s,x) {
        alert("invalid username or pass")
      }
   }

   $.ajax(settings).then(function(d,s,x){
     console.log("response ",d)
     let userToken = d["user-token"];
     let name = d["name"];
     let email = d["email"];
     store.dispatch({type:"HANDLE_LOGIN",userToken,name,email});
   })


  }


  this.registerUser = function(name,email,password){
    console.log("attempting to register")
    let settings = {
      type: 'POST',
      contentType: 'application/json',
      applicationType: 'REST',
      url: REG_URL,
      headers: {
        "application-id": APP_ID,
        "secret-key": SECRET_KEY,
      },
      data: JSON.stringify({
        "name":name,
        "email":email,
        "password":password
      }),
      processData:false,
      error: function(d,s,x) {
        alert("error! ",d,s,x)
      }
   }

   $.ajax(settings).then(function(d,s,x){
     console.log("reg response ",d)
    //  let userToken = d["user-token"];
    //  let name = d["name"];
    if (d.userStatus==="ENABLED")
      store.dispatch({type:"AUTHENTICATE_USER",username:name,password:password});
   })


 }
}
