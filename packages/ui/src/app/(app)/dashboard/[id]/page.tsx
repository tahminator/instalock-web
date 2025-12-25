import { useParams } from "react-router";

import Navbar from "@/app/(app)/_components/Navbar";
import DetailsLoader from "@/app/(app)/dashboard/[id]/_components/DetailsLoader";
import CenteredSpinner from "@/components/ui/centered-spinner";
import ToastWithRedirect from "@/components/ui/toast-with-redirect";
import { useRiotAuthQuery } from "@/lib/api/queries/api/auth";

export default function DetailedMatchPage() {
  const { id } = useParams();

  const { data, status } = useRiotAuthQuery();

  if (!id) {
    return (
      <ToastWithRedirect
        to={"/"}
        message={"This request cannot be processed."}
      />
    );
  }

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  // Return an empty fragment because we will end up showing a toast and redirecting out anyways.
  if (status === "error") {
    return (
      <ToastWithRedirect
        to={"/dashboard"}
        message={"Hmm, you must be authenticated to access this page."}
      />
    );
  }

  if (!data.success) {
    return <ToastWithRedirect to={"/dashboard"} message={data.message} />;
  }

  return (
    <>
      <Navbar />
      <DetailsLoader uuid={id} />
    </>
  );
}
