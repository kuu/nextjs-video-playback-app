"use client"
import { useCallback, useEffect, useState } from "react";
import videojs from "video.js";

export default function HLSPlayer({...props}) {
    const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
    const onVideo = useCallback((el: HTMLVideoElement) => {
      setVideoEl(el);
    }, []);
  
    useEffect(() => {
      if (videoEl == null) {
        return;
      }
  
      // our video.js player
      const player = videojs(videoEl, {
        autoplay: true,
        controls: true,
        debug: false,
        width: props.width,
        height: props.height,
        sources: [{
          src: props.src,
          type: 'application/vnd.apple.mpegurl',
        }],
      });
  
      return () => {
        player.dispose();
      };
    }, [props, videoEl]);
  
    return (
        <video ref={onVideo} className={props.className} playsInline />
    );
}
