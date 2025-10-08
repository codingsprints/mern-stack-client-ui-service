import { redirect } from "next/navigation";
import CustomerForm from "./components/customerForm";
import { getSession } from "@/lib/session";

export default async function Checkout({
  searchParams,
}: {
  searchParams: { restaurantId: string };
}) {
  const session = await getSession();
  const sParams = new URLSearchParams(
    Object.entries(searchParams || {}).map(([key, value]) => {
      return [key, String(value)];
    })
  );
  const existingQueryString = sParams.toString();

  console.log(
    "sParams ---",
    sParams,
    "existingQueryString ---",
    existingQueryString
  );

  sParams.append("return-to", `/checkout?${existingQueryString}`);

  // /login?return-to=/checkout?existingQueryString

  if (!session?.user) {
    redirect(`/login?${sParams}`);
  }

  return <CustomerForm />;
}
