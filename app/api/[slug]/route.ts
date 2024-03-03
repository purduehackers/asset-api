import { redirect } from 'next/navigation'

import getFetchFileUrl from '../../actions/getFetchFileUrl'

interface paramsI {
  params: {
    slug: string
  }
}

export async function GET(request: Request, { params }: paramsI) {
  const url = await getFetchFileUrl(params.slug)
  redirect(url)
}
