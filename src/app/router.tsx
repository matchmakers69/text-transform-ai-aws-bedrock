import { ROUTES } from "@/shared";
import { MainLayout } from "@/shared/components/layouts";
import { SuspenseLoader } from "@/shared/components/ui";
import { lazy } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

const TextTransformationPage = SuspenseLoader(lazy(() => import("@/pages/textTransform/TextTransformPage")));

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Navigate to={ROUTES.textTransformation} replace />} />
					<Route path={ROUTES.textTransformation} element={<TextTransformationPage />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default AppRoutes;
