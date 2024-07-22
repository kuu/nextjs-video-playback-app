import { getPlayers } from '../../data';

export async function GET() {
    const players = await getPlayers('hls');
    return Response.json({ players });
}

// export const revalidate = 0;
