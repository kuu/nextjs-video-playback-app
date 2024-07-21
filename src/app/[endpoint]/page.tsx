'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
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
      <main className={styles.main}>
        <div className={styles.description}>
          <div>{endpoint?.name}</div>
          <p>
            Choose player&nbsp;
          </p>
        </div>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
        {players.map(({id, name}, index) => (
          <Link key={index} href={`/${endpoint?.id}/${id}`}>{name}</Link>
        ))}
        </div>
      </main>
    );
  }