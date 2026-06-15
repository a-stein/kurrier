import { getWorkspaceRedirectUrl, isSignedIn } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await isSignedIn();

	if (!user) {
		redirect("/auth/login");
	}

	redirect(await getWorkspaceRedirectUrl(user));
}
