import { Header } from "@/components/custom/Header";

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
