import { Container } from "@mantine/core";
import { NavbarNested } from "./NavbarNested";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Container size="xl">
            <main className="grid grid-cols-12">
                <div className="col-span-2">
                    <NavbarNested />
                </div>
                <div className="col-span-10">{children}</div>
            </main>
        </Container>
    );
}
