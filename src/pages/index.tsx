import { type NextPage } from "next";
import Head from "next/head";

import { api } from "@/utils/api";
import { Stack, Text, Title } from "@mantine/core";

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

            <div className="p-6">
                <Stack>
                    <Title>Mackes Mackapärer</Title>
                    <Text fz="lg" fw="bold">
                        Välkommen till Mackes Mackapärer. Detta är en enkelt
                        webbplats med de olika kalkylatorer som jag har behov
                        att använda i mitt liv vid olika tillfällen. Det kan
                        vara allt från hur mycket en lagfart kommer att kosta
                        till vad en månadskostnad för vårt hem skulle vara om vi
                        bytte bil.
                    </Text>
                    <Text>
                        Det är även ett ställe jag kan testa olika saker då jag
                        har webbkodning som ett av mina stora intressen. Hur
                        fungerar då denna webbplats? Till vänster har du en meny
                        där du kan välja lite olika saker. Denna kommer att
                        fyllas på med nya saker i framtiden i takt med hur mitt
                        behov ser ut.
                    </Text>
                    <Text>
                        Om det är något du själv saknar så fyllt i
                        kontaktformuläret med vilken kalkylator du själv skulle
                        önska fanns lätt till hands i ditt just nu. Är det något
                        du ofta gör som skulle förenklas av att bara fylla i
                        lite värden och vips, så har du ditt resultat? Tveka
                        inte att fyll i formuläret så kanske det dyker upp i
                        framtiden.
                    </Text>
                </Stack>
            </div>
        </>
    );
};

export default Home;
