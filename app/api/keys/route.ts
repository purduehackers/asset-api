import { NextResponse } from 'next/server'

import getKeys from '@/app/actions/getKeys'

export async function GET(request: Request) {
  const keys = await getKeys()
  return NextResponse.json({
    keys: keys,
  })
}
