import { getEndpoint } from "../data";

export default async function EndpointName({params}: { params: { endpoint: string }}) {
  const endpoint = await getEndpoint(params.endpoint);
    return (
        <div>{endpoint?.name}</div>
    );
}