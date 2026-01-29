// Instagram Graph API Service
// Using Facebook Graph API to access Instagram Business Account data

const ACCESS_TOKEN = 'EAAPVZCSfHj0YBQtTEbe71X64GISmLy6wQkw12JuiUIz56ZCKTahSllrfaqSn37sxNUNicvcgEZCwpUgr9ZAMV7k8wfTXiFviPQ0vUGYAUvF0OkAz2M1uK8laWLMpLdesWEsZCeSZAileFBcfIkg1sDrcLPyQGJdqvKhLD4kjvZAPW6ZBkjOrkldcc3S6ikLW2P3CYWsywNwMNYY0yTmFlLMhhVJtRiPtArYKZADimZByiEHGKubbSUEMG90lKL5S09QhA0bxfP055BQtFVghWOMYW3CM4J';
const API_VERSION = 'v18.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

export interface InstagramProfile {
  id: string;
  username: string;
  name?: string;
  biography?: string;
  profile_picture_url?: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  website?: string;
}

export interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export interface InstagramInsight {
  name: string;
  period: string;
  values: { value: number; end_time?: string }[];
  title: string;
  description: string;
}

export interface InstagramStory {
  id: string;
  media_type: 'IMAGE' | 'VIDEO';
  media_url?: string;
  timestamp: string;
  impressions?: number;
  reach?: number;
  replies?: number;
}

// API Error Handler
const handleApiError = (error: any) => {
  console.error('Instagram API Error:', error);
  throw error;
};

// Get Instagram Business Account ID
export const getInstagramAccountId = async (): Promise<string | null> => {
  try {
    // First, get user's Facebook Pages
    const pagesResponse = await fetch(
      `${BASE_URL}/me/accounts?fields=id,name,instagram_business_account&access_token=${ACCESS_TOKEN}`
    );
    const pagesData = await pagesResponse.json();

    if (pagesData.error) {
      handleApiError(pagesData.error);
      return null;
    }

    // Find page with Instagram Business Account
    const pageWithInstagram = pagesData.data?.find((page: any) => page.instagram_business_account);

    if (pageWithInstagram?.instagram_business_account?.id) {
      return pageWithInstagram.instagram_business_account.id;
    }

    return null;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// Get Instagram Profile Data
export const getInstagramProfile = async (accountId: string): Promise<InstagramProfile | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${accountId}?fields=id,username,name,biography,profile_picture_url,followers_count,follows_count,media_count,website&access_token=${ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.error) {
      handleApiError(data.error);
      return null;
    }

    return data as InstagramProfile;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// Get Instagram Media (Posts)
export const getInstagramMedia = async (accountId: string, limit: number = 25): Promise<InstagramMedia[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${accountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&limit=${limit}&access_token=${ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.error) {
      handleApiError(data.error);
      return [];
    }

    return data.data || [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Get Instagram Stories
export const getInstagramStories = async (accountId: string): Promise<InstagramStory[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${accountId}/stories?fields=id,media_type,media_url,timestamp&access_token=${ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.error) {
      handleApiError(data.error);
      return [];
    }

    return data.data || [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Get Instagram Insights (Account Level)
export const getInstagramInsights = async (
  accountId: string,
  metrics: string[] = ['impressions', 'reach', 'profile_views', 'website_clicks'],
  period: 'day' | 'week' | 'month' = 'day'
): Promise<InstagramInsight[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${accountId}/insights?metric=${metrics.join(',')}&period=${period}&access_token=${ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.error) {
      handleApiError(data.error);
      return [];
    }

    return data.data || [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Get Media Insights (for individual posts)
export const getMediaInsights = async (
  mediaId: string,
  metrics: string[] = ['impressions', 'reach', 'engagement', 'saved']
): Promise<InstagramInsight[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${mediaId}/insights?metric=${metrics.join(',')}&access_token=${ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.error) {
      handleApiError(data.error);
      return [];
    }

    return data.data || [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Combined function to get all Instagram data
export const fetchAllInstagramData = async () => {
  try {
    const accountId = await getInstagramAccountId();

    if (!accountId) {
      return {
        success: false,
        error: 'Не удалось получить ID Instagram аккаунта. Проверьте токен.',
        profile: null,
        media: [],
        stories: [],
        insights: []
      };
    }

    const [profile, media, stories] = await Promise.all([
      getInstagramProfile(accountId),
      getInstagramMedia(accountId, 25),
      getInstagramStories(accountId)
    ]);

    // Get insights separately (might fail for some accounts)
    let insights: InstagramInsight[] = [];
    try {
      insights = await getInstagramInsights(accountId, ['impressions', 'reach', 'profile_views'], 'day');
    } catch (e) {
      console.log('Insights not available for this account');
    }

    return {
      success: true,
      accountId,
      profile,
      media,
      stories,
      insights
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      profile: null,
      media: [],
      stories: [],
      insights: []
    };
  }
};

// Check if token is valid
export const validateToken = async (): Promise<{ valid: boolean; error?: string }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/me?access_token=${ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data.error) {
      return { valid: false, error: data.error.message };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: 'Network error' };
  }
};
