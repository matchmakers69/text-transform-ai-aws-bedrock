import type { BaseProps } from "@/shared";
import { ErrorBoundary } from "react-error-boundary";

function AppProvider({ children }: BaseProps) {
	return <ErrorBoundary fallback={<div>Error from error boundry</div>}>{children}</ErrorBoundary>;
}

export default AppProvider;
