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
    return new Promise((resolve) => {
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
            resolve([]);
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

const defaultPlayers = {
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

function getPlayersAsync(type: 'hls' | 'dash'): Promise<PlayerProps[]> {
    return new Promise((resolve) => {
        try {
            const players = JSON.parse(process.env.NEXT_PUBLIC_PLAYER_LIST as string);
            console.log(`--- Reading from environment variable (type=${type}) ---`);
            console.log(`${JSON.stringify(players, null, 2)}`);
            console.log('---');
            if (players[type] === undefined) {
                resolve(defaultPlayers[type] || []);
            }
            resolve(players[type]);
        } catch (error) {
            console.error(error)
            resolve(defaultPlayers[type] || []);
        }
    });
}

export async function getPlayers(type: 'hls' | 'dash'): Promise<PlayerProps[]> {
    return await getPlayersAsync(type);
}
