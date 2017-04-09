import { createStore } from 'redux'
import Server from './server.js';
import LoginFlow from './views/loginFlow.js';
import JobDisplay from './views/jobDisplay.js';
import PostJob from './views/postJob.js';

export default function app() {

  const initialState = { items: [], }

  const storeDispatchProcessor = function (state,action) {

     if (state === undefined)
       state = initialState;

      console.log("current state ",state)

     switch (action.type){
      case "LOAD_PAGE":
        console.log("action type: ",action.type);
        loginView.showLoginForm();
        postJob.hideNewJobForm();
        return state;
      case "TESTING":
        console.log("action type: ",action.type);
        return state
      case "AUTHENTICATE_USER":
        console.log("action type: ",action.type);
        server.authenticateUser(action.username,action.password)
        return state;
      case "HANDLE_LOGIN":
        console.log("action type: ",action.type);
        loginView.hideLoginForm();
        loginView.showWelcomeBanner(action);
        server.getJobs(action);
        let tempState = Object.assign({},state,{userToken:action.userToken,username:action.name})
        console.log("temp state ",tempState)
        return tempState;
      case "UPDATE_JOBS":
        console.log(state,action)
        server.getJobs(state);
        return state;
      case "HANDLE_JOBS_QUERY":
        console.log("state ",state)
        console.log("action type: ",action.type, action.d.data);
        let jobs = action.d.data;
        jobDisplay.renderJobs(jobs);
        let newState = Object.assign({},state,{jobs:jobs})
        console.log("new state ",newState)
        return newState
      case "REGISTER_USER":
        server.registerUser(action.name,action.email,action.password);
        return state;
      case "RSVP_FOR_JOB":
        console.log("rsvp ",state.username, state.userToken, action.jobId)
        server.rsvp(state.username, state.userToken, action.jobId)
        return state
      case "JOB_TAKEN":
        console.log("state ",state,"action ",action)
        server.getJobs(state)
        return state;
      case "POST_NEW_JOB":
        console.log("state ",state,"action ",action)
        server.postJob(state,action)
        return state;
      default:
         return state
     }
   }
  //jobTitle,jobDate,ownerId
  const store = createStore(storeDispatchProcessor);
  const server = new Server(store)
  const loginView = new LoginFlow(store)
  const postJob = new PostJob(store)
  const jobDisplay = new JobDisplay(store)
  store.dispatch({ type: "LOAD_PAGE" })



}
