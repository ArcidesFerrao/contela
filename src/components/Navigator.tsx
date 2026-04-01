"use client";

import { useTranslations } from "next-intl";
import { NavLink, HomeNavLink } from "./NavLink";
import { usePathname } from "next/navigation";

export const Navigator = () => {
  const pathname = usePathname();
  const base = pathname.split("/")[1] || "pt";
  return (
    <nav className="navigator">
      <ul className="flex flex-col gap-2">
        <HomeNavLink href={`${base}/stock`} label="Overview" />
        <NavLink href={`${base}/stock/products`} label="Items" />
        <NavLink href={`${base}/stock/inventory`} label="Stock" />
        <NavLink href={`${base}/stock/logs`} label="Active Logs" />
      </ul>
    </nav>
  );
};

export const ServiceNav = () => {
  const t = useTranslations("Common");

  const pathname = usePathname();
  const base = pathname.split("/")[1] || "pt";
  return (
    <nav className="navigator">
      <ul className="flex flex-col gap-2">
        <HomeNavLink href={`/${base}/service`} label={t("dashboard")} />
        <NavLink href={`/${base}/service/products`} label={t("items")} />
        <NavLink href={`/${base}/service/sales`} label={t("sales")} />
        <NavLink href={`/${base}/service/purchases`} label={t("purchases")} />
        <NavLink href={`/${base}/service/expenses`} label={t("expenses")} />
        <NavLink href={`/${base}/service/logs`} label={t("logs")} />
        <NavLink href={`/${base}/service/settings`} label={t("settings")} />
      </ul>
    </nav>
  );
};

export const SupplyNav = () => {
  const pathname = usePathname();
  const t = useTranslations("Common");

  const base = pathname.split("/")[1] || "pt";
  return (
    <nav className="navigator">
      <ul className="flex flex-col gap-2">
        <HomeNavLink href={`/${base}/supply`} label={t("dashboard")} />
        <NavLink href={`/${base}/supply/products`} label={t("stock")} />
        <NavLink href={`/${base}/supply/orders`} label={t("orders")} />
        <NavLink href={`/${base}/supply/logs`} label={t("logs")} />
        <NavLink href={`/${base}/supply/settings`} label={t("settings")} />
      </ul>
    </nav>
  );
};

export const AdminNav = () => {
  const pathname = usePathname();
  const base = pathname.split("/")[1] || "pt";
  const t = useTranslations("Common");

  return (
    <nav className="navigator">
      <ul className="flex flex-col gap-2">
        <HomeNavLink href={`/${base}/admin`} label={t("dashboard")} />
        <NavLink href={`/${base}/admin/users`} label={t("users")} />
        <NavLink href={`/${base}/admin/products`} label={t("items")} />
        <NavLink href={`/${base}/admin/orders`} label={t("orders")} />
        <NavLink href={`/${base}/admin/sales`} label={t("sales")} />
        <NavLink href={`/${base}/admin/activity`} label={t("logs")} />
        <NavLink href={`/${base}/admin/settings`} label={t("settings")} />
      </ul>
    </nav>
  );
};
