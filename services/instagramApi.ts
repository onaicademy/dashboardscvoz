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
    const url = `${BASE_URL}/me/accounts?fields=id,name,instagram_business_account&access_token=${ACCESS_TOKEN}`;
    console.log('🔗 [Instagram API] Fetching FB Pages...');

    const pagesResponse = await fetch(url);
    const pagesData = await pagesResponse.json();

    console.log('📦 [Instagram API] FB Pages response:', JSON.stringify(pagesData, null, 2));

    if (pagesData.error) {
      console.error('❌ [Instagram API] FB Pages error:', pagesData.error);
      handleApiError(pagesData.error);
      return null;
    }

    if (!pagesData.data || pagesData.data.length === 0) {
      console.error('❌ [Instagram API] No FB Pages found. Make sure token has pages_show_list permission.');
      return null;
    }

    console.log('📋 [Instagram API] Found', pagesData.data.length, 'FB Pages');

    // Find page with Instagram Business Account
    const pageWithInstagram = pagesData.data?.find((page: any) => page.instagram_business_account);

    if (pageWithInstagram?.instagram_business_account?.id) {
      console.log('✅ [Instagram API] Found Instagram Business Account:', pageWithInstagram.instagram_business_account.id);
      console.log('   Linked to FB Page:', pageWithInstagram.name);
      return pageWithInstagram.instagram_business_account.id;
    }

    console.error('❌ [Instagram API] None of the FB Pages have Instagram Business Account linked');
    console.log('   Pages found:', pagesData.data.map((p: any) => p.name).join(', '));
    return null;
  } catch (error) {
    console.error('❌ [Instagram API] Network/fetch error:', error);
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
  console.log('🔄 [Instagram API] Starting data fetch...');

  try {
    // Step 1: Get Account ID
    console.log('📍 [Instagram API] Step 1: Getting Instagram Account ID...');
    const accountId = await getInstagramAccountId();
    console.log('📍 [Instagram API] Account ID result:', accountId);

    if (!accountId) {
      console.error('❌ [Instagram API] Failed to get account ID - check token and FB Page linkage');
      return {
        success: false,
        error: 'Не удалось получить ID Instagram аккаунта. Убедитесь что Instagram привязан к Facebook Page.',
        profile: null,
        media: [],
        stories: [],
        insights: []
      };
    }

    // Step 2: Fetch profile, media, stories in parallel
    console.log('📍 [Instagram API] Step 2: Fetching profile, media, stories...');
    const [profile, media, stories] = await Promise.all([
      getInstagramProfile(accountId),
      getInstagramMedia(accountId, 25),
      getInstagramStories(accountId)
    ]);

    console.log('📍 [Instagram API] Profile result:', profile);
    console.log('📍 [Instagram API] Media count:', media.length);
    console.log('📍 [Instagram API] Stories count:', stories.length);

    // Get insights separately (might fail for some accounts)
    let insights: InstagramInsight[] = [];
    try {
      insights = await getInstagramInsights(accountId, ['impressions', 'reach', 'profile_views'], 'day');
      console.log('📍 [Instagram API] Insights count:', insights.length);
    } catch (e) {
      console.log('⚠️ [Instagram API] Insights not available for this account');
    }

    if (!profile) {
      console.error('❌ [Instagram API] Profile is null - API returned no data');
      return {
        success: false,
        error: 'Профиль не найден. Проверьте права доступа токена.',
        profile: null,
        media: [],
        stories: [],
        insights: []
      };
    }

    console.log('✅ [Instagram API] Successfully fetched all data for @' + profile.username);
    return {
      success: true,
      accountId,
      profile,
      media,
      stories,
      insights
    };
  } catch (error) {
    console.error('❌ [Instagram API] Error:', error);
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
