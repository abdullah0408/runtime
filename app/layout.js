"use client";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MessagesContext } from "@/context/MessagesContext";
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({ children }) {
  const [messages, setMessages] = useState(() => []);

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>RunTime</title>
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                {children}
              </SidebarProvider>
            </MessagesContext.Provider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
