import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../components/Loader";
import {
	deleteContactAsyncThunk,
	deleteContactSlice,
} from "../features/contact/contactSlice";

const HomePage = () => {
	const dispatch = useDispatch();

	const { loading, contacts, error } = useSelector((state) => state.contact);

	const handleDelete = async (id) => {
		// dispatch(deleteContactSlice(id));

		const res = await dispatch(deleteContactAsyncThunk(id));

		if (res.meta.requestStatus === "fulfilled") {
			navigate("/");
		}
	};

	if (loading) {
		return (
			<main className="bg-gray-100 min-h-screen p-10 flex justify-center items-center">
				<Loader />
			</main>
		);
	}

	if (error) {
		return (
			<main className="bg-gray-100 min-h-screen p-10">
				<div className="max-w-7xl mx-auto h-full">
					<div className="text-center text-2xl text-gray-900 font-bold">
						{error}
					</div>
				</div>
			</main>
		);
	}

	if (contacts.length === 0) {
		return (
			<main className="bg-gray-100 min-h-screen p-10">
				<div className="max-w-7xl mx-auto h-full">
					<div className="text-center text-2xl text-gray-900 font-bold">
						No Contacts Found
					</div>
				</div>
				{/* flotting button */}
				<Link
					to="/contact/add"
					className="fixed bottom-10 right-10 px-4 py-3 rounded-full bg-indigo-600 text-white font-bold text-sm"
				>
					+ Add Contact
				</Link>
			</main>
		);
	}

	return (
		<main className="bg-gray-100">
			{/* grid list */}
			<div className="max-w-7xl mx-auto min-h-screen p-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{contacts.map((item, index) => (
						<div
							key={index}
							className="rounded-lg bg-white shadow-md border-gray-100 border"
						>
							<Link
								to={`/contact/${item._id}/view`}
								className="p-6 flex flex-col gap-1 border-b-[1px]"
							>
								<div className="text-lg text-gray-900 font-bold">
									{item.name}
								</div>
								<div className="text-sm text-gray-500">{item.email}</div>
								<div className="text-sm text-gray-400">{item.phone}</div>
							</Link>
							<div className="grid grid-cols-2 text-center font-medium">
								<Link
									to={`/contact/${item._id}/edit`}
									className="p-4 text-sm border-r-[1px] cursor-pointer"
								>
									Edit
								</Link>
								<div
									className="p-4 text-sm cursor-pointer"
									onClick={() => handleDelete(item._id)}
								>
									Delete
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* flotting button */}
			<Link
				to="/contact/add"
				className="fixed bottom-10 right-10 px-4 py-3 rounded-full bg-indigo-600 text-white font-bold text-sm"
			>
				+ Add Contact
			</Link>
		</main>
	);
};

export default HomePage;
