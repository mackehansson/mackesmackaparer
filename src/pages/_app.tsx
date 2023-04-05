import { type AppType } from "next/app";
import { MantineProvider } from "@mantine/core";
import { api } from "@/utils/api";

import "@/styles/globals.css";
import MainLayout from "@/layout/MainLayout";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                /** Put your mantine theme override here */
                colorScheme: "dark",
            }}
        >
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </MantineProvider>
    );
};

export default api.withTRPC(MyApp);
