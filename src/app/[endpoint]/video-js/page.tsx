import styles from "../../page.module.css";
import EndpointName from '../../components/endpoint-name';
import HLSPlayer from '../../components/video-js';

// export const revalidate = 0;

export default function Player({params}: { params: { endpoint: string }}) {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <EndpointName params={params} />
        <p>Played by Video.js&nbsp;</p>
      </div>
      <div className={styles.center}>
        <HLSPlayer
          endpoint={params.endpoint}
          width={640}
          height={360}
          priority
        />
      </div>
    </main>
  );
}
