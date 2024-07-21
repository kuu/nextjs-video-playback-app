export interface EndpointProps {
    readonly id: string;
    readonly type: 'hls' | 'dash';
    readonly name: string;
    readonly url: string;
}

export interface PlayerProps {
    readonly id: string;
    readonly name: string;
}

function getEndpointsAsync(): Promise<EndpointProps[]> {
    return new Promise((resolve, reject) => {
        try {
            const endpoints = JSON.parse(process.env.NEXT_PUBLIC_ENDPOINT_LIST as string);
            for (const endpoint of endpoints) {
                if (typeof endpoint.url === 'string' && !endpoint.url.startsWith('http')) {
                    const getUrl = eval(`(${endpoint.url})`);
                    if (typeof getUrl === 'function') {
                        endpoint.url = getUrl();
                    }
                }
            }
            console.log('--- Reading from environment variable ---');
            console.log(`${JSON.stringify(endpoints, null, 2)}`);
            console.log('---');
            resolve(endpoints);
        } catch (error) {
            console.error(error)
            reject(error);
        }
    });
}

export async function getEndpoints(): Promise<EndpointProps[]> {
    return await getEndpointsAsync();
}

export async function getEndpoint(id: string): Promise<EndpointProps | undefined> {
    for (const endpoint of await getEndpoints()) {
        if (endpoint.id === id) {
            return endpoint;
        }
    }
    return undefined;
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
            name: "SHAKA PlayerProps",
        },
        {
            id: "dash-js",
            name: "DASH-IF PlayerProps",
        },
    ],
};

export async function getPlayers(type: 'hls' | 'dash'): Promise<PlayerProps[]> {
    return Promise.resolve(players[type]);
}
