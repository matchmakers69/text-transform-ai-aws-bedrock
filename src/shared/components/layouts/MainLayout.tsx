import { Outlet } from "react-router-dom";
import { NavHeader } from "../ui";

const MainLayout = () => {
	return (
		<div className="flex min-h-[100vh] flex-col w-full">
			<NavHeader />
			<div className="app-content w-full grow-1 pt-20">
				<main className="container-xl lg:container m-auto">
					<Outlet />
				</main>
			</div>
			<footer className="mt-auto px-3 py-4">
				<p className="text-xs text-text-dark-grey">Copyright &copy; {new Date().toLocaleDateString()}</p>
			</footer>
		</div>
	);
};

export default MainLayout;
