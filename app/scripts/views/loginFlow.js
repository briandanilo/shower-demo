import moment from 'moment';

export default function LoginFlow(store) {

  $('#login-submit-btn').on('click',function(e){
    console.log("btn clicked!")
    let u = $('#username-form').val();
    let p = $('#password-form').val();
    store.dispatch({type:"AUTHENTICATE_USER",username:u,password:p})
  })

  this.showLoginForm = function(){
    $('#login-form').show();
    $('#registration-form').hide();
    $('#new-user').on('click',function(e){
      e.preventDefault();
      $('#login-form').hide();
      $('#registration-form').show();
      $("#submit-registration").on('click',submitRegistration)
    })
  }

  this.hideLoginForm = function(){
    $('#login-form').hide();
    $('#registration-form').hide();

  }

  function submitRegistration(e){
    console.log("clicked reg button!")
    let n = $('#register-name').val();
    let m = $('#register-email').val();
    let p = $('#register-pass').val();
    let pp = $('#register-pass-confirm').val();
    if (p === pp)
      store.dispatch({type:"REGISTER_USER",name:n,email:m,password:p})
    else
      alert("passwords don't match!")
  }

  this.showWelcomeBanner = function(action){
    console.log("showing welcome banner")
    let el = `<p>Hello ${action.name}. Your token is ${action.userToken}.
    Don't fuck it up!`
    $('#welcome-banner').show();
    $('#welcome-banner').html(el);
  }



}
