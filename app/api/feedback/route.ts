import FeedBack, { IFeedBack } from "@/models/feedback";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const newReview: HydratedDocument<IFeedBack> = await new FeedBack({
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    }).save();

    return NextResponse.json(
      {
        data: newReview,
        message: "You Request Added Successfully ! our Team will consider it.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error,
        message: "Your Request Not sent Try Later",
      },
      { status: 500 }
    );
  }
}
