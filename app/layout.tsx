import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Schoolday — Your School, Connected",
  description: "A mobile school management prototype. Timetable, attendance, homework, fees, and notices in one student space.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
