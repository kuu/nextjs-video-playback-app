import Link from "next/link";
import {getEndpoints} from "./data";

export default async function Endpoints() {
    const endpoints = await getEndpoints();
    return (
        <>
        {endpoints.map(({id, name}, index) => (
          <Link key={index} href={id}>{name}</Link>
        ))}
        </>
    );
}