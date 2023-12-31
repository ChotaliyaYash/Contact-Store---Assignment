import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logOutUserAsyncThunk } from "../features/user/userSlice";

export default function Header() {
	const dispatch = useDispatch();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const { currentUser } = useSelector((state) => state.user);

	const handleLogout = async (e) => {
		e.preventDefault();

		const res = await dispatch(logOutUserAsyncThunk());
		if (res.meta.requestStatus === "fulfilled") {
			navigate("/login");
		}
	};

	return (
		<header className="bg-white shadow-sm">
			{/* large screen */}
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<Link to="/" className="-m-1.5 p-1.5">
						<span className="text-2xl">Contact Store</span>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				{!currentUser ? (
					<div className="hidden lg:flex lg:flex-1 items-center lg:justify-end gap-5">
						<Link
							to="/login"
							className="text-sm font-semibold leading-6 text-gray-900 text-center"
						>
							Log in{" "}
							<span aria-hidden="true" className="">
								&rarr;
							</span>
						</Link>

						<Link
							to="/signup"
							className="text-sm font-semibold leading-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
						>
							Sign up <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				) : (
					<div className="hidden lg:flex lg:flex-1 items-center lg:justify-end gap-5">
						<button
							type="button"
							className="text-sm font-semibold leading-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				)}
			</nav>

			{/* mobile */}
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link to="/" className="-m-1.5 p-1.5">
							<span className="text-2xl">Contact Store</span>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>

					{!currentUser ? (
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="py-6 flex flex-col gap-5">
									<Link
										to="/login"
										className="-mx-3 block rounded-lg border border-gray-200 px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Log in <span aria-hidden="true">&rarr;</span>
									</Link>

									<Link
										to="/signup"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-indigo-600 text-white hover:bg-indigo-700"
									>
										Sign up <span aria-hidden="true">&rarr;</span>
									</Link>
								</div>
							</div>
						</div>
					) : (
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="py-6 flex flex-col gap-5">
									<button
										onClick={handleLogout}
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-indigo-600 text-white hover:bg-indigo-700"
									>
										Logout
									</button>
								</div>
							</div>
						</div>
					)}
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}
