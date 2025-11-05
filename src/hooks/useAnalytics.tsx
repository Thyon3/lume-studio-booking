import { useState, useEffect, useCallback } from 'react';

interface PageView {
  path: string;
  timestamp: number;
  title?: string;
  referrer?: string;
  userAgent: string;
}

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}

interface UseAnalyticsOptions {
  trackPageViews?: boolean;
  trackEvents?: boolean;
  debug?: boolean;
}

export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  const trackPageView = useCallback(
    (path: string, title?: string) => {
      if (!options.trackPageViews) return;

      const pageView: PageView = {
        path,
        timestamp: Date.now(),
        title,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      };

      setPageViews(prev => [...prev, pageView]);
      
      if (options.debug) {
        console.log('Page view tracked:', pageView);
      }
    },
    [options.trackPageViews]
  );

  const trackEvent = useCallback(
    (name: string, properties?: Record<string, any>) => {
      if (!options.trackEvents) return;

      const event: AnalyticsEvent = {
        name,
        properties,
        timestamp: Date.now(),
      };

      setEvents(prev => [...prev, event]);
      
      if (options.debug) {
        console.log('Event tracked:', event);
      }
    },
    [options.trackEvents]
  );

  const getAnalyticsData = useCallback(() => {
    return {
      pageViews,
      events,
    };
  }, [pageViews, events]);

  useEffect(() => {
    // Track initial page view
    if (options.trackPageViews) {
      trackPageView(window.location.pathname, document.title);
    }

    // Add event listeners for analytics
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const eventName = target.getAttribute('data-analytics');
      if (eventName) {
        trackEvent(eventName);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && options.trackPageViews) {
        trackPageView(window.location.pathname, document.title);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trackPageView, trackEvent, options.trackEvents]);

  return {
    trackPageView,
    trackEvent,
    getAnalyticsData,
  };
};
