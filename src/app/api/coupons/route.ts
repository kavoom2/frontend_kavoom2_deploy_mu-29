import couponsApi from "@/mockers/coupons";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const responseData = couponsApi.getUserCoupons();
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
