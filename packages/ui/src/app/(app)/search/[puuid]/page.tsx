import Navbar from "@/app/(app)/_components/Navbar";
import UserProfile from "@/app/(app)/search/[puuid]/_components/UserProfile/UserProfile";
import { notifications } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { puuid } = useParams();

  if (!puuid) {
    notifications.show({
      color: "red",
      message: "Missing PUUID",
    });
    navigate("/");
    return <></>;
  }

  return (
    <>
      <Navbar />
      <UserProfile puuid={puuid} />
    </>
  );
}
