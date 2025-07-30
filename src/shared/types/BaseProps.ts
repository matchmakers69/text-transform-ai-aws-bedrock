import type { ReactNode } from "react";

type BaseProps<T = ReactNode> = {
	children?: T;
	["data-testid"]?: string;
};

export type { BaseProps };
