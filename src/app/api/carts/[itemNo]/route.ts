import cardItemsApi from "@/mockers/cartItems";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { itemNo: string } },
) {
  try {
    const itemNo = Number(params.itemNo);

    const { data } = await request.json();
    const orderCount = data?.order_count;

    const responseData = cardItemsApi.addUserCartItem(itemNo, orderCount);
    return NextResponse.json(responseData);
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

    const { data } = await request.json();
    const orderCount = data?.order_count;

    const responseData = cardItemsApi.updateUserCartItem(itemNo, orderCount);
    return NextResponse.json(responseData);
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
  _request: Request,
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
