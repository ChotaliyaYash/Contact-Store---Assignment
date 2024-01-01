import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../components/Loader";
import {
	updateContactAsyncThunk,
	updateContactSlice,
} from "../features/contact/contactSlice";

const ViewAndEditPage = () => {
	const { id, type } = useParams();
	const [data, setData] = useState();
	const [edit, setEdit] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { contacts, loading, error } = useSelector((state) => state.contact);

	useEffect(() => {
		if (contacts) {
			const contact = contacts?.find((contact) => contact._id == id);
			setData(contact);
		}
	}, [contacts, id]);

	useEffect(() => {
		if (type === "edit") setEdit(true);
	}, []);

	if (loading || !data) {
		return (
			<main className="bg-gray-100 min-h-screen p-10 flex justify-center items-center">
				<Loader />
			</main>
		);
	}

	if (error) {
		return (
			<main className="bg-gray-100 min-h-screen p-10 flex justify-center items-center">
				<h1 className="text-2xl text-red-500 font-semibold">{error}</h1>
			</main>
		);
	}

	const handleUpdate = async () => {
		console.log(data);

		if (`${data.phone}`.length !== 10) {
			alert("Contact number must be 10 digits long.");
			return;
		}

		const res = await dispatch(updateContactAsyncThunk(data));

		if (res.meta.requestStatus === "fulfilled") {
			dispatch(updateContactSlice(data));
			alert("Contact Updated Successfully");
			navigate("/");
		}
	};

	return (
		<>
			<div className="bg-gray-100 min-h-screen p-4">
				<div className="sm:max-w-lg sm:w-full bg-white mx-auto rounded-lg">
					<form className="p-4 space-y-6">
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
									value={data.name}
									disabled={!edit}
									onChange={(e) => setData({ ...data, name: e.target.value })}
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
									value={data.email}
									disabled={!edit}
									onChange={(e) => setData({ ...data, email: e.target.value })}
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
									value={data.phone}
									disabled={!edit}
									onChange={(e) => setData({ ...data, phone: e.target.value })}
									className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="button"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								onClick={edit ? handleUpdate : () => setEdit(!edit)}
							>
								{edit ? "Save" : "Edit"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ViewAndEditPage;
