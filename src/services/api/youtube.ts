export interface ChannelStats {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    subscriberCount: string;
    viewCount: string;
    videoCount: string;
}

export const fetchChannelStats = async (accessToken: string): Promise<ChannelStats> => {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized');
        }
        throw new Error('Failed to fetch channel data');
    }

    const data = await response.json();
    const item = data.items?.[0];

    if (!item) {
        throw new Error('No channel found for this account');
    }

    return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
        subscriberCount: item.statistics.subscriberCount,
        viewCount: item.statistics.viewCount,
        videoCount: item.statistics.videoCount,
    };
};
