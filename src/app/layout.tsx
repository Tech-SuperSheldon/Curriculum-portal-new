import "./globals.css";
import { UserProvider } from "@/context/UserContext";

export const metadata = {
  title: "Secure Portal",
  description: "Encrypted Slide Viewer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}