"use client"
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { MessagesContext } from "@/context/MessagesContext";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [messages, setMessages] = useState([]);
  
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <Navbar />
              {children}
            </MessagesContext.Provider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
