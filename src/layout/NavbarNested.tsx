import { Navbar, Text, createStyles, getStylesRef, rem } from "@mantine/core";
import {
    Icon2fa,
    IconHomeCheck,
    IconDatabaseImport,
    IconFingerprint,
    IconKey,
    IconReceipt2,
    IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    title: {
        textTransform: "uppercase",
        letterSpacing: rem(-0.25),
    },

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,

            [`& .${getStylesRef("icon")}`]: {
                color: theme.colorScheme === "dark" ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef("icon"),
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
            [`& .${getStylesRef("icon")}`]: {
                color: theme.fn.variant({
                    variant: "light",
                    color: theme.primaryColor,
                }).color,
            },
        },
    },
}));

const tabs = [
    //{ link: "/kopa-hem", label: "Köpa hem", icon: IconHomeCheck },
    { link: "/buy-home", label: "Köpa hem", icon: IconHomeCheck },
];

export function NavbarNested() {
    const { classes, cx } = useStyles();

    const links = tabs.map((item) => (
        <Link className={cx(classes.link)} href={item.link} key={item.label}>
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <Navbar
            height="100%"
            p="md"
            className={classes.navbar}
            withBorder={false}
        >
            <Navbar.Section>
                <Link href="/" className="no-underline">
                    <Text
                        weight={500}
                        size="sm"
                        className={classes.title}
                        color="dimmed"
                        mb="xs"
                    >
                        Mackes Mackapärer
                    </Text>
                </Link>
            </Navbar.Section>

            <Navbar.Section grow mt="xl">
                {links}
            </Navbar.Section>
        </Navbar>
    );
}
