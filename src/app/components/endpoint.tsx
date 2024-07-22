'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { EndpointProps, PlayerProps } from "../api/data";

export default function Endpoint({params}: { params: { endpoint: string }}) {
    const [{endpoint, players}, setData] = useState<{endpoint: EndpointProps, players: PlayerProps[]} | {endpoint: undefined, players: undefined}>({endpoint: undefined, players: undefined});
    useEffect(() => {
      const fetchData = async () => {
        const res1 = await fetch(`/api/${params.endpoint}`);
        const {endpoint} = await res1.json();
        const res2 = await fetch(`/api/players/${endpoint.type}`);
        const {players} = await res2.json();
        setData({endpoint, players});
      };
      fetchData();
    }, []);
    return (
        <>
        {players?.map(({id, name}, index) => (
          <Link key={index} href={`/${endpoint?.id}/${id}`}>{name}</Link>
        ))}
        </>
    );
  }
  