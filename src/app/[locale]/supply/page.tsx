{
  /* <h2 className="text-2xl font-semibold underline">
  {st("financials")}
</h2> */
}
// const stockItems = await getStockItems(session.user.supplierId);
// const filteredItems = stockItems.filter(
//   (item) => (item.stock || item.stock == 0) && item.stock < 10,
// );
// const st = await getTranslations("Supplier");
// const ot = await getTranslations("Orders");
// import { getStockItems } from "@/lib/actions/product";
import { getSupplierDashBoardStats } from "@/lib/actions/dashboardStats";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DateFilter from "@/components/DateFilter";
import { getTranslations } from "next-intl/server";
import RevenueTrendChart from "@/components/RevenueTrendChart";
import Link from "next/link";

type SearchParams = {
  period?: "daily" | "weekly" | "monthly";
};

export default async function SupplyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  const t = await getTranslations("Common");

  if (!session) {
    redirect("/login");
  }

  if (!session.user.supplierId) {
    redirect("/register/supplier");
  }

  const params = await searchParams;
  const period = params.period || "monthly";

  const stats = await getSupplierDashBoardStats(period);

  if (!stats) return <p>{t("pleaseLogin")}</p>;

  const topItemsMax = stats.topItems[0]?.quantity ?? 1;

  return (
    <section className="flex flex-col w-full ">
      <div className="dash-header flex items-center justify-between">
        <h1 className="font-semibold">{stats.supplier}</h1>
        <DateFilter currentPeriod={period} />
      </div>

      <div className="supply-stats stats flex flex-col my-8">
        <div className=" profit-stats p-4 flex flex-col gap-2 min-w-52">
          <div className="flex  stats-container justify-between gap-1">
            <div>
              <h3 className="text-lg font-normal">{t("revenue")}</h3>
              <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                MZN {stats.revenue.toFixed(2)}
              </h4>
              <p className="text-xs text-base-content/50 opacity-60">
                {stats.saleCount} {t("sales")} este período
              </p>
            </div>
            <div>
              <h3 className="text-lg font-normal">{t("grossProfit")}</h3>
              <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                MZN {stats.profit.toFixed(2)}
              </h4>
              <p className="text-xs text-base-content/50  opacity-60">
                {t("grossMargin")}: {stats.grossMargin.toFixed(1)}%
              </p>
            </div>
            <div>
              <h3 className="text-lg font-normal">{t("items")}</h3>
              <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                {stats.stockItemCount}
              </h4>
              <span
                className={`text-xs text-base-content/50  font-light opacity-60 ${
                  (stats.lowStockCount ?? 0) === 0 ? "text-error" : "text-green"
                }`}
              >
                <p className="px-2 py-0.5 rounded-full">
                  {t("lowStock")}: {stats.lowStockCount ?? 0}
                </p>
              </span>
            </div>
            <div>
              <h3 className="text-lg font-normal">{t("clients")}</h3>
              <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                {stats.customerCount}
              </h4>
            </div>
          </div>
        </div>

        {stats.trendData.length > 0 && (
          <div className="pb-4 px-4 flex flex-col gap-2 w-full">
            <RevenueTrendChart data={stats.trendData} />
          </div>
        )}
      </div>

      {/* Bottom grid: top ordered + low stock */}
      {/* <div className="grid grid-cols-2 gap-4">
        {stats.topItems.length > 0 && (
          <div className="items-list flex flex-col p-4 gap-4">
            <h2 className="text-xl font-bold">{t("topOrdered")}</h2>
            <ul className="flex flex-col w-full gap-1">
              {stats.topItems.map(
                (item) =>
                  item && (
                    <li
                      key={item.id}
                      className="flex justify-between items-center w-full gap-2"
                    >
                      <span className="flex-1">{item.name}</span>
                      <span className="font-medium">{item.quantity}</span>
                    </li>
                  ),
              )}
            </ul>
          </div>
        )}

        {stats.lowStockItems.length > 0 && (
          <div className="items-list flex flex-col p-4 gap-4">
            <h2 className="text-xl font-bold">
              {t("lowStock")} {t("items")}
            </h2>
            <ul className="flex flex-col w-full gap-1">
              {stats.lowStockItems.map((item) => (
                <li key={item.id} className="flex justify-between w-full">
                  <span>{item.name}</span>
                  <span
                    className={`font-medium ${
                      (item.stock ?? 0) === 0 ? "text-error" : "text-warning"
                    }`}
                  >
                    {item.stock ?? 0}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top ordered */}
        {stats.topItems.length > 0 && (
          <div className="items-list bg-base-200 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("topOrdered")}</span>
              <Link
                href="/supply/stock"
                className="text-xs text-[#1D9E75] hover:underline"
              >
                {t("view")} →
              </Link>
            </div>
            <ul className="flex flex-col gap-2">
              {stats.topItems.map(
                (item) =>
                  item && (
                    <li key={item.id} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm truncate">{item.name}</span>
                          <span className="text-sm font-semibold ml-2 shrink-0">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="h-1 rounded-full bg-base-300 w-full">
                          <div
                            className="h-1 rounded-full bg-[#1D9E75]"
                            style={{
                              width: `${Math.round(
                                (item.quantity / topItemsMax) * 100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </li>
                  ),
              )}
            </ul>
          </div>
        )}

        {/* Low stock */}
        {stats.lowStockItems.length > 0 ? (
          <div className="items-list  bg-base-200 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {t("lowStock")} {t("items")}
              </span>
              <Link
                href="/supply/stock"
                className="text-xs text-[#1D9E75] hover:underline"
              >
                {t("manage")} →
              </Link>
            </div>
            <ul className="flex flex-col gap-2">
              {stats.lowStockItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-1.5 border-b border-base-300 last:border-0"
                >
                  <div>
                    <span className="text-sm">{item.name}</span>
                    <p className="text-[11px] text-base-content/40">
                      {t("minStock")}: 10 {t("units")}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                      (item.stock ?? 0) === 0
                        ? "bg-error/15 text-error"
                        : "bg-warning/15 text-warning"
                    }`}
                  >
                    {item.stock ?? 0}
                  </span>
                </li>
              ))}
            </ul>

            {/* Urgent restock alert */}
            {stats.lowStockItems.some((i) => (i.stock ?? 0) === 0) && (
              <div className="mt-1 rounded-lg border border-yellow-400 text-yellow-400 px-3 py-2.5">
                <p className="text-xs font-medium text-error">
                  {t("urgentRestock")}
                </p>
                <p className="text-[11px] text-base-content/50 mt-0.5">
                  {
                    stats.lowStockItems.filter((i) => (i.stock ?? 0) === 0)
                      .length
                  }{" "}
                  {t("itemsOutOfStock")}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-base-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center min-h-32">
            <span className="text-2xl">✓</span>
            <p className="text-sm font-medium text-success">
              {t("allStockOk")}
            </p>
            <p className="text-xs text-base-content/40">
              {t("noLowStockItems")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
{
  /* <span className="text-base-content/40 text-sm w-4 shrink-0">
                          {i + 1}
                        </span> */
}
{
  /* <div className="items-list flex flex-col  p-4 gap-4">
            <h2 className="text-xl font-bold">Resumo do Catalogo</h2>
            <ul className="flex flex-col w-full gap-1">
              <li className="flex justify-between items-center w-full gap-2">
                <span>Itens no catalogo</span>
                <span>{stats.stockItemCount}</span>
              </li>
              <li className="flex justify-between items-center w-full gap-2">
                <span>Stock baixo</span>
                <span>{stats.lowStockCount}</span>
              </li>
              <li className="flex justify-between items-center w-full gap-2">
                <span>Margem bruta</span>
                <span>{stats.grossMargin.toFixed(1)} MZN</span>
              </li>
            </ul>
          </div> */
}
{
  /* {filteredItems.length > 0 && (
    <div className="items-list flex flex-col p-4 w-fit gap-4 justify-start items-start">
      <h2 className="text-2xl font-bold">
        {t("lowStock")} {t("items")}
      </h2>
      <ul className="flex flex-col gap-1">
        {filteredItems.map((item) => (
          <li key={item.id} className="flex justify-between w-60">
            <span>{item.name}</span>
            <span className="font-medium">{item.stock}</span>
          </li>
        ))}
      </ul>
    </div>
  )}
  {stats.topItems.length > 0 && (
    <div className="items-list flex flex-col p-4 w-fit gap-4 justify-start items-start">
      <h2 className="text-2xl font-bold">{t("topOrdered")}</h2>
      <ul className="flex flex-col gap-1">
        {stats.topItems.map((item) => (
          <li key={item.id} className="flex justify-between w-60">
            <span>{item.name}</span>
            <span className="font-medium">{item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  )} */
}
{
  /* <div className="stats stats-details flex w-full flex-col p-4 gap-2">
          <div className="stats-header flex flex-col gap-1">
            <h2 className="text-2xl font-semibold underline">
              {t("statistics")}
            </h2>
            <p className="font-thin">{t("statsDescription")}</p>
          </div>
          <div className="stats-details-container  flex justify-between">
            <div className=" flex flex-col gap-2">
              <h2 className="text-lg font-medium underline ">
                {t("profitability")}
              </h2>
              <div className="stats-container flex flex-col">
                <div>
                  <h3 className="text-lg font-normal">{t("sales")}</h3>
                  <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                    {stats.saleCount}
                  </h4>
                </div>
                <div>
                  <h3 className="text-lg font-normal">{t("grossMargin")}</h3>
                  <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                    {stats.grossMargin.toFixed(1)}%
                  </h4>
                </div>
              </div>
            </div>
            <span className="divider"></span>

            <div className=" flex flex-col gap-2">
              <h2 className="text-lg font-medium underline">
                {st("customers")}
              </h2>
              <div className="stats-container flex flex-col">
                <div>
                  <h3 className="text-lg font-normal">
                    {st("totalCustomers")}
                  </h3>
                  <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                    {stats.customerCount}
                  </h4>
                </div>
                <div>
                  <h3 className="text-lg font-normal">{ot("avgOrderValue")}</h3>
                  <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                    MZN {stats.averageOrderValue.toFixed(2)}
                  </h4>
                </div>
              </div>
            </div>
            <span className="divider"></span>

            <div className=" flex flex-col gap-2">
              <h2 className="text-lg font-medium underline">{t("items")}</h2>
              <div className="stats-container flex flex-col">
                <div>
                  <h3 className="text-lg font-normal">{t("itemsOffered")}</h3>
                  <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                    {stats.stockItemCount}
                  </h4>
                </div>
                <div>
                  <h3 className="text-lg font-normal">{t("lowStock")}</h3>
                  <h4 className="text-xl py-1 whitespace-nowrap font-medium">
                    {filteredItems.length}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div> */
}
{
  /* <h2 className="text-lg font-semibold">{t("revenueTrend")}</h2> */
}
