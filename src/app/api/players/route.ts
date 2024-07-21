import { getPlayers } from '../data';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const players = (type !== 'hls' && type !== 'dash') ? [] : await getPlayers(type);
    return Response.json({ players });
}