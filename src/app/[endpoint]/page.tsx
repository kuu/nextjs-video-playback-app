import Image from "next/image";
import dynamic from 'next/dynamic'
import styles from "../page.module.css";

const DynamicEndpoint = dynamic(() => import('../components/endpoint'), {
  ssr: false,
});

const DynamicEndpointName = dynamic(() => import('../components/endpoint-name'), {
  ssr: false,
});

export const revalidate = 0;

export default function Endpoint({params}: { params: { endpoint: string }}) {
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          <DynamicEndpointName params={params} />
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
          <DynamicEndpoint params={params} />
        </div>
      </main>
    );
  }