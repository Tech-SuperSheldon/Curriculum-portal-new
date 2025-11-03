import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata = {
  title: "Super Sheldon",
  description: "Super Sheldon Secure Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
// commit