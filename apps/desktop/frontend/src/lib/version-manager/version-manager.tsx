import NativeLink from "@/components/native-link";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { useVersionQuery } from "@/lib/version-manager/hooks";
import { Button, Modal } from "@mantine/core";
import { ReactNode } from "react";

const version = "0.0.1";

// TODO - Move the version logic to the Go layer.
export default function VersionManager({ children }: { children: ReactNode }) {
  const { data, status } = useVersionQuery();

  if (status === "pending") {
    return <CenteredSpinner />;
  }

  if (status === "error") {
    return children;
  }

  // Something went wrong, just let them use the app anyways.
  if (!data.success || !data.version) {
    return children;
  }

  if (version != data.version) {
    return (
      <>
        <Modal
          opened
          onClose={() => {}}
          closeButtonProps={{
            icon: <></>,
          }}
          title="Update Required"
        >
          You are not on the latest version of the client. Please click the
          button below to head to
          <NativeLink to={"https://instalock.app/downloads"}>
            <Button variant="transparent">instalock.app</Button>
          </NativeLink>
          and retrieve the latest version for your platform.
          <NativeLink to={"https://instalock.app/downloads"}>
            <Button color="deep-red" type="button">
              Visit Website
            </Button>
          </NativeLink>
        </Modal>
        {children}
      </>
    );
  }

  return children;
}
