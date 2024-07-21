import { getEndpoint } from '../data';

export async function GET(
    request: Request,
    { params }: { params: { endpoint: string } }
  ) {
    const endpoint = await getEndpoint(params.endpoint);
    return Response.json({ endpoint });
  }

  export const revalidate = 0;
