import { Header } from "@/components/custom/Header";
import { Roboto } from "next/font/google";

// export const metadata: Metadata = {
//   title: "911",
//   description: "911"
// };
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
