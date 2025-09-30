import { Header } from "@/components/custom/Header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout(props: { children: React.ReactNode }) {
  // const session = await auth();

  // console.log(session);

  // if (session?.user) redirect("/");

  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
