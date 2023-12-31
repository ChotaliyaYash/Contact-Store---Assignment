import React, { useState } from "react";

const HomePage = () => {
	const contact = [
		{
			name: "Yash Chotaliya",
			email: "yash@gmail.com",
			phone: "+91-9723357085",
			id: 1,
		},
		{
			name: "Yash Chotaliya",
			email: "yash@gmail.com",
			phone: "+91-9723357085",
			id: 2,
		},
		{
			name: "Yash Chotaliya",
			email: "yash@gmail.com",
			phone: "+91-9723357085",
			id: 3,
		},
		{
			name: "Yash Chotaliya",
			email: "yash@gmail.com",
			phone: "+91-9723357085",
			id: 4,
		},
	];
	return (
		<main className="bg-gray-100">
			{/* grid list */}
			<div className="max-w-7xl mx-auto min-h-screen p-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{contact.map((item, index) => (
						<div
							key={index}
							className="rounded-lg bg-white shadow-md border-gray-100 border"
							onClick={() => {}}
						>
							<div className="p-6 flex flex-col gap-1 border-b-[1px]">
								<div className="text-lg text-gray-900 font-bold">
									{item.name}
								</div>
								<div className="text-sm text-gray-500">{item.email}</div>
								<div className="text-sm text-gray-400">{item.phone}</div>
							</div>
							<div className="grid grid-cols-2 text-center font-medium">
								<div className="p-4 text-sm border-r-[1px] cursor-pointer">
									Edit
								</div>
								<div className="p-4 text-sm cursor-pointer">Delete</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default HomePage;
