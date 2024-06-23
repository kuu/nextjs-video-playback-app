import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import {getEndpoints} from "./data";

export default function Home() {
  const endpoints = getEndpoints();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
        <p>
          Choose endpoint&nbsp;
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
        {endpoints.map(({id, name}, index) => (
          <Link key={index} href={id}>{name}</Link>
        ))}
      </div>
    </main>
  );
}
