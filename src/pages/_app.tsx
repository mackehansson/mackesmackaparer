import { api } from "@/utils/api";
import { Container, MantineProvider } from "@mantine/core";
import { type AppType } from "next/app";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                /** Put your mantine theme override here */
                colorScheme: "light",
            }}
        >
            <Container>
                <Component {...pageProps} />
            </Container>
        </MantineProvider>
    );
};

export default api.withTRPC(MyApp);
