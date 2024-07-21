"use client"
import React, {useState, useEffect, useRef} from 'react';
import Hls from 'hls.js';
import { EndpointProps } from "../api/data";

export default function HLSPlayer({...props}) {
    const [endpoint, setEndpoint] = useState<EndpointProps | undefined>();
    const videoRef = useRef<HTMLVideoElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        const video = videoRef.current as HTMLVideoElement;
        if (video.src) {
            return;
        }
        const fetchData = async () => {
            const res = await fetch(`/api/${props.endpoint}`);
            const {endpoint} = await res.json();
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(endpoint.url);
                hls.attachMedia(video);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = endpoint.url;
            }
            setEndpoint(endpoint);
        };
        fetchData();
    }, [props.endpoint]);
    return (
        <>
            <video
                className={props.className}
                ref={videoRef}
                width={props.width}
                height={props.height}
            />
            <button
                ref={buttonRef}
                onClick={() => {
                    const video = videoRef.current as HTMLVideoElement;
                    const button = buttonRef.current as HTMLButtonElement;
                    if (isPlaying) {
                        video.pause();
                        button.innerHTML = 'Play';
                        setIsPlaying(false);
                    } else {
                        video.play();
                        button.innerHTML = 'Pause';
                        setIsPlaying(true);
                    }
                }}
            >
                Play
            </button>
        </>
    );
}
