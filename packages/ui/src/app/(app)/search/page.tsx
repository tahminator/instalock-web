import Navbar from "@/app/(app)/_components/Navbar";
import SearchBar from "@/app/(app)/search/_components/SearchBar/SearchBar";
import TotalUsers from "@/app/(app)/search/_components/TotalUsers/TotalUsers";
import { Center } from "@mantine/core";

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <Center className="flex flex-col items-center justify-center h-[93.5vh]">
          <SearchBar />
          <TotalUsers />
        </Center>
      </div>
    </>
  );
}
