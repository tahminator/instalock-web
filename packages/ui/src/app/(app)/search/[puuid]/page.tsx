import { useParams } from "react-router";

import Navbar from "@/app/(app)/_components/Navbar";
import UserProfile from "@/app/(app)/search/[puuid]/_components/UserProfile/UserProfile";
import ToastWithRedirect from "@/components/ui/toast-with-redirect";

export default function UserProfilePage() {
  const { puuid } = useParams();

  if (!puuid) {
    return (
      <ToastWithRedirect
        to={"/search"}
        message={"This request cannot be processed."}
      />
    );
  }

  return (
    <>
      <Navbar />
      <UserProfile puuid={puuid} />
    </>
  );
}
