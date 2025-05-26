import GradientTitle from "@/app/_components/_gradient-title";
import InitialLandingPage from "@/app/_components/_initial-landing";
import { motion } from "framer-motion";
import GetStartedButton from "@/components/ui/get-started-button";
import GithubButton from "@/components/ui/github-button";
import { Button } from "@mantine/core";
import NativeLink from "@/components/native-link";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-row min-h-screen justify-center items-center rounded-md">
        <InitialLandingPage>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sm:text-5xl text-2xl font-bold text-white text-center"
          >
            Welcome to <GradientTitle />, the comprehensive Valorant companion.
          </motion.h1>
          <div className="flex flex-row justify-center items-center space-x-4">
            <GetStartedButton to="/dashboard" />
            {/* {data && !isLoading && !isError ? (
              <Link to="/dashboard">
                <Button
                  size="xl"
                  variant="gradient"
                  gradient={{ from: "purple", to: "red" }}
                  className="my-4"
                >
                  Welcome back, {data.username}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  size="xl"
                  variant="gradient"
                  gradient={{ from: "purple", to: "red" }}
                  className="my-4"
                >
                  Get Started
                </Button>
              </Link>
            )} */}
            <NativeLink to={"https://instalock.app"}>
              <Button size="xl" visibleFrom="sm" color={"deep-red"} my={"sm"}>
                Visit the Website
              </Button>
              <Button size="md" hiddenFrom="sm" color={"deep-red"} my={"sm"}>
                Visit the Website
              </Button>
            </NativeLink>
          </div>
        </InitialLandingPage>
      </div>
    </>
  );
}
