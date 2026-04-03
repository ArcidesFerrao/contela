"use client";

import { PurchaseWithItems } from "@/types/types";
import Link from "next/link";
import { useState } from "react";
import { OrderListItem, PurchaseListItem } from "./List";
import { Order, OrderItem } from "@/generated/prisma/client";
import { useLocale } from "@/lib/useLocale";
import { useTranslations } from "next-intl";

export default function PurchasesAndOrders({
  purchases,
  orders,
  purchaseCount,
  orderCount,
}: {
  purchases: PurchaseWithItems[];
  orders: (Order & {
    orderItems: OrderItem[];
  })[];
  purchaseCount: number;
  orderCount: number;
}) {
  const locale = useLocale();
  const t = useTranslations("Common");
  const pt = useTranslations("Purchases");
  const ot = useTranslations("Orders");

  const [view, setView] = useState<"purchases" | "orders">("purchases");
  const [orderFilter, setOrderFilter] = useState<
    | "ALL"
    | "SUBMITTED"
    | "DRAFT"
    | "CONFIRMED"
    | "IN_DELIVERY"
    | "IN_PREPARATION"
    | "DELIVERED"
    | "CANCELLED"
  >("ALL");

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "SUBMITTED") return o.status === "SUBMITTED";
    if (orderFilter === "DRAFT") return o.status === "DRAFT";
    if (orderFilter === "CONFIRMED") return o.status === "CONFIRMED";
    if (orderFilter === "IN_DELIVERY") return o.status === "IN_DELIVERY";
    if (orderFilter === "IN_PREPARATION") return o.status === "IN_PREPARATION";
    if (orderFilter === "DELIVERED") return o.status === "DELIVERED";
    if (orderFilter === "CANCELLED") return o.status === "CANCELLED";
    return true;
  });

  const filters = [
    { value: "ALL", label: t("all") },
    { value: "DRAFT", label: t("draft") },
    { value: "SUBMITTED", label: t("submitted") },
    { value: "IN_PREPARATION", label: t("inPreparation") },
    { value: "DELIVERED", label: t("delivered") },
    { value: "CONFIRMED", label: t("confirmed") },
    { value: "CANCELLED", label: t("cancelled") },
  ];

  const totalPurchasedItems = purchases.reduce((acc, purchase) => {
    return (
      acc + purchase.PurchaseItem.reduce((sum, item) => sum + item.stock, 0)
    );
  }, 0);

  const totalOrderedItems = orders
    .filter((so) => so.status !== "CANCELLED")
    .reduce((acc, order) => {
      return (
        acc +
        order.orderItems.reduce((itemAcc, item) => itemAcc + item.orderedQty, 0)
      );
    }, 0);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="header-p-o flex justify-between">
        <div className="toggle-buttons flex">
          <button
            className={`flex items-center gap-2 px-4 py-2  ${
              view === "purchases" && "toggled border-b-2"
            }`}
            onClick={() => setView("purchases")}
          >
            <span className="roentgen--bag"></span> {t("purchases")}
          </button>
          <button
            className={` flex items-center gap-2 px-4 py-2  ${
              view === "orders" && "toggled border-b-2"
            }`}
            onClick={() => setView("orders")}
          >
            <span className="flowbite--cart-solid"></span> {t("orders")}
          </button>
        </div>
        <div className="text-sm md:text-md flex gap-2 items-center">
          {view === "orders" && (
            <Link
              href={`/${locale}/service/purchases/orders/new`}
              className="add-product flex gap-1"
            >
              {ot("newOrder")}
            </Link>
          )}
          {view === "purchases" && (
            <Link
              href={`/${locale}/service/purchases/new`}
              className="add-product purchase-btn flex gap-1"
            >
              {pt("newPurchase")}
            </Link>
          )}
        </div>
      </div>

      {view === "purchases" && (
        <div className="purchase-list flex flex-col gap-5">
          <div className="purchases-data flex justify-between w-full">
            <div className="purchase-total">
              <h3>{pt("totalPurchases")}</h3>
              <p className="text-xl font-semibold">{purchaseCount}</p>
            </div>
            <div>
              <h3>{pt("totalSpent")}</h3>
              <p className="text-xl font-semibold">
                MZN {purchases.reduce((acc, sale) => acc + sale.total, 0)}.00
              </p>
            </div>
            <div>
              <h3>{pt("itemsPurchased")}</h3>
              <p className="text-xl font-semibold">{totalPurchasedItems}</p>
            </div>
          </div>
          {purchases.length === 0 ? (
            <p>{t("noPurchases")}...</p>
          ) : (
            <ul className="flex flex-col gap-4 w-full">
              {purchases.map((p) => (
                <PurchaseListItem key={p.id} purchases={p} />
              ))}
            </ul>
          )}
        </div>
      )}
      {view === "orders" && (
        <div className="orders-list flex flex-col gap-5">
          <div className="orders-data flex justify-between">
            <div className="flex flex-col ">
              <h3>{t("orders")}</h3>
              <p className="text-xl font-semibold">{orderCount}</p>
            </div>
            <div className="flex flex-col ">
              <h3>{pt("totalOrderedItems")}</h3>
              <p className="text-xl font-semibold">{totalOrderedItems}</p>
            </div>
            <div className="flex flex-col text-end">
              <h3>{pt("totalOrdersValue")}</h3>
              <p className="text-xl font-semibold">
                MZN{" "}
                {orders
                  .filter((so) => so.status !== "CANCELLED")
                  .reduce((acc, sale) => acc + sale.total, 0)}
                .00
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <p>{ot("noOrders")}...</p>
          ) : (
            <ul className="flex flex-col gap-2">
              <select
                name=""
                id=""
                className="orders-filter text-sm"
                value={orderFilter}
                onChange={(e) =>
                  setOrderFilter(e.target.value as typeof orderFilter)
                }
              >
                {filters.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              {filteredOrders.length === 0 ? (
                <p>{ot("noOrders")}...</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {filteredOrders.map((o) => (
                    <OrderListItem key={o.id} order={o} />
                  ))}
                </ul>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
