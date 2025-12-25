import Navbar from "@/app/(app)/_components/Navbar";
import LiveChecker from "@/app/(app)/live/_components/LiveChecker/LiveChecker";
import CenteredSpinner from "@/components/ui/centered-spinner";
import ToastWithRedirect from "@/components/ui/toast-with-redirect";
import { useRiotAuthQuery } from "@/lib/api/queries/api/auth";

export default function LiveMatchPage() {
  // This boolean input is a custom implementation to handle unauthenticated cases.
  // Check implementation for details.
  const { status, data } = useRiotAuthQuery();

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status == "error") {
    return (
      <ToastWithRedirect
        to={"/dashboard"}
        message={"Hmm, something went wrong. Please try to re-authenticate."}
      />
    );
  }

  const invalid =
    !data.success ||
    !data.payload.user ||
    !data.payload.session ||
    !data.payload.user.riotAuth ||
    !data.payload.user.riotEntitlement;

  if (invalid) {
    return (
      <ToastWithRedirect
        to={"/dashboard"}
        message={"Please authenticate first."}
      />
    );
  }

  // make ts happy
  // TODO: definitely a better way to do this.
  if (
    !data.payload.user ||
    !data.payload.user.riotEntitlement ||
    !data.payload.user.riotAuth
  ) {
    return (
      <ToastWithRedirect
        to={"/dashboard"}
        message={"Please authenticate first."}
      />
    );
  }

  return (
    <>
      <Navbar />
      <LiveChecker
        riotAuth={data.payload.user.riotAuth}
        riotEntitlement={data.payload.user.riotEntitlement}
        puuid={data.payload.user.puuid}
      />
    </>
  );
}
