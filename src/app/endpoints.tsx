import Link from "next/link";
import {getEndpoints} from "./data";

export default function Endpoints() {
    const endpoints = getEndpoints();
    return (
        <>
        {endpoints.map(({id, name}, index) => (
          <Link key={index} href={id}>{name}</Link>
        ))}
        </>
    );
}