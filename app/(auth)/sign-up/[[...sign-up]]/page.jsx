"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";
import { Signature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <SignUp.Root>
        <div className="flex flex-col items-center gap-2">
          <Link
            href="#"
            className="flex flex-col items-center gap-2 font-medium"
          >
            <span className="sr-only">RunTime</span>
          </Link>
          <h1 className="text-xl font-bold">Welcome to RunTime</h1>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
        <SignUp.Step name="start">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Clerk.Field name="emailAddress">
                <Clerk.Label asChild>
                  <Label>Email</Label>
                </Clerk.Label>
                <Clerk.Input asChild>
                  <Input
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Clerk.Input>
                <Clerk.FieldError className="text-red-600 text-sm italic" />
              </Clerk.Field>
              <Clerk.Field name="password">
                <Clerk.Label asChild>
                  <Label>Password</Label>
                </Clerk.Label>
                <Clerk.Input asChild>
                  <Input required />
                </Clerk.Input>
                <Clerk.FieldError className="text-red-600 text-sm italic" />
              </Clerk.Field>
            </div>
            <SignUp.Action submit asChild>
              <Button className="w-full">Sign Up</Button>
            </SignUp.Action>
          </div>
        </SignUp.Step>
        <SignUp.Step name="verifications">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p className="text-sm text-muted-foreground">
                We sent a code to
                <span className=" italic font-bold"> {email}.</span>
              </p>
              <SignUp.Strategy name="email_code">
                <Clerk.Field name="code">
                  <Clerk.Label asChild>
                    <Label>Email Code</Label>
                  </Clerk.Label>
                  <Clerk.Input asChild>
                    <Input />
                  </Clerk.Input>
                  <Clerk.FieldError className="text-red-600 text-sm italic" />
                </Clerk.Field>
              </SignUp.Strategy>
            </div>
            <SignUp.Action submit asChild>
              <Button className="w-full">Verify</Button>
            </SignUp.Action>
          </div>
        </SignUp.Step>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Clerk.Connection name="github" asChild>
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.533 2.294 6.537 5.47 7.599.4.074.553-.174.553-.388 0-.192-.008-.694-.011-1.364-2.223.489-2.692-1.073-2.692-1.073-.363-.922-.89-1.167-.89-1.167-.727-.497.055-.487.055-.487.803.057 1.226.828 1.226.828.711 1.22 1.868.868 2.323.664.073-.517.278-.868.507-1.067-1.777-.202-3.644-.889-3.644-3.947 0-.873.312-1.589.828-2.147-.083-.202-.359-.946.079-1.974 0 0 .67-.215 2.19.828 1.297-.36 2.698-.36 3.995 0 1.52-1.043 2.19-.828 2.19-.828.437 1.027.162 1.772.079 1.974.515.557.828 1.274.828 2.147 0 3.061-1.867 3.745-3.647 3.947.284.244.528.726.528 1.468 0 1.058-.009 1.92-.009 2.181 0 .215.152.463.56.388C13.706 14.537 16 11.533 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              Continue with GitHub
            </Button>
          </Clerk.Connection>
          <Clerk.Connection name="google" asChild>
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </Clerk.Connection>
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
          By clicking continue, you agree to our{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>.
        </div>
      </SignUp.Root>
    </div>
  );
}
