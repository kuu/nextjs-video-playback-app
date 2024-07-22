import Image from "next/image";
import styles from "../page.module.css";
import EndpointLink from '../components/endpoint';
import EndpointName from '../components/endpoint-name';

// export const revalidate = 0;

export default function Endpoint({params}: { params: { endpoint: string }}) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <EndpointName params={params} />
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
          <EndpointLink params={params} />
        </div>
      </main>
    );
  }