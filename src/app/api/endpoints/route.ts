import { getEndpoints } from '../data';

export async function GET() {
    const endpoints = await getEndpoints();
    return Response.json({ endpoints });
}
