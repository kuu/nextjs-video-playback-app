import dynamic from 'next/dynamic'
import styles from "../../page.module.css";

const DynamicEndpointName = dynamic(() => import('../../components/endpoint-name'), {
  ssr: false,
});

const DynamicHLSPlayer = dynamic(() => import('../../components/hls'), {
  ssr: false,
});

export default function Player({params}: { params: { endpoint: string }}) {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <DynamicEndpointName params={params} />
        <p>Played by HLS.js&nbsp;</p>
      </div>
      <div className={styles.center}>
        <DynamicHLSPlayer
          endpoint={params.endpoint}
          width={640}
          height={360}
          priority
        />
      </div>
    </main>
  );
}
