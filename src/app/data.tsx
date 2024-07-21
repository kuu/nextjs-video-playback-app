'use server';

// Define the server actions

export interface Endpoint {
    readonly id: string;
    readonly type: 'hls' | 'dash';
    readonly name: string;
    url: string | (() => Promise<string>);
}

export interface Player {
    readonly id: string;
    readonly name: string;
}

function getEndpointsAsync(): Promise<Endpoint[]> {
    return new Promise((resolve, reject) => {
        try {
            const endpoints = JSON.parse(process.env.NEXT_PUBLIC_ENDPOINT_LIST as string);
            for (const endpoint of endpoints) {
                if (typeof endpoint.url === 'string' && !endpoint.url.startsWith('http')) {
                    endpoint.url = eval(`(${endpoint.url})`);
                }
            }
            resolve(endpoints);
        } catch (error) {
            console.error(error)
            reject(error);
        }
    });
}

export async function getEndpoints(): Promise<Endpoint[]> {
    return await getEndpointsAsync();
}

export async function getEndpoint(id: string): Promise<Endpoint | null> {
    for (const endpoint of await getEndpoints()) {
        if (endpoint.id === id) {
            return endpoint;
        }
    }
    return null;
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

export async function getPlayers(type: 'hls' | 'dash'): Promise<Player[]> {
    return Promise.resolve(players[type]);
}
