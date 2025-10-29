import { BrowserOpenURL } from "@w/runtime/runtime";
import { ReactNode } from "react";

// Opens the URL inside of the browser instead of the webview.
export default function NativeLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        BrowserOpenURL(to);
      }}
    >
      {children}
    </a>
  );
}
