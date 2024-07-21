'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { EndpointProps, PlayerProps } from "../api/data";

export default function Endpoint({params}: { params: { endpoint: string }}) {
    const [endpoint, setEndpoint] = useState<EndpointProps | undefined>();
    const [players, setPlayers] = useState<PlayerProps[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`/api/${params.endpoint}`);
        const {endpoint} = await res.json();
        setEndpoint(endpoint);
        if (endpoint) {
          const res = await fetch(`/api/players?type=${endpoint.type}`);
          const {players} = await res.json();
          setPlayers(players);
        }
      };
      fetchData();
    }, []);
    return (
        <>
        {players.map(({id, name}, index) => (
          <Link key={index} href={`/${endpoint?.id}/${id}`}>{name}</Link>
        ))}
        </>
    );
  }
  