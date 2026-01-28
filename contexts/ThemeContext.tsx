import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: (e?: React.MouseEvent) => void;
  setTheme: (theme: Theme) => void;
  isAnimating: boolean;
}

// Extend Document type for View Transitions API
declare global {
  interface Document {
    startViewTransition?: (callback: () => void | Promise<void>) => {
      ready: Promise<void>;
      finished: Promise<void>;
    };
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('showtoday-theme');
    return (saved as Theme) || 'dark';
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('showtoday-theme', newTheme);
    setThemeState(newTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, []);

  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    // Prevent multiple rapid clicks
    if (isAnimating) return;

    const willBeDark = theme === 'light';
    const newTheme: Theme = willBeDark ? 'dark' : 'light';

    // Fallback for unsupported browsers
    if (!document.startViewTransition || !e) {
      applyTheme(newTheme);
      return;
    }

    setIsAnimating(true);

    // Get click coordinates
    const x = e.clientX;
    const y = e.clientY;

    // Calculate radius to cover entire screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Set direction attribute for CSS z-index control
    document.documentElement.dataset.themeDirection = willBeDark ? 'to-dark' : 'to-light';

    // Start view transition
    const transition = document.startViewTransition(() => {
      applyTheme(newTheme);
    });

    // Bidirectional animation with proper layering
    transition.ready.then(() => {
      const animationOptions: KeyframeAnimationOptions = {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards' as FillMode,
      };

      let animation: Animation;

      if (willBeDark) {
        // Light → Dark: NEW dark layer EXPANDS from click point
        animation = document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
          { ...animationOptions, pseudoElement: '::view-transition-new(root)' }
        );
      } else {
        // Dark → Light: OLD dark layer CONTRACTS to click point
        animation = document.documentElement.animate(
          { clipPath: [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`] },
          { ...animationOptions, pseudoElement: '::view-transition-old(root)' }
        );
      }

      animation.finished.finally(() => {
        setIsAnimating(false);
        delete document.documentElement.dataset.themeDirection;
      });
    }).catch(() => {
      setIsAnimating(false);
      delete document.documentElement.dataset.themeDirection;
    });
  }, [theme, isAnimating, applyTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    applyTheme(newTheme);
  }, [applyTheme]);

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme, isAnimating }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
