import { getPlayers } from '../../data';

export async function GET() {
    const players = await getPlayers('dash');
    return Response.json({ players });
}

export const revalidate = 0;
