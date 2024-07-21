"use client"
import { useCallback, useEffect, useState } from "react";
import videojs from "video.js";
import { EndpointProps } from "../api/data";

export default function HLSPlayer({...props}) {
    const [endpoint, setEndpoint] = useState<EndpointProps | undefined>();
    const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
    const onVideo = useCallback((el: HTMLVideoElement) => {
      setVideoEl(el);
    }, []);
  
    useEffect(() => {
      if (videoEl === null) {
        return;
      }
      const fetchData = async () => {
        const res = await fetch(`/api/${props.endpoint}`);
        const {endpoint} = await res.json();
        // our video.js player
        const player = videojs(videoEl, {
          autoplay: true,
          controls: true,
          debug: false,
          width: props.width,
          height: props.height,
          sources: [{
            src: endpoint?.url,
            type: 'application/vnd.apple.mpegurl',
          }],
        });
        setEndpoint(endpoint);
      };
      fetchData();
      /*
      return () => {
        player.dispose();
      };
      */
    }, [props, videoEl]);
  
    return (
        <video ref={onVideo} className={props.className} playsInline />
    );
}
