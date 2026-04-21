import Link from "next/link";

export const ListDeliveryItem = ({
  id,
  locale,
  name,
  price,
  qty,
}: {
  id: string;
  locale: string;
  name: string;
  price: number;
  qty: number;
}) => {
  // const { locale } = useParams();

  return (
    <li className="supplier-item flex p-4 justify-between">
      <div className="delivery-item-title flex flex-col md:flex-row sm:gap-2 md:gap-4 justify-between md:items-center ">
        <Link href={`/${locale}/supply/products/${id}`}>
          <h3 className="text-lg font-medium">{name}</h3>
        </Link>
        <p className="text-xs font-light">Qty: {qty}</p>
      </div>
      <div className="supplier-item-details flex items-center gap-5">
        <h4 className="text-xl font-bold  text-nowrap">MZN {price},00</h4>
      </div>
    </li>
  );
};
