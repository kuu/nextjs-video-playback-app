export interface Endpoint {
    readonly id: string;
    readonly type: 'hls' | 'dash';
    readonly name: string;
    readonly url: string | (() => Promise<string>);
}

export interface Player {
    readonly id: string;
    readonly name: string;
}

const enspoints = JSON.parse(process.env.ENDPOINT_LIST as string);
for (const endpoint of enspoints) {
    if (typeof endpoint.url === 'string' && !endpoint.url.startsWith('http')) {
        endpoint.url = eval(`(${endpoint.url})`);
    }
}

const players = {
    hls: [
        {
            id: "video-js",
            name: "Video.js",
        },
        {
            id: "hls-js",
            name: "HLS.js",
        },
    ],
    dash: [
        {
            id: "shaka-player",
            name: "SHAKA Player",
        },
        {
            id: "dash-js",
            name: "DASH-IF Player",
        },
    ],
};
  
export function getEndpoints(): Endpoint[] {
    return enspoints;
}

export function getEndpoint(id: string): Endpoint | null {
    for (const endpoint of enspoints) {
        if (endpoint.id === id) {
            return endpoint;
        }
    }
    return null;
}

export function getPlayers(type: 'hls' | 'dash'): Player[] {
    return players[type];
}
