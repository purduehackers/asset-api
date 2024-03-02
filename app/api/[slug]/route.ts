import { NextResponse } from "next/server"

import getFile from "../../actions/getFile";
import { redirect } from "next/navigation";

interface paramsI {
    params: {
        slug: string
    }
}

export async function GET(
        request: Request,
        { params }: paramsI) {
    const url = await getFile(params.slug)
    redirect(url);
}