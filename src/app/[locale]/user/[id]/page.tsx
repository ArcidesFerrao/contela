import {
  AdminLink,
  DashboardMenuLink,
  LogOutButton,
  ServiceLink,
  SupplierLink,
} from "@/components/LogOutButton";
import { db } from "@/lib/db";
import authCheck from "@/lib/authCheck";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ id: string }>;

export default async function UserPage(props: { params: Params }) {
  const session = await authCheck();

  if (!session) {
    redirect("/login");
  }

  const { id } = await props.params;
  const t = await getTranslations("Common");

  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      Service: true,
      Supplier: true,
    },
  });

  if (!user) {
    return (
      <section className="user-page flex flex-col items-center">
        <p>{t("userNotFound")}</p>
      </section>
    );
  }

  return (
    <section className="user-page flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className=" font-semibold  ">{user.name}</h2>
          <p className="text-xs font-extralight">
            {t("userId")}: {id.slice(0, 6)}...{" "}
          </p>
        </div>
        <div className="logout-button flex flex-col gap-2">
          {/* <div className="flex items-center gap-2 justify-end"> */}
          {user.role === "SERVICE" && <ServiceLink />}
          {user.role === "SUPPLIER" && <SupplierLink />}
          {user.role === "ADMIN" && <AdminLink />}
          <LogOutButton />
          {/* </div> */}
          {/* <DashboardMenuLink /> */}
        </div>
      </div>
      <UserProfile user={user} />
    </section>
  );
}
