import { useGetMatchInfoQuery } from "@/app/(app)/dashboard/[id]/_components/hooks";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";

export default function DetailsLoader({ uuid }: { uuid: string }) {
  const navigate = useNavigate();
  const { data, status } = useGetMatchInfoQuery(uuid);

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error") {
    notifications.show({
      message:
        "This is an invalid match page. Please try selecting another match.",
      color: "red",
    });
    navigate("/dashboard");
    return <></>;
  }

  return <pre>{JSON.stringify(data.data, null, 2)}</pre>;
}
