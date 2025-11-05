import { useState, useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fps: number;
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
}

export const usePerformance = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
  });

  const measureFPS = useCallback(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measure = () => {
      frameCount++;
      const currentTime = performance.now();
      const delta = currentTime - lastTime;
      const fps = Math.round(1000 / delta);
      
      if (frameCount >= 10) {
        setMetrics(prev => ({
          ...prev,
          fps,
        }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measure);
    };

    requestAnimationFrame(measure);
  }, []);

  const measureLoadTime = useCallback(() => {
    if (window.performance && window.performance.timing) {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
      setMetrics(prev => ({
        ...prev,
        loadTime,
      }));
    }
  }, []);

  const measureRenderTime = useCallback(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      const renderTime = end - start;
      setMetrics(prev => ({
        ...prev,
        renderTime,
      }));
    };
  }, []);

  const measureMemoryUsage = useCallback(() => {
    if ('memory' in performance && performance.memory) {
      setMetrics(prev => ({
        ...prev,
        memoryUsage: performance.memory.usedJSHeapSize,
      }));
    }
  }, []);

  useEffect(() => {
    measureFPS();
    measureLoadTime();
    measureMemoryUsage();
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause measurements when page is hidden
        return;
      }
      // Resume measurements when page is visible
      measureFPS();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return metrics;
};
