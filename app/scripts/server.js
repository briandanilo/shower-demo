export default function Server(store) {

  const QUERY_URL = 'http://api.backendless.com/v1/data/todos'
  const AUTH_URL = 'https://api.backendless.com/v1/users/login';
  const APP_ID =  '83DD562A-8221-C480-FF2A-2F7C87E9F700';
  const SECRET_KEY =  '3ED81095-FAB1-DF19-FF8C-794481769700';

  this.createTodo = function(action){
    let settings = {
      type: 'POST',
      contentType: 'application/json',
      url: QUERY_URL,
      headers: {
        "application-id": APP_ID,
        "secret-key": SECRET_KEY,
        "user-token":action.userToken
      }
   }

   $.ajax(settings).then(function(d,s,x){
     store.dispatch({type:"HANDLE_TODO_QUERY",d});
   })
  }

  this.getTodos = function(action){
    let whereClause = `?where=ownerId%3D%27${action.name}%27`;
    let settings = {
      type: 'GET',
      contentType: 'application/json',
      url: QUERY_URL+whereClause,
      headers: {
        "application-id": APP_ID,
        "secret-key": SECRET_KEY,
        "user-token":action.userToken
      }
   }

   $.ajax(settings).then(function(d,s,x){
     store.dispatch({type:"HANDLE_TODO_QUERY",d});
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
     store.dispatch({type:"HANDLE_LOGIN",userToken,name});
   })


  }



}
