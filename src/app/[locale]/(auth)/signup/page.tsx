"use client";

import { UserRole } from "@/generated/prisma";
import { useTranslations } from "next-intl";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [error, setError] = useState("");
  const router = useRouter();
  const a = useTranslations("Auth");
  const ct = useTranslations("Common");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_TOKEN}`,
      },
      body: JSON.stringify({ name, email, password, phonenumber, role }),
    });

    if (res.ok) {
      setLoading(false);
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.message || "Failed to sign up");
      setLoading(false);
    }
  };
  return (
    <form
      className="signup-form flex flex-col py-4 gap-4 "
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col text-center self-center gap-1 max-w-96">
        <h1 className="text-2xl text-center font-semibold">{a("signUp")}</h1>
        <p className="font-light">{a("signUpSubtitle")}</p>
      </div>
      {error && <p className="text-red-400">{error}</p>}
      <label htmlFor="name" className="flex flex-col gap-1">
        {ct("name")}
        <input
          type="text"
          name="name"
          id="name"
          placeholder={a("yourName")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-sm font-light"
        />
      </label>
      <div className="flex flex-col gap-2">
        <span className="">{a("pickRole")}</span>
        <div className="grid grid-cols-2 gap-2 ">
          <label
            htmlFor="role-service"
            className={
              role === "SERVICE"
                ? "cursor-pointer pill-active p-2 flex flex-col gap-2 items-center rounded-md hover:opacity-100  opacity-80"
                : "cursor-pointer pill-active p-2 flex flex-col gap-2 items-center rounded-md opacity-50 hover:opacity-100  "
            }
          >
            <input
              type="radio"
              name="role"
              id="role-service"
              checked={role === "SERVICE"}
              onChange={() => setRole("SERVICE")}
              value="SERVICE"
              className="sr-only"
            />
            <svg
              width="32"
              // height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#05df72"
              stroke-width="1.5"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            {ct("service")}
          </label>
          <label
            htmlFor="role-supplier"
            className={
              role === "SUPPLIER"
                ? "cursor-pointer pill-active-supply p-2 flex flex-col gap-2 items-center rounded-md hover:opacity-100  opacity-80"
                : "cursor-pointer pill-active-supply p-2 flex flex-col gap-2 items-center rounded-md opacity-50 hover:opacity-100  "
            }
          >
            <input
              type="radio"
              name="role"
              id="role-supplier"
              checked={role === "SUPPLIER"}
              onChange={() => setRole("SUPPLIER")}
              value="SUPPLIER"
              className="sr-only"
            />
            <svg
              width="32"
              // height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#378ADD"
              stroke-width="1.5"
            >
              <rect x="1" y="3" width="15" height="13" rx="1"></rect>
              <path d="M16 8h4l3 3v5h-7V8z"></path>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            {ct("supplier")}
          </label>
        </div>
      </div>

      <label htmlFor="email" className="flex flex-col gap-1">
        {a("email")}

        <input
          type="email"
          name="email"
          id="email"
          placeholder={a("emailExample")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-sm font-light"
        />
      </label>
      <label htmlFor="phonenumber" className="flex flex-col gap-1">
        {a("phone")}

        <input
          type="phonenumber"
          name="phonenumber"
          id="phonenumber"
          placeholder={a("phoneExample")}
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value.toString())}
          className="text-sm font-light"
        />
      </label>
      <label htmlFor="password" className="flex flex-col gap-1">
        {a("password")}

        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={a("passwordExample")}
          className="text-sm font-light"
        />
      </label>
      <p className="font-light">
        {a("alreadyHaveAccount")} <Link href="/login">{a("signInHere")}</Link>
      </p>
      <input type="submit" value={loading ? a("signingUp") : a("signUp")} />
      <p className="text-center text-xs font-light">
        {a.rich("termsAgreement", {
          strong: (chunks) => (
            <strong className="text-white/90 font-semibold">{chunks}</strong>
          ),
        })}
      </p>
    </form>
  );
}
