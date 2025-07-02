interface ViewData {
  count: number;
  lastViewed: number;
  sessionId: string;
}

const SESSION_ID = Math.random().toString(36).substring(2, 15);
const VIEW_PREFIX = 'gng_profile_view_';
const SESSION_PREFIX = 'gng_session_';

export const getViewCount = (athleteId: string): number => {
  if (typeof window === 'undefined') return 0;
  
  try {
    const stored = localStorage.getItem(VIEW_PREFIX + athleteId);
    if (stored) {
      const data: ViewData = JSON.parse(stored);
      return data.count;
    }
  } catch (error) {
    console.error('Error reading view count:', error);
  }
  
  return 0;
};

export const incrementViewCount = (athleteId: string): number => {
  if (typeof window === 'undefined') return 0;
  
  try {
    const stored = localStorage.getItem(VIEW_PREFIX + athleteId);
    const sessionKey = SESSION_PREFIX + athleteId;
    const hasViewedThisSession = sessionStorage.getItem(sessionKey);
    
    // If already viewed in this session, don't increment
    if (hasViewedThisSession) {
      return getViewCount(athleteId);
    }
    
    let data: ViewData;
    if (stored) {
      data = JSON.parse(stored);
      data.count += 1;
      data.lastViewed = Date.now();
    } else {
      data = {
        count: 1,
        lastViewed: Date.now(),
        sessionId: SESSION_ID
      };
    }
    
    localStorage.setItem(VIEW_PREFIX + athleteId, JSON.stringify(data));
    sessionStorage.setItem(sessionKey, 'true');
    
    return data.count;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return 0;
  }
};

export const formatViewCount = (count: number): string => {
  if (count === 0) return 'No scouts yet';
  if (count === 1) return '1 scout checking in';
  return `${count} scouts checking in`;
}; 