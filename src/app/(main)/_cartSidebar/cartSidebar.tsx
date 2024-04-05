import CartSidebarModal from "./cartSidebarModal";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { ICart } from "@/types/cart";

export default async function CartSidebar() {
  return <CartSidebarModal />;
}
