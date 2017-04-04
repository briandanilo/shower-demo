import { createStore } from 'redux'
import Server from './server.js';
import Views from './views.js';
export default function app() {

  const initialState = { items: [], }

  const storeDispatchProcessor = function (state,action) {

     if (state === undefined)
       state = initialState;

     switch (action.type){
      case "LOAD_PAGE":
        console.log("action type: ",action.type);
        views.showLoginForm();
        break;
      case "TESTING":
        console.log("action type: ",action.type);
        return state
      case "AUTHENTICATE_USER":
        console.log("action type: ",action.type);
        server.authenticateUser(action.username,action.password)
        break;
      case "HANDLE_LOGIN":
        console.log("action type: ",action.type);
        views.hideLoginForm();
        views.showWelcomeBanner(action);
        let tempState = Object.assign({},state,{userToken:action.userToken,username:action.name})
        return tempState;
      case "GET_TODOS":
        console.log("action type: ",action.type);
       default:
         return state
     }
   }

  const store = createStore(storeDispatchProcessor);
  const server = new Server(store)
  const views = new Views(store)

  store.dispatch({ type: "LOAD_PAGE" })



}
