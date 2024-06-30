import { getEndpoint } from "../data";

export default function EndpointName({params}: { params: { endpoint: string }}) {
  const endpoint = getEndpoint(params.endpoint);
    return (
        <div>{endpoint?.name}</div>
    );
}