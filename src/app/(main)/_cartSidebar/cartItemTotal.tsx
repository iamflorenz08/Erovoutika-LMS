import { ICart } from "@/types/cart";
import { fetchWithToken } from "@/utils/fetcher";
import { formatPrice } from "@/utils/formatter";
import React from "react";
import useSWR from "swr";
interface IProps {
  userId?: string;
  accessToken?: string;
}
export default function CartItemTotal({ accessToken, userId }: IProps) {
  const {
    data,
    isLoading,
    isValidating,
  }: { data: Array<ICart>; isLoading: boolean; isValidating: boolean } = useSWR(
    `/api/v1/carts/${userId}`,
    (url) => fetchWithToken(url, accessToken || "")
  );

  if (isLoading || isValidating) return <div>Updating...</div>;

  return (
    <span>
      ₱{" "}
      {formatPrice(
        data.reduce(
          (previousValue, cartItem) =>
            previousValue + Number(cartItem.course?.pricing?.price),
          0
        )
      )}
    </span>
  );
}
