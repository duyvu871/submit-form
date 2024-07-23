"use client";

import {NextUIProvider} from "@nextui-org/react";

interface NextUiProviderProps {
    children: React.ReactNode;
}

export default function NextUiProvider({children}: NextUiProviderProps) {
    return (
        <NextUIProvider className={"dark"}>
            {children}
        </NextUIProvider>
    );
}
