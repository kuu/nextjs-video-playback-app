'use client';
import { useState, useEffect } from "react";
import styles from "../../page.module.css";
import HLSPlayer from "./video-js";
import { EndpointProps } from "../../api/data";

export default function Player({params}: { params: { endpoint: string }}) {
  const [endpoint, setEndpoint] = useState<EndpointProps | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/${params.endpoint}`);
      const {endpoint} = await res.json();
      setEndpoint(endpoint);
    };
    fetchData();
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>{endpoint?.name}</div>
        <p>Played by Video.js&nbsp;</p>
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
