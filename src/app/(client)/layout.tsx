import ClientShell from "@/components/layouts/client-shell";
import { auth0 } from "@/lib/auth0";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  return (
    <ClientShell
      isAuthenticated={Boolean(session)}
      userName={session?.user.name ?? session?.user.email}
    >
      {children}
    </ClientShell>
  );
}
