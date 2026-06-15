import { getWorkspaceRedirectUrl, isSignedIn } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await isSignedIn();

	if (user) {
		redirect(await getWorkspaceRedirectUrl(user));
	}

	return <>{children}</>;
}
