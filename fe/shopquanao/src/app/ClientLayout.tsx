"use client"; // ✅ cho phép dùng usePathname

import { usePathname } from "next/navigation";
import Header from "@/component/header";
import { ChatProvider } from "./context/chat.context";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // ✅ Layout cho admin: không có header, chat, fluid
    return <>{children}</>;
  }

  // ✅ Layout cho user
  return (
    <ChatProvider>
      

      <Header />

      {children}

    </ChatProvider>
  );
}
