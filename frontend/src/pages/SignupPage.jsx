import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../components/Alert";
import { signupAsyncThunk } from "../features/user/userSlice";
import Loader from "../components/Loader";

export default function SignupPage() {
	const [city, setCity] = useState(null);
	const [state, setState] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error } = useSelector((state) => state.user);

	const [showAlertData, setShowAlertData] = useState({
		show: false,
		title: "",
		message: "",
	});

	const handleSignUp = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);

		// Validation

		if (`${data.phone}`.length !== 10) {
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

		if (data.password.length < 6) {
			setShowAlertData({
				show: true,
				title: "Error",
				message: "Password must be at least 6 characters long.",
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

		if (!city || !state) {
			setShowAlertData({
				show: true,
				title: "Error",
				message: "Please select your city and state.",
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

		// dispatch(
		// 	signupUser({ user: { ...data, state, city, phone: +data.phone } })
		// );

		const res = await dispatch(
			signupAsyncThunk({ ...data, state, city, phone: +data.phone })
		);

		if (res.meta.requestStatus === "fulfilled") {
			navigate("/");
		}
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
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign up to explore the new!
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSignUp}>
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
									autoComplete="email"
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
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="where"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								How did you hear about this?
							</label>
							<div className="mt-2 flex flex-wrap text-sm gap-5">
								{/* Radio Buttons */}
								<label className="inline-flex items-center">
									<input
										type="radio"
										className="form-radio"
										name="where"
										value="linkedin"
										required
									/>
									<span className="ml-2 font-medium leading-6 text-gray-900">
										LinkedIn
									</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										className="form-radio"
										name="where"
										value="friend"
										required
									/>
									<span className="ml-2 font-medium leading-6 text-gray-900">
										Friend
									</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										className="form-radio"
										name="where"
										value="jobportal"
										required
									/>
									<span className="ml-2 font-medium leading-6 text-gray-900">
										Job Portal
									</span>
								</label>
								<label className="inline-flex items-center">
									<input
										type="radio"
										className="form-radio"
										name="where"
										value="others"
										required
									/>
									<span className="ml-2 font-medium leading-6 text-gray-900">
										Others
									</span>
								</label>
							</div>
						</div>

						<div>
							<label
								htmlFor="city"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								City
							</label>
							<div className="mt-2">
								<select
									id="city"
									className="block w-full rounded-md border-0 px-1.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onChange={(e) => setCity(e.target.value)}
								>
									<option value={null}>Choose a City</option>
									<option value="mumbai">Mumbai</option>
									<option value="pune">Pune</option>
									<option value="ahmedabad">Ahmedabad</option>
								</select>
							</div>
						</div>

						<div>
							<label
								htmlFor="state"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								State
							</label>
							<div className="mt-2">
								<select
									id="state"
									onChange={(e) => setState(e.target.value)}
									className="block w-full rounded-md border-0 px-1.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								>
									<option value={null}>Choose a State</option>
									<option value="gujarat">Gujarat</option>
									<option value="maharashtra">Maharashtra</option>
									<option value="karnataka">Karnataka</option>
								</select>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{loading ? <Loader /> : "Sign up"}
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{" "}
						<Link
							to="/login"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
