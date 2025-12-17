import Navbar from "@/app/(app)/_components/Navbar";
import DetailsLoader from "@/app/(app)/dashboard/[id]/_components/DetailsLoader";
import useRiotAuthQuery from "@/app/(app)/dashboard/hooks";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { checkIdSchema } from "@instalock/types/schema";
import { notifications } from "@mantine/notifications";
import { Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export default function DetailedMatchPage() {
  const navigate = useNavigate();
  const { id } = useParams() as { id?: string };

  // The boolean input is a custom implementation to handle unauthenticated cases.
  // Check implementation for details.
  const { data, status } = useRiotAuthQuery(true);

  const parseSuccess = checkIdSchema.safeParse({ uuid: id }).success;

  useEffect(() => {
    if (!id || !parseSuccess) {
      notifications.show({
        message:
          "This is an invalid match page. Please try selecting another match.",
        color: "red",
      });
      navigate("/dashboard");
    }
  }, [id, navigate, parseSuccess]);

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  // Return an empty fragment because we will end up showing a toast and redirecting out anyways.
  if (status === "error" || !data || !id || !parseSuccess) {
    return <></>;
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<CenteredSpinner />}>
        <DetailsLoader uuid={id} />
      </Suspense>
    </>
  );
}
