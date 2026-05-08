"use client";

import { useLocale } from "@/lib/useLocale";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const rt = useTranslations("Responses");
  const locale = useLocale();
  return (
    <div className="home-dash flex flex-col items-center justify-center gap-4 py-5">
      <div
        className=" flex flex-col items-center justify-center gap-6 text-center px-4"
        style={{ background: "#14111a", color: "#f4f5fa" }}
      >
        <p className="text-8xl font-bold" style={{ color: "#1D9E75" }}>
          404
        </p>

        <div className="flex flex-col gap-2 max-w-sm">
          <h1 className="text-xl font-semibold">{rt("pageNotFound")}</h1>
          <p className="font-light opacity-50 text-sm">
            {rt("pageNotFoundMessage")}
          </p>
        </div>

        <Link
          href={`/${locale}`}
          className="px-6 py-2 rounded-lg text-sm font-medium"
          style={{ background: "#1D9E75", color: "#f4f5fa" }}
        >
          {rt("goBackHome")}
        </Link>
      </div>
    </div>
  );
}
