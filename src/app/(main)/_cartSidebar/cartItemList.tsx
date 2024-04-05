import { ICart } from "@/types/cart";
import { fetchWithToken } from "@/utils/fetcher";
import useSWR from "swr";
import Image from "next/image";
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";
import { formatPrice } from "@/utils/formatter";
import { removeToCart } from "../course/[id]/@buyCourse/action";
import { useFormStatus } from "react-dom";

interface IProps {
  userId?: string;
  accessToken?: string;
}

const SubmiButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="text-left" disabled={pending}>
      {pending ? (
        <span className="text-left loading loading-spinner loading-md"></span>
      ) : (
        <IoTrashOutline size={24} />
      )}
    </button>
  );
};

export default function CartItemList({ accessToken, userId }: IProps) {
  const { data, isLoading, isValidating, mutate } = useSWR(
    `/api/v1/carts/${userId}`,
    (url) => fetchWithToken(url, accessToken || "")
  );

  if (isLoading || isValidating)
    return <div className="w-full text-center">Updating...</div>;

  return data.map((cartItem: ICart) => (
    <div key={cartItem._id} className="flex px-4 pt-4 gap-4">
      <div className="min-w-[104px] min-h-[104px] relative rounded-md overflow-hidden">
        {cartItem.course?.banner && (
          <Image
            className="object-cover"
            src={cartItem.course?.banner}
            alt="courseBanner"
            fill
          />
        )}
      </div>
      <div className="flex flex-col justify-center gap-2 w-full">
        <span className="capitalize">{cartItem.course?.name}</span>
        <form
          action={async () => {
            const remove = await removeToCart(cartItem._id);
            if (!remove) return;
            mutate([
              ...data.filter((value: ICart) => value._id !== cartItem._id),
            ]);
          }}
          className="flex flex-col gap-1"
        >
          <span className="text-gray">Hybrid Class</span>
          <SubmiButton />
        </form>
      </div>
      <div className="h-full flex flex-col">
        <div className="h-full flex flex-col justify-center">
          <span className="text-primary font-medium text-nowrap flex items-center">
            ₱ {formatPrice(Number(cartItem.course?.pricing?.price))}
          </span>
        </div>
      </div>
    </div>
  ));
}
