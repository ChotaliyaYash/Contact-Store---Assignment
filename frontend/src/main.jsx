import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ViewAndEditPage from "./pages/ViewAndEditPage.jsx";
import NotFound from "./components/NotFound.jsx";
import AddContact from "./pages/AddContact.jsx";

import { getUserFromStorage } from "./features/user/userSlice";
import { getContactFromStorage } from "./features/contact/contactSlice.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/signup",
				element: <SignupPage />,
			},
			{
				path: "",
				element: <PrivateRoute />,
				children: [
					{
						path: "/",
						element: <HomePage />,
					},
					{
						path: "/contact/:id/:type",
						element: <ViewAndEditPage />,
					},
					{
						path: "/contact/add",
						element: <AddContact />,
					},
				],
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

store.dispatch(getUserFromStorage());
store.dispatch(getContactFromStorage());

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
