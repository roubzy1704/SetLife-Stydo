import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Auth from "./components/Pages/Auth/Auth";
import Navbar from "./components/navbar/navbar";
import DashboardHome from "./components/Pages/Dashboard/DashboardHome";
import ProjectHome from "./components/Pages/Project/ProjectHome";
import NewProjectForm from "./components/Pages/Project/NewProjectForm";
import ProjectBoard from "./components/Pages/ProjectBoard/ProjectBoard";
import NotFound from "./components/Pages/NotFound";
import projectReducer from "./Store/Reducers/ProjectReducer";
import userReducer from "./Store/Reducers/userReducer";
import MoodBoard from "./components/Pages/ProjectBoard/moodBoard/MoodBoard";
import Contacts from "./components/Pages/ProjectBoard/Contacts/Contacts";
import Requests from "./components/Pages/ProjectBoard/Requests/Requests";
import EmailTemplates from "./components/Pages/ProjectBoard/EmailTemplates/EmailTemplates";
import NewTemplate from "./components/Pages/ProjectBoard/EmailTemplates/NewTemplate/NewTemplate";
import CallSheet from "./components/Pages/ProjectBoard/CallSheet/CallSheet";
import BudgetReceipts from "./components/Pages/ProjectBoard/BudgetReceipts/BudgetReceipts";
import Files from "./components/Pages/ProjectBoard/Files/Files";
import PullInventory from "./components/Pages/ProjectBoard/PullInventory/PullInventory";
import Archive from "./components/Pages/ProjectBoard/Archive/Archive";
import Database from "./components/Pages/Database/Database";
import BrandContacts from "./components/Pages/Database/BrandContacts";
import ForumHome from "./components/Pages/Forum/ForumHome";
import NewForumPost from "./components/Pages/Forum/NewForumPost";
import { errorsReducer } from "./Store/Reducers/ErrorReducer";

//TODO import shared.css but first convert it to sass and resolve css conflicts

const rootReducer = combineReducers({
	projects: projectReducer,
	error: errorsReducer,
	user: userReducer,
});

const middlewares = [thunk];

//The important thing to note about setting up redux-thunk is that you have to wrap it in applyMiddleware before passing it to Redux.
const store = createStore(rootReducer, applyMiddleware(...middlewares));

function App() {
	//*add login, auth, token state and work on updating route navigation if I get the project
	//*might have to use Redux, definetly will use context, callback, and ref hooks
	//*also explore adding error boundaries in future

	// if (!isLoggedIn) {
	// 	return (
	// 		<React.Fragment>
	// 			<Router basename="/setlife-demo">
	// 				<Navbar />
	// 				<div className="container-fluid">
	// 					<div className="center">
	// 						<Auth />
	// 					</div>
	// 				</div>
	// 			</Router>
	// 		</React.Fragment>
	// 	);
	// }
	//simple router flow for now, with DashBoardHome, projectHome and Create new project routes
	return (
		<div className="container-fluid pl-5 pr-5 pt-2 pb-5">
			<Provider store={store}>
				{/* <ToastContainer /> */}
				{/* Same as */}
				{/* <ToastContainer /> */}
				<Router basename="/STYDO">
					<Navbar />
					<div className="container pt-5">
						<Switch>
							<Route path="/" exact>
								<Auth />
							</Route>
							<Route path="/dashboard" exact>
								<DashboardHome />
							</Route>
							<Route path="/database" exact>
								<Database />
							</Route>
							<Route path="/database/:brandName" exact>
								<BrandContacts />
							</Route>
							<Route path="/forum" exact>
								<ForumHome />
							</Route>
							<Route path="/forum/newForumPost" exact>
								<NewForumPost />
							</Route>
							<Route path="/projectHome" exact>
								<ProjectHome />
							</Route>
							<Route path="/newprojectForm" exact>
								<NewProjectForm />
							</Route>
							<Route path="/ProjectBoard/:projectId" exact>
								<ProjectBoard />
							</Route>
							<Route path="/ProjectBoard/:projectId/moodBoard" exact>
								<MoodBoard />
							</Route>
							<Route path="/ProjectBoard/:projectId/contacts" exact>
								<Contacts />
							</Route>
							<Route path="/ProjectBoard/:projectId/requests" exact>
								<Requests />
							</Route>
							<Route
								path="/ProjectBoard/:projectId/:user_id/emailTemplates"
								exact>
								<EmailTemplates />
							</Route>
							<Route
								path="/ProjectBoard/:projectId/:user_id/emailTemplates/newTemplate"
								exact>
								<NewTemplate />
							</Route>
							<Route path="/ProjectBoard/:projectId/callSheet" exact>
								<CallSheet />
							</Route>
							<Route path="/ProjectBoard/:projectId/budgetReceipts" exact>
								<BudgetReceipts />
							</Route>
							<Route path="/ProjectBoard/:projectId/files" exact>
								<Files />
							</Route>
							<Route path="/ProjectBoard/:projectId/pullInventory" exact>
								<PullInventory />
							</Route>
							<Route path="/ProjectBoard/:projectId/archive" exact>
								<Archive />
							</Route>
							<Route path="/notFound" exact>
								<NotFound />
							</Route>

							<Redirect to="/" />
						</Switch>
					</div>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
