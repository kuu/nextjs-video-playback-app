'use client';
import { useState, useEffect } from "react";
import { EndpointProps } from "../api/data";

export default function EndpointName({params}: { params: { endpoint: string }}) {
    const [endpoint, setEndpoint] = useState<EndpointProps | undefined>();
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`/api/${params.endpoint}`);
        const {endpoint} = await res.json();
        setEndpoint(endpoint);
      };
      fetchData();
    }, []);
    return (<div>{endpoint?.name}</div>);
  }
  