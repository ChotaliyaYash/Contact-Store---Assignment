import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";

const ViewAndEditPage = () => {
	const { id, type } = useParams();

	const [edit, setEdit] = useState(false);

	const [data, setData] = useState();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	useEffect(() => {}, [data]);

	useEffect(() => {
		if (type === "edit") setEdit(true);
	}, []);

	if (loading) {
		return (
			<main className="bg-gray-100 min-h-screen p-10 flex justify-center items-center">
				<Loader />
			</main>
		);
	}

	return (
		<div className="bg-gray-100 min-h-screen p-4">
			<div className="sm:max-w-lg sm:w-full bg-white mx-auto rounded-lg">
				<form action="" className="p-4 space-y-6">
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
								value={data?.name}
								disabled={!edit}
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
								value={data?.email}
								disabled={!edit}
								className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="contact"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Contact Number
						</label>
						<div className="mt-2">
							<input
								id="contact"
								name="contact"
								type="number"
								required
								value={data?.contact}
								disabled={!edit}
								className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="button"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={() => setEdit(!edit)}
						>
							{edit ? "Save" : "Edit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ViewAndEditPage;
