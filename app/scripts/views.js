export default function Views(store) {

  $('#login-submit-btn').on('click',function(e){
    console.log("btn clicked!")
    let u = $('#username-form').val();
    let p = $('#password-form').val();
    store.dispatch({type:"AUTHENTICATE_USER",username:u,password:p})
  })

  this.showLoginForm = function(){
    $('#login-form').show();
  }

  this.hideLoginForm = function(){
    $('#login-form').hide();
  }

  this.showWelcomeBanner = function(action){
    console.log("showing welcome banner")
    let el = `<p>Hello ${action.name}. Your token is ${action.userToken}.
    Don't fuck it up!`
    $('#welcome-banner').show();
    $('#welcome-banner').html(el);
  }

  this.renderTodo = function(i,x,a){
    console.log("item ",i)
    let el = `<li>${i.name}</li>`
    $('#todo-list').append(el)
  }

}
