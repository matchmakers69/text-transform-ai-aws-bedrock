import { type JSX, Suspense } from "react";

const SuspenseLoader = (LazyComponent: React.LazyExoticComponent<() => JSX.Element>) => {
	return () => (
		<Suspense fallback={<div>Loading...</div>}>
			<LazyComponent />
		</Suspense>
	);
};

export default SuspenseLoader;
