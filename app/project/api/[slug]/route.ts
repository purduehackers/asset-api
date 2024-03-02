import { redirect } from 'next/navigation'

import getFile from '../../../actions/getFile'

interface paramsI {
  params: {
    slug: string
  }
}

export async function GET(request: Request, { params }: paramsI) {
  const url = await getFile(params.slug)
  redirect(url)
}
