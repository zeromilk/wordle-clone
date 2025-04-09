import DictionaryAPI from "@/apis/free-dictionary";
import { GetWordReq } from "@/apis/internal/dto/dictionary";
import WordleUtils from "@/utils/WordleUtils";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<GetWordReq> }
): Promise<NextResponse> {
  try {
    const encryptWord = (await params)["encrypt-word"];

    const res = await new DictionaryAPI().getWord(
      WordleUtils.decrypt(encryptWord)
    );

    return NextResponse.json(res);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response && err.response.status) {
        return NextResponse.json(
          { error: err.response.data || err.message },
          { status: err.response.status }
        );
      }
    }

    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
