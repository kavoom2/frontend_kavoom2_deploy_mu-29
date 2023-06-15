import productItemsApi from "@/mockers/productItems";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  try {
    const responseData = productItemsApi.getPagingProductItemList(page, limit);
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
