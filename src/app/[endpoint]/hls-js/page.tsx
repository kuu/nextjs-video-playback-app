'use client';
import { useState, useEffect } from "react";
import styles from "../../page.module.css";
import HLSPlayer from "./hls";
import { getEndpoint, EndpointProps } from "../../data";

export default async function Player({params}: { params: { endpoint: string }}) {
  const [endpoint, setEndpoint] = useState<EndpointProps | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = await getEndpoint(params.endpoint);
      setEndpoint(endpoint);
    };
    fetchData();
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>{endpoint?.name}</div>
        <p>Played by HLS.js&nbsp;</p>
      </div>
      <div className={styles.center}>
        <HLSPlayer
          src={endpoint?.url}
          width={640}
          height={360}
          priority
        />
      </div>
    </main>
  );
}
