import { Input, Slider, Stack, Title, Divider, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import Head from "next/head";
import { useMemo } from "react";
import { NumericFormat } from "react-number-format";

type FormData = {
    bolan?: string;
    forsaljningspris?: string;
    inkopspris?: string;
    forsaljningskostnader?: string;
    forbattringsutgifter?: string;
    kapitaltillskott?: string;
    reparationsfondForsaljning?: string;
    reparationsfondKop?: string;
    aterforingUppskov?: string;
    nyaPriset?: string;
    kontantinsats?: string;
    driftkostnad?: string;
    pantbrev?: string;
    taxeringsvarde?: string;
    bolaneranta?: string;
    fastighetsskatt?: string;
};

function clearnInput(value?: string): number {
    if (!value) return 0;
    const removeSek = value.replace("SEK", "");
    const removePercent = removeSek.replace("%", "");
    const removeSpace = removePercent.replace(/\s/g, "");
    return !Number.isNaN(parseFloat(removeSpace)) ? parseInt(removeSpace) : 0;
}

// initialValues: {
//     bolan: "2 291 000 SEK",
//     forsaljningspris: "3 100 000 SEK",
//     inkopspris: "2 750 000 SEK",
//     forsaljningskostnader: "60 000 SEK",
//     forbattringsutgifter: "5 000 SEK",
//     kapitaltillskott: "0 SEK",
//     reparationsfondForsaljning: "0 SEK",
//     reparationsfondKop: "0 SEK",
//     aterforingUppskov: "0 SEK",
//     bolaneranta: "4 %",
//     driftkostnad: "5 000 SEK",
//     fastighetsskatt: "9 000 SEK",
//     nyaPriset: "2 700 000 SEK",
//     pantbrev: "563 000 SEK",
//     taxeringsvarde: "1 451 000 SEK",
// },
export default function BuyHomePage() {
    const form = useForm<FormData>({});

    const kvarPaLanet = useMemo(() => {
        const bolan = clearnInput(form.values.bolan);
        const forsaljningspris = clearnInput(form.values.forsaljningspris);
        return forsaljningspris - bolan;
    }, [form.values]);

    const vinstskatt = useMemo(() => {
        const forsaljningspris = clearnInput(form.values.forsaljningspris);
        const inkopspris = clearnInput(form.values.inkopspris);
        const forsaljningskostnader = clearnInput(
            form.values.forsaljningskostnader
        );
        const forbattringsutgifter = clearnInput(
            form.values.forbattringsutgifter
        );
        const kapitaltillskott = clearnInput(form.values.kapitaltillskott);
        const reparationsfondForsaljning = clearnInput(
            form.values.reparationsfondForsaljning
        );
        const reparationsfondKop = clearnInput(form.values.reparationsfondKop);
        const aterforingUppskov = clearnInput(form.values.aterforingUppskov);

        const initVinst = forsaljningspris - inkopspris;

        const vinst =
            initVinst -
            forsaljningskostnader -
            forbattringsutgifter -
            kapitaltillskott -
            reparationsfondForsaljning +
            reparationsfondKop +
            aterforingUppskov;

        return Math.round(Math.round(vinst) * (22 / 30) * 0.3);
    }, [form.values]);

    const kontantinsats = kvarPaLanet - vinstskatt;

    const minstaKontantinsats = useMemo(() => {
        const nyaPriset = clearnInput(form.values.nyaPriset);

        return nyaPriset * 0.15;
    }, [form.values]);

    const nyttBolan = useMemo(() => {
        const nyaPriset = clearnInput(form.values.nyaPriset);
        const kontantinsats = clearnInput(form.values.kontantinsats);

        return nyaPriset - kontantinsats;
    }, [form.values]);

    const rantaManad = useMemo(() => {
        const ranta = clearnInput(form.values.bolaneranta) / 100;
        return Math.round((nyttBolan * ranta) / 12);

        return 0;
    }, [nyttBolan, form.values]);

    const driftkostnadManad = useMemo(() => {
        const driftkostnad = clearnInput(form.values.driftkostnad);
        return Math.round(driftkostnad / 12);
    }, [form.values]);

    const fastighetsskattManad = useMemo(() => {
        const skatt = clearnInput(form.values.fastighetsskatt);
        return Math.round(skatt / 12);
    }, []);

    const skattereduktionManad = useMemo(() => {
        const ranta = clearnInput(form.values.bolaneranta) / 100;
        const arsRanta = Math.round(nyttBolan * ranta);
        return Math.round(arsRanta * 0.03);
    }, [form.values, nyttBolan]);

    const summaManad = useMemo(() => {
        return 0;
    }, []);

    const amorteringManad = useMemo(() => {
        return 0;
    }, []);

    const totalaManadsPriset = useMemo(() => {
        return 0;
    }, []);

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
            <div className="mb-6 grid grid-cols-12 gap-6">
                <Stack className="col-span-6">
                    <Title>Köpa ett nytt hem</Title>

                    <div className="bg-slate-100 p-4">
                        <Stack>
                            <Title order={2}>Sälja BRF</Title>

                            <Input.Wrapper label="Hur mycket bolån har du?">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("bolan")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>

                            <Input.Wrapper label="Försäljningspris?">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("forsaljningspris")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                        </Stack>
                    </div>

                    <div className="bg-slate-100 p-4">
                        <Stack>
                            <Title order={2}>Beräkna vinstskatt</Title>

                            <Input.Wrapper label="Inköpspris">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("inkopspris")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Försäljningskostnader">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps(
                                        "forsaljningskostnader"
                                    )}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Förbättringsutgifter">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps(
                                        "forbattringsutgifter"
                                    )}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Kapitaltillskott">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("kapitaltillskott")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Andel inre reparationsfond vid försäljning">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps(
                                        "reparationsfondForsaljning"
                                    )}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Andel inre reparationsfond vid köp">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps(
                                        "reparationsfondKop"
                                    )}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Återföring av uppskovsbelopp">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("aterforingUppskov")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                        </Stack>
                    </div>
                </Stack>
                <div className="col-span-6 self-end p-6">
                    <div className="mb-4">
                        <Title order={2}>Resultat</Title>
                        <Text>
                            OBS! Detta är bara ungefärliga siffror. Kalkylatorn
                            tar inget ansvar att dessa är korrekta för dig. Du
                            behöver räkna på det själv för att få exakta siffror
                            för dig.
                        </Text>
                    </div>
                    <Divider className="mb-6" />
                    <div className="mb-4">
                        <Title order={4}>Vinst</Title>
                        <Title order={4} color="green">
                            {`${kvarPaLanet} SEK`.replace(
                                /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                " "
                            )}
                        </Title>
                    </div>
                    <div className="mb-4">
                        <Title order={4}>Vinstskatt</Title>
                        <Title order={4} color="red">
                            {`${vinstskatt} SEK`.replace(
                                /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                " "
                            )}
                        </Title>
                    </div>
                    <div>
                        <Title order={4}>Kvar till kontantinsats</Title>
                        <Title order={4} color="green">
                            {`${kontantinsats} SEK`.replace(
                                /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                " "
                            )}
                        </Title>
                    </div>
                </div>
            </div>

            <Divider className="mb-6" />

            <div className="mb-6 grid grid-cols-12 gap-6">
                <Stack className="col-span-6">
                    <div className="bg-slate-100 p-4">
                        <Stack>
                            <Title order={2}>Nya bostaden</Title>

                            <Input.Wrapper label="Priset på nya bostaden">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("nyaPriset")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Kontantinsats">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("kontantinsats")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Driftkostnad (per år)">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("driftkostnad")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Pantbrev">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("pantbrev")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Taxeringsvärde">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("taxeringsvarde")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Fastighetsskatt per år">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("fastighetsskatt")}
                                    suffix=" SEK"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper label="Bolåneränta">
                                <Input
                                    component={NumericFormat}
                                    type="text"
                                    {...form.getInputProps("bolaneranta")}
                                    suffix=" %"
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=" "
                                    allowNegative={false}
                                />
                            </Input.Wrapper>
                        </Stack>
                    </div>
                </Stack>
                <div className="col-span-6 self-end">
                    <div className="mb-4">
                        <Title order={4}>Minsta kontantinsats</Title>
                        <Title order={4} color="green">
                            {`${minstaKontantinsats} SEK`.replace(
                                /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                " "
                            )}
                        </Title>
                    </div>
                    <div className="mb-4">
                        <Title order={4}>Bolån</Title>
                        <Title order={4} color="red">
                            {`${nyttBolan} SEK`.replace(
                                /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                " "
                            )}
                        </Title>
                    </div>

                    <Stack className="mb-4" spacing={8}>
                        <Title order={3}>Boende kostand per månad</Title>
                        <Divider />
                        <div className="flex items-center justify-between">
                            <Title order={6}>Ränta</Title>
                            <Title order={6}>
                                {`${rantaManad} SEK`.replace(
                                    /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                    " "
                                )}
                            </Title>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                            <Title order={6}>Driftkostnad</Title>
                            <Title order={6}>
                                {`${driftkostnadManad} SEK`.replace(
                                    /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                    " "
                                )}
                            </Title>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                            <Title order={6}>Fastighetsskatt/-avgift</Title>
                            <Title order={6}>
                                {`${fastighetsskattManad} SEK`.replace(
                                    /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                    " "
                                )}
                            </Title>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                            <Title order={6}>Skattereduktion</Title>
                            <Title order={6}>
                                {`${skattereduktionManad} SEK`.replace(
                                    /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                    " "
                                )}
                            </Title>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                            <Title order={6}>Summa</Title>
                            <Title order={6}>
                                {`${summaManad} SEK`.replace(
                                    /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                    " "
                                )}
                            </Title>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                            <Title order={6}>Amortering</Title>
                            <Title order={6}>
                                {`${amorteringManad} SEK`.replace(
                                    /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                    " "
                                )}
                            </Title>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                            <Title order={4}>
                                Månadskostnad (inkl amortering)
                            </Title>
                            <Title order={4} color="green">
                                {`${totalaManadsPriset} SEK`.replace(
                                    /(?<!\.\d*)(?<=\d)(?=(\d{3})+(?!\d))/g,
                                    " "
                                )}
                            </Title>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    );
}
