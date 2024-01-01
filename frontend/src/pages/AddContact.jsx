import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../components/Alert";
import {
	addContactAsyncThunk,
	addContactSlice,
} from "../features/contact/contactSlice";
import Loader from "../components/Loader";

const AddContact = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error } = useSelector((state) => state.contact);

	const [showAlertData, setShowAlertData] = useState({
		show: false,
		title: "",
		message: "",
	});

	const handleAdd = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		if (data.phone.length !== 10) {
			setShowAlertData({
				show: true,
				title: "Error",
				message: "Contact number must be 10 digits long.",
			});
			setTimeout(() => {
				setShowAlertData({
					show: false,
					title: "",
					message: "",
				});
			}, 3000);
			return;
		}

		dispatch(addContactSlice({ _id: Math.random(), ...data }));

		// const res = await dispatch(addContactAsyncThunk(data));

		// if (res.meta.requestStatus === "fulfilled") {
		// 	navigate("/");
		// }
	};

	if (error) {
		setShowAlertData({
			show: true,
			title: "Error",
			message: error,
		});
		setTimeout(() => {
			setShowAlertData({
				show: false,
				title: "",
				message: "",
			});
		}, 10000);
	}

	return (
		<>
			<Alert
				message={showAlertData.message}
				showAlert={showAlertData.show}
				title={showAlertData.title}
			/>

			<div className="bg-gray-100 min-h-screen p-4">
				<div className=" sm:max-w-lg sm:w-full bg-white mx-auto rounded-lg">
					<h2 className="text-center pt-10 p-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Add new contact
					</h2>

					<form onSubmit={handleAdd} className="p-4 space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									required
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									required
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Contact Number
							</label>
							<div className="mt-2">
								<input
									id="phone"
									name="phone"
									type="number"
									required
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{loading ? <Loader /> : "Add"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddContact;
