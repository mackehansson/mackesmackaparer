import { type NextPage } from "next";
import Head from "next/head";

import { NavbarNested } from "@/layout/NavbarNested";
import { api } from "@/utils/api";

const Home: NextPage = () => {
    const hello = api.example.hello.useQuery({ text: "from tRPC" });

    return (
        <>
            <Head>
                <title>Mackes mackapärer</title>
                <meta
                    name="description"
                    content="Some random calculators that I use"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex">
                <NavbarNested />
                <div className="p-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, officiis unde corrupti eligendi ex omnis impedit
                    neque, necessitatibus dolor facilis odio repellendus eius id
                    repellat aperiam. Explicabo accusantium quis magnam.
                </div>
            </main>
        </>
    );
};

export default Home;
