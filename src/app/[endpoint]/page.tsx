import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import {getEndpoint, getPlayers} from "../data";

export default function Endpoint({params}: { params: { endpoint: string }}) {
    const endpoint = getEndpoint(params.endpoint);
    const players = endpoint ? getPlayers(endpoint.type) : [];
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