'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { EndpointProps } from "../api/data";

export default function Endpoints() {
  const [endpoints, setEndpoints] = useState<EndpointProps[] | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/endpoints");
      const {endpoints} = await res.json();
      setEndpoints(endpoints);
    };
    fetchData();
  }, []);
  return (<>
    {endpoints?.map(({id, name}, index) => (
      <Link key={index} href={id}>{name}</Link>
    ))}
  </>);
}
