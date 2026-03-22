import { redirect } from "next/navigation";

export default function Home() {
  // Temporary redirect to login since this is an authenticated app.
  // In a real app we'd check session here.
  redirect("/login");
}
