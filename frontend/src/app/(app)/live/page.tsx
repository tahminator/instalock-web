import Navbar from "@/app/(app)/_components/Navbar";
import useRiotAuthQuery from "@/app/(app)/dashboard/hooks";
import LiveChecker from "@/app/(app)/live/_components/LiveChecker/LiveChecker";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";

export default function LiveMatchPage() {
  const navigate = useNavigate();
  const { status, data } = useRiotAuthQuery();

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error" || !data.authToken || !data.entitlement) {
    notifications.show({
      message: "You are not authorized. Please authenticate.",
    });
    navigate("/dashboard");
    return <></>;
  }

  return (
    <>
      <Navbar />
      <LiveChecker />
    </>
  );
}
