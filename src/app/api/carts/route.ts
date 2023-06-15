import cardItemsApi from "@/mockers/cartItems";
import productItemsApi from "@/mockers/productItems";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const responseData = cardItemsApi.getUserCartItems();
    return NextResponse.json({
      ...responseData,
      cartItems: responseData.cartItems.map((cartItem) => ({
        ...cartItem,
        ...productItemsApi.getProductItem(cartItem.item_no),
      })),
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
