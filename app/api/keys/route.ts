import { NextResponse } from "next/server"

import getFile from "../../actions/getFile";
import { redirect } from "next/navigation";
import getKeys from "@/app/actions/getKeys";

export async function GET(request: Request) {
    const keys = await getKeys();
    return NextResponse.json({
        keys: keys
    })
}