import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // import font
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "my-todo-list",
  description: "just do it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // add font to className, also add antialiased and dark mode
    <html
      lang="en"
      className={`${GeistSans.className} antialiased dark:bg-gray-950`}
    >
      <body>{children}</body>
    </html>
  );
}
