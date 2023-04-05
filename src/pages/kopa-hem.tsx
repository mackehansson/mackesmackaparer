/* eslint-disable react/no-unescaped-entities */
import {
    Title,
    Stack,
    Text,
    Timeline,
    TextInput,
    NumberInput,
    Group,
    Button,
    ActionIcon,
    Table,
    Paper,
    Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    IconCash,
    IconCirclePlus,
    IconHomeDown,
    IconTrash,
} from "@tabler/icons-react";
import Head from "next/head";
import { useMemo } from "react";

type FormData = {
    profitTax: number;
    currentHouseSaleAmount?: number;
    currentLoans: { name: string; amount: number }[];
    housePrice: number;
    mortgageDeed: number;
    newCashDeposit: number;
};

export default function KopaHem() {
    const form = useForm<FormData>({
        initialValues: {
            profitTax: 0,
            currentLoans: [
                {
                    name: "",
                    amount: 0,
                },
            ],
            housePrice: 0,
            mortgageDeed: 0,
            newCashDeposit: 0,
        },
    });

    const loans = form.values.currentLoans.map((loan, index) => (
        <tr key={index}>
            <td>
                <TextInput
                    placeholder="Ange namnet på ditt lån"
                    {...form.getInputProps(`currentLoans.${index}.name`)}
                    styles={(theme) => ({
                        input: {
                            backgroundColor: theme.white,
                            color: theme.black,
                        },
                    })}
                />
            </td>
            <td>
                <NumberInput
                    placeholder="Hur mycket är lånet på?"
                    {...form.getInputProps(`currentLoans.${index}.amount`, {
                        type: "input",
                    })}
                    styles={(theme) => ({
                        input: {
                            backgroundColor: theme.white,
                            color: theme.black,
                        },
                    })}
                    hideControls
                    formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                            ? `${value} SEK`.replace(
                                  /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                  " "
                              )
                            : ""
                    }
                />
            </td>
            <td>
                <ActionIcon color="red">
                    <IconTrash />
                </ActionIcon>
            </td>
        </tr>
    ));

    const totalLoans = form.values.currentLoans.reduce<number>((acc, curr) => {
        return (acc = acc + curr.amount);
    }, 0);

    const cashDeposit = useMemo(() => {
        const allLoans = form.values.currentLoans.reduce<number>(
            (acc, curr) => {
                return (acc = acc + curr.amount);
            },
            0
        );

        const salesPrice = form.values.currentHouseSaleAmount ?? 0;
        const profitTax = form.values.profitTax;

        return salesPrice - allLoans - profitTax;
    }, [form.values]);

    return (
        <>
            <Head>
                <title>Mackes mackapärer - Köpa hem</title>
                <meta
                    name="description"
                    content="Här finns olika kalkylatorer som räkna ut pantbrev, lagfart, månadskostnad osv."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="p-6">
                <Stack>
                    <Title>Köpa ett nytt hem</Title>
                    <Text>
                        Går du också i planerna att köpa dig ett nytt hem? Det
                        gör jag just nu och jag blir inte klok på att få ihop en
                        bra översyn på vad det egentligen kommer att kosta mig
                        att köpa. Det är ju inte bara att betala vad säljaren
                        begär, det är ju andra avgifter som lagfart osv som
                        behöver räknas med.
                    </Text>
                    <Text mb={32}>
                        Upplägget på denna sida börjar med att fylla i om du
                        äger något idag.
                    </Text>

                    <Timeline bulletSize={32} lineWidth={4}>
                        <Timeline.Item
                            bullet={<IconCash size={16} />}
                            title="Dina förutsättningar"
                            className="pb-8"
                        >
                            <Paper withBorder p="md" my={16}>
                                <Text>
                                    Vi börjar med att fylla i hur mycket du har
                                    lån på i dagsläget för ditt boende. Du kan
                                    lägga till flera rader om du vill specifiera
                                    upp fler lån. Fyll i de lån du önskar lösa
                                    ut.
                                </Text>
                            </Paper>

                            <div className="mb-4 flex gap-10 bg-gray-800 p-4">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Namn på lån</th>
                                            <th>Summa</th>
                                            <th style={{ width: 40 }}>
                                                <ActionIcon
                                                    color="green"
                                                    onClick={() => {
                                                        form.insertListItem(
                                                            "currentLoans",
                                                            {
                                                                name: "",
                                                                amount: 0,
                                                            }
                                                        );
                                                    }}
                                                >
                                                    <IconCirclePlus />
                                                </ActionIcon>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{loans}</tbody>
                                </Table>
                            </div>

                            <div className="flex items-center justify-between bg-cyan-900 p-4">
                                <Title order={3} className="text-white">
                                    Total summa lån
                                </Title>
                                <Title order={3} className="text-rose-500">
                                    {`${totalLoans}`.replace(
                                        /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                        " "
                                    )}{" "}
                                    SEK
                                </Title>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item
                            bullet={<IconHomeDown size={16} />}
                            title="Nuvarande bostad"
                            className="pb-8"
                        >
                            <Paper withBorder p="md" my={16}>
                                <Text>
                                    En bra start kan vara att veta hur mycket du
                                    kommer ha att lägga som en kontantinsats på
                                    ditt nya boende.
                                </Text>
                            </Paper>

                            <div className="mb-4 bg-gray-800 p-4">
                                <Title order={4} color="cyan">
                                    Vad är priset på din nuvarande bostad?
                                </Title>

                                <details className="mb-2">
                                    <summary>
                                        Hur mycket kostar ditt hus?
                                    </summary>
                                    <Paper withBorder p="md" my={16}>
                                        <Text className="mb-2">
                                            Hur mycket siktar du på att sälja
                                            ditt nuvarande boende för?
                                        </Text>
                                    </Paper>
                                </details>

                                <NumberInput
                                    placeholder="Ange försäljningspris på nuvarande boende"
                                    label="Försäljningspris"
                                    hideControls
                                    styles={(theme) => ({
                                        input: {
                                            backgroundColor: theme.white,
                                            color: theme.black,
                                        },
                                    })}
                                    {...form.getInputProps(
                                        "currentHouseSaleAmount"
                                    )}
                                    formatter={(value) =>
                                        !Number.isNaN(parseFloat(value))
                                            ? `${value} SEK`.replace(
                                                  /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                                  " "
                                              )
                                            : ""
                                    }
                                />
                            </div>

                            <div className="mb-4 bg-gray-800 p-4">
                                <Title order={4} color="cyan">
                                    Vinstskatt
                                </Title>

                                <details className="mb-2">
                                    <summary>Vad är vinstskatt?</summary>
                                    <Paper withBorder p="md" my={16}>
                                        <Text className="mb-2">
                                            För att veta bättre vilken summa du
                                            kan använda som kontantinsats så kan
                                            vi räkna bort vinstskatten (om du
                                            säljer med vinst).
                                        </Text>
                                    </Paper>
                                </details>
                                <NumberInput
                                    placeholder="Ange din vinstskatt"
                                    label="Din vinstskatt"
                                    className="mb-2"
                                    hideControls
                                    styles={(theme) => ({
                                        input: {
                                            backgroundColor: theme.white,
                                            color: theme.black,
                                        },
                                    })}
                                    {...form.getInputProps("profitTax")}
                                    formatter={(value) =>
                                        !Number.isNaN(parseFloat(value))
                                            ? `${value} SEK`.replace(
                                                  /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                                  " "
                                              )
                                            : ""
                                    }
                                />
                                <details className="mb-2">
                                    <summary>Vad säger skatteverket?</summary>
                                    <Paper withBorder p="md" my={16}>
                                        <Text className="mb-2">
                                            Skatteverket säger: "Du som säljer
                                            en bostad med vinst måste betala
                                            vinstskatt på vinsten." Det finns en
                                            tjänst på Skatteverkets webbplats
                                            där du kan göra en enklare beräkning
                                            på skatten.{" "}
                                            <a
                                                href="https://www.skatteverket.se/privat/fastigheterochbostad/forsaljningavbostad/raknautvinstforlustochskatt/berakningshjalpfordinbostadsforsaljning.4.4a4d586616058d860bc5131.html"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Den hittar du här
                                            </a>
                                            . Men om redan vet dessa siffor så
                                            kan du fylla i dessa ovan.
                                        </Text>
                                    </Paper>
                                </details>
                            </div>

                            <div className="flex items-center justify-between bg-cyan-900 p-4">
                                <Title order={3} className="text-white">
                                    Din kontantinsats
                                </Title>
                                <Title order={3} color="lime">
                                    {`${cashDeposit} SEK`.replace(
                                        /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                        " "
                                    )}{" "}
                                </Title>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item
                            bullet={<IconHomeDown size={16} />}
                            title="Ditt nästa boende"
                            className="pb-8"
                        >
                            <Paper withBorder p="md" my={16}>
                                <Text>
                                    Nu är det dags att fylla i uppgifter om det
                                    hus du önskar köpa. Du kommer behöva veta
                                    följande siffor: Bostadens pris,
                                    driftkostnad, taxeringsvärde och pantbrev.
                                </Text>
                            </Paper>

                            <div className="mb-4 bg-gray-800 p-4">
                                <Title order={4} color="cyan">
                                    Bostadens pris
                                </Title>

                                <details className="mb-2">
                                    <summary>Vad kostar nya boendet?</summary>
                                    <Paper withBorder p="md" my={16}>
                                        <Text className="mb-2">
                                            Hur mycket är köpskillingen för det
                                            nya boendet? Vad är det du måste
                                            betala allt som allt?
                                            Kontantinsatsen är 15% av den totala
                                            köpskillingen. Du kan i denna
                                            kalkylator öka kontantinstsen om du
                                            önskar.
                                        </Text>
                                    </Paper>
                                </details>

                                <NumberInput
                                    placeholder="Ange vad huset kostar"
                                    label="Bostadens pris"
                                    hideControls
                                    styles={(theme) => ({
                                        input: {
                                            backgroundColor: theme.white,
                                            color: theme.black,
                                        },
                                    })}
                                    {...form.getInputProps("housePrice")}
                                    formatter={(value) =>
                                        !Number.isNaN(parseFloat(value))
                                            ? `${value} SEK`.replace(
                                                  /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                                  " "
                                              )
                                            : ""
                                    }
                                />
                            </div>

                            <div className="mb-4 bg-gray-800 p-4">
                                <Title order={4} color="cyan">
                                    Pantbrev
                                </Title>
                                <details className="mb-2">
                                    <summary>Vad är ett pantbrev?</summary>
                                    <Paper withBorder p="md" my={16}>
                                        <Text className="mb-2">
                                            När du ansöker om en inteckning i
                                            din fastighet ger vi dig ett
                                            pantbrev som bevis på att
                                            inteckningen har beviljats.
                                            Pantbrevet kan antingen vara
                                            skriftligt eller digitalt. Ett
                                            digitalt pantbrev kallas för
                                            datapantbrev.
                                        </Text>
                                    </Paper>
                                </details>

                                <NumberInput
                                    placeholder="Ange hur mycket pantbreven är"
                                    label="Pantbrev uttage"
                                    hideControls
                                    styles={(theme) => ({
                                        input: {
                                            backgroundColor: theme.white,
                                            color: theme.black,
                                        },
                                    })}
                                    {...form.getInputProps("mortgageDeed")}
                                    formatter={(value) =>
                                        !Number.isNaN(parseFloat(value))
                                            ? `${value} SEK`.replace(
                                                  /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                                  " "
                                              )
                                            : ""
                                    }
                                />
                            </div>

                            <div className="mb-4 bg-gray-800 p-4">
                                <Title order={4} color="cyan">
                                    Lagfart
                                </Title>
                                <details className="mb-2">
                                    <summary>Vad är lagfart?</summary>
                                    <Paper withBorder p="md" my={16}>
                                        <Text className="mb-2">
                                            När du har köpt en fastighet skall
                                            du ansöka om lagfart på fastigheten
                                            hos Lantmäteriet. Lagfart är ett
                                            bevis på att det är du som äger
                                            fastigheten. Kostnaden för lagfarten
                                            kallas för stämpelskatt.
                                            Lagfartskostnaden är på 1,5 procent
                                            av det du betalat för huset
                                            (köpeskillingen) eller
                                            taxeringsvärdet, beroende på vad som
                                            är högst.
                                        </Text>
                                    </Paper>
                                </details>

                                <NumberInput
                                    placeholder="Vad är fastighetens taxeringsvärde?"
                                    label="Taxeringsvärde"
                                    hideControls
                                    styles={(theme) => ({
                                        input: {
                                            backgroundColor: theme.white,
                                            color: theme.black,
                                        },
                                    })}
                                    {...form.getInputProps("mortgageDeed")}
                                    formatter={(value) =>
                                        !Number.isNaN(parseFloat(value))
                                            ? `${value} SEK`.replace(
                                                  /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                                  " "
                                              )
                                            : ""
                                    }
                                />
                            </div>

                            <div className="mb-4 flex items-center justify-between">
                                <Title order={4}>Kostnad pantbrev</Title>
                                <Title order={4} color="green">
                                    {`${11111} SEK`.replace(
                                        /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                        " "
                                    )}{" "}
                                </Title>
                            </div>
                            <div className="mb-4 flex items-center justify-between">
                                <Title order={4}>Kostnad lagfart</Title>
                                <Title order={4} color="green">
                                    {`${11111} SEK`.replace(
                                        /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                        " "
                                    )}{" "}
                                </Title>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item
                            bullet={<IconHomeDown size={16} />}
                            title="Sammanfattning"
                            className="pb-8"
                        >
                            <Paper withBorder p="md" my={16}>
                                <Text>
                                    När du fyllt i alla uppgifter ovan så har du
                                    en koll på vad det kommer kosta dig per
                                    månad, vad det kommer kosta vid inträde och
                                    vem som ansvarar över vad.
                                </Text>
                            </Paper>
                        </Timeline.Item>
                    </Timeline>
                </Stack>
            </div>
        </>
    );
}
