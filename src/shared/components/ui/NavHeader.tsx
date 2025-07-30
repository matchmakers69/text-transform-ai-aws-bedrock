import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/shared/config/constants";

const navigation = [
	{
		id: 1,
		name: "Home",
		url: ROUTES.home,
	},
	{
		id: 2,
		name: "Text transformation",
		url: ROUTES.textTransformation,
	},
];

const NavHeader = () => {
	const [nav, setNav] = useState(false);
	return (
		<header>
			<nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow">
				<div className="flex flex-wrap justify-between items-center mx-auto">
					<NavLink className="flex justify-center mr-4 flex-col" to={ROUTES.home}>
						<span className="self-center text-md uppercase font-semibold whitespace-nowrap dark:text-white">
							AI in React
						</span>
					</NavLink>
					<div
						className={`flex-col md:flex md:flex-row items-center w-full md:w-auto md:order-2 transition-all duration-300 ${
							nav
								? "absolute top-14 left-0 w-full bg-white shadow-md p-4 md:relative md:top-0 md:w-auto md:bg-transparent md:shadow-none"
								: "hidden md:flex gap-6"
						}`}
					>
						<ul className="flex flex-col md:flex-row md:gap-8 gap-0">
							{navigation.map((link) => (
								<li key={link.id}>
									<NavLink
										className={({ isActive }) =>
											`bg-[#191919]/10 block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 rounded-md md:inline-block md:px-4 md:py-2 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive ? "bg-white text-black" : ""}`
										}
										to={link.url}
										key={link.id}
									>
										{link.name}
									</NavLink>
								</li>
							))}

							{/* Add more links here */}
						</ul>
					</div>

					{/* Hamburger Icon */}
					<div className="md:hidden flex items-center lg:order-1">
						<button
							type="button"
							className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
							aria-controls="mobile-menu"
							aria-expanded={nav}
							onClick={() => setNav(!nav)}
						>
							<span className="sr-only">Open main menu</span>
							{nav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default NavHeader;
