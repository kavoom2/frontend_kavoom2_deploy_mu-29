import cardItemsApi from "@/mockers/cartItems";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { itemNo: string } },
) {
  try {
    const itemNo = Number(params.itemNo);
    const { order_count } = await request.json();

    cardItemsApi.addUserCartItem(itemNo, order_count);
    return NextResponse.json({ success: true });
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

export async function PUT(
  request: Request,
  { params }: { params: { itemNo: string } },
) {
  try {
    const itemNo = Number(params.itemNo);
    const { order_count } = await request.json();

    cardItemsApi.updateUserCartItem(itemNo, order_count);
    return NextResponse.json({ success: true });
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

export async function DELETE(
  request: Request,
  { params }: { params: { itemNo: string } },
) {
  try {
    const itemNo = Number(params.itemNo);

    cardItemsApi.removeUserCartItem(itemNo);
    return NextResponse.json({ success: true });
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
