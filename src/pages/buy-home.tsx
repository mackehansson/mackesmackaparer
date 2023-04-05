import {
    MantineTheme,
    NumberInput,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Head from "next/head";
import { useMemo, useState } from "react";

type FormData = {
    profitTax: number;
    currentHouseSaleAmount: number;
    currentLoans: number;
    housePrice: number;
    mortgageDeed: number;
    newCashDeposit: number;
    vinstskatt: {
        forsaljningspris: number;
        inkopspris: number;
        forsaljningskostnader: number;
        forbattringsutgifter: number;
        kapitaltillskott: number;
        reparationsfondForsaljning: number;
        reparationsfondKop: number;
        aterforingUppskov: number;
    };
};

export default function BuyHomePage() {
    const form = useForm<FormData>({
        initialValues: {
            currentLoans: 0,
            housePrice: 0,
            mortgageDeed: 0,
            newCashDeposit: 0,
            profitTax: 0,
            currentHouseSaleAmount: 0,
            vinstskatt: {
                forsaljningspris: 0,
                aterforingUppskov: 0,
                forbattringsutgifter: 0,
                forsaljningskostnader: 0,
                inkopspris: 0,
                kapitaltillskott: 0,
                reparationsfondForsaljning: 0,
                reparationsfondKop: 0,
            },
        },
    });

    const yourCashDeposit =
        form.values.currentHouseSaleAmount - form.values.currentLoans;

    const beraknaVinstskatt = useMemo(() => {
        const forsaljningspris = form.values.vinstskatt.forsaljningspris;
        const aterforingUppskov = form.values.vinstskatt.aterforingUppskov;
        const forbattringsutgifter =
            form.values.vinstskatt.forbattringsutgifter;
        const forsaljningskostnader =
            form.values.vinstskatt.forsaljningskostnader;
        const inkopspris = form.values.vinstskatt.inkopspris;
        const kapitaltillskott = form.values.vinstskatt.kapitaltillskott;
        const reparationsfondForsaljning =
            form.values.vinstskatt.reparationsfondForsaljning;
        const reparationsfondKop = form.values.vinstskatt.reparationsfondKop;
    }, [form.values.vinstskatt]);

    const [inputValue, setInputValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(addCommas(removeNonNumeric(event.target.value)));

    return (
        <>
            <Head>
                <title>Mackes mackapärer - Köpa nytt boende</title>
                <meta
                    name="description"
                    content="Här finns olika kalkylatorer som räkna ut pantbrev, lagfart, månadskostnad osv."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid grid-cols-12 gap-6">
                <Stack className="col-span-6 p-6">
                    <Title>Köpa ett nytt hem</Title>
                    <Title order={2}>Sälja BRF</Title>

                    <input
                        type="text"
                        value={inputValue}
                        onInput={handleChange}
                    />

                    <NumberInput
                        label="Hur mycket bolån har du?"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps("currentLoans")}
                        formatter={numberFormatter}
                        onInput={(event) => {
                            const value = event.currentTarget.value;
                            form.setFieldValue(
                                "currentLoans",
                                parseFloat(addCommas(removeNonNumeric(value)))
                            );
                        }}
                    />

                    <NumberInput
                        label="Vad är priset?"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps("currentHouseSaleAmount")}
                        formatter={numberFormatter}
                    />
                    <Title order={2}>Beräkna vinstskatt</Title>
                    <NumberInput
                        label="Försäljningspris"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps("vinstskatt.forsaljningspris")}
                        formatter={numberFormatter}
                    />
                    <NumberInput
                        label="Inköpspris"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps("vinstskatt.inkopspris")}
                        formatter={numberFormatter}
                    />
                    <NumberInput
                        label="Försäljningskostnader"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps(
                            "vinstskatt.forsaljningskostnader"
                        )}
                        formatter={numberFormatter}
                    />
                    <NumberInput
                        label="Förbättringsutgifter"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps(
                            "vinstskatt.forbattringsutgifter"
                        )}
                        formatter={numberFormatter}
                    />
                    <NumberInput
                        label="Kapitaltillskott"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps("vinstskatt.kapitaltillskott")}
                        formatter={numberFormatter}
                    />
                    <NumberInput
                        label="Andel inre reparationsfond vid försäljning"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps(
                            "vinstskatt.reparationsfondForsaljning"
                        )}
                        formatter={numberFormatter}
                    />
                    <NumberInput
                        label="Andel inre reparationsfond vid köp"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps("vinstskatt.reparationsfondKop")}
                        formatter={numberFormatter}
                    />
                    <NumberInput
                        label="Återföring av uppskovsbelopp"
                        hideControls
                        styles={inputStyles}
                        {...form.getInputProps("vinstskatt.aterforingUppskov")}
                        formatter={numberFormatter}
                    />
                </Stack>
                <div className="col-span-6 p-6">
                    <div className="flex items-center justify-between bg-cyan-900 p-4">
                        <Title order={5} className="text-white">
                            Din kontantinsats
                        </Title>
                        <Title order={5} color="lime">
                            {`${yourCashDeposit} SEK`.replace(
                                /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                " "
                            )}{" "}
                        </Title>
                    </div>
                    <div className="flex items-center justify-between bg-cyan-900 p-4">
                        <Title order={5} className="text-white">
                            Vinstskatt
                        </Title>
                        <Title order={5} color="red">
                            {`${yourCashDeposit} SEK`.replace(
                                /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                " "
                            )}{" "}
                        </Title>
                    </div>
                </div>
            </div>
        </>
    );
}

const addCommas = (num: string) => num.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const removeNonNumeric = (num: string) => num.replace(/[^0-9]/g, "");

function inputStyles(theme: MantineTheme) {
    return {
        input: {
            backgroundColor: theme.white,
            color: theme.black,
        },
    };
}

function numberFormatter(value: string) {
    return addCommas(removeNonNumeric(value));
    // return !Number.isNaN(parseFloat(value))
    //     ? `${value} SEK`.replace(/(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g, " ")
    //     : "";
}
