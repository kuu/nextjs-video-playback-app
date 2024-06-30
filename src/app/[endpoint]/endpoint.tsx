import Link from "next/link";
import { getEndpoint, getPlayers } from "../data";

export default function Endpoint({params}: { params: { endpoint: string }}) {
  const endpoint = getEndpoint(params.endpoint);
  const players = endpoint ? getPlayers(endpoint.type) : [];
    return (
        <>
          {players.map(({id, name}, index) => (
            <Link key={index} href={`/${endpoint?.id}/${id}`}>{name}</Link>
          ))}
        </>
    );
}