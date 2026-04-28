import { redirect } from "next/navigation";
import AdminLayout from "@/layout/admin-layout";
import { auth0 } from "@/lib/auth0";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login?returnTo=/admin");
  }

  return (
    <AdminLayout
      user={{
        name: session.user.name ?? session.user.nickname ?? "User",
        email: session.user.email,
        picture: session.user.picture,
      }}
    >
      {children}
    </AdminLayout>
  );
}
