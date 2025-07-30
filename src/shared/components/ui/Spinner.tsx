import { Loader } from "lucide-react";

const Spinner = () => {
	return (
		<div className="fixed left-0 top-0 w-screen h-screen bg-white opacity-60 flex justify-center items-center z-20">
			<Loader className="animate-spin text-gray-500" size={48} />
		</div>
	);
};

export default Spinner;
