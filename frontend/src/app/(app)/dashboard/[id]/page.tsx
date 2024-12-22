import DetailsLoader from "@/app/(app)/dashboard/[id]/_components/DetailsLoader";
import useRiotAuthQuery from "@/app/(app)/dashboard/hooks";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { checkIdSchema } from "@instalock/types/schema";
import { notifications } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router";

export default function DetailedMatchPage() {
  const navigate = useNavigate();
  const { id } = useParams() as { id?: string };

  const { data, status } = useRiotAuthQuery();

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error" || !data) {
    notifications.show({
      message: "Please authenticate first.",
      color: "red",
    });
    navigate("/dashboard");
    return <></>;
  }

  if (!id || !checkIdSchema.safeParse({ uuid: id }).success) {
    notifications.show({
      message:
        "This is an invalid match page. Please try selecting another match.",
      color: "red",
    });
    navigate("/dashboard");
    return <></>;
  }

  return <DetailsLoader uuid={id} />;
}
