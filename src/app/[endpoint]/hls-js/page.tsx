import styles from "../../page.module.css";
import HLSPlayer from "./hls";
import {getEndpoint} from "../../data";

export default async function Player({params}: { params: { endpoint: string }}) {
  const endpoint = getEndpoint(params.endpoint);
  if (!endpoint) {
    return <div>Endpoint is not specified</div>;
  }
  let url = '';
  if (typeof endpoint.url === 'string') {
    url = endpoint.url;
  } else if (typeof endpoint.url === 'function') {
    url = await endpoint.url();
  } else {
    return <div>URL is not specified</div>;
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>{endpoint?.name}</div>
        <p>Played by HLS.js&nbsp;</p>
      </div>
      <div className={styles.center}>
        <HLSPlayer
          src={url}
          width={640}
          height={360}
          priority
        />
      </div>
    </main>
  );
}
