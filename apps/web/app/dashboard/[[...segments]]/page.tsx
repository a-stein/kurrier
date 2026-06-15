import { getWorkspaceRedirectUrl, isSignedIn } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function LegacyDashboardRedirect({
	params,
}: {
	params: Promise<{ segments?: string[] }>;
}) {
	const user = await isSignedIn();

	if (!user) {
		redirect("/auth/login");
	}

	const { segments = [] } = await params;
	const workspaceRedirectUrl = await getWorkspaceRedirectUrl(user);

	if (workspaceRedirectUrl === "/auth/login") {
		redirect(workspaceRedirectUrl);
	}

	const [workspaceBase] = workspaceRedirectUrl.split("/dashboard");
	const dashboardPath = segments.length
		? segments.join("/")
		: "platform/overview";

	redirect(`${workspaceBase}/dashboard/${dashboardPath}`);
}
