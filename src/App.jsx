import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import VideoModal from './components/VideoModal';
import ChalisaReader from './components/ChalisaReader';
import SuvicharSection from './components/SuvicharSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { VIDEOS_DATA } from './data/videosData';
import { CheckCircle2, Bookmark, ArrowUp } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('jindhara_lang') || 'hi';
  });

  // Default to the radiant Divine Chandan Ivory & Temple Gold Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jindhara_theme') || 'light';
  });

  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const searchInputRef = useRef(null);

  // Saved / Bookmarked videos with LocalStorage persistence
  const [savedVideoIds, setSavedVideoIds] = useState(() => {
    try {
      const saved = localStorage.getItem('jindhara_saved_videos');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync theme to DOM & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('jindhara_theme', theme);
  }, [theme]);

  // Sync lang to localStorage
  useEffect(() => {
    localStorage.setItem('jindhara_lang', lang);
  }, [lang]);

  // Sync saved videos to localStorage
  useEffect(() => {
    localStorage.setItem('jindhara_saved_videos', JSON.stringify(savedVideoIds));
  }, [savedVideoIds]);

  // Scroll listener for floating back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        const videosEl = document.getElementById('videos');
        if (videosEl) {
          videosEl.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 300);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleSaveVideo = (videoId) => {
    setSavedVideoIds((prev) => {
      if (prev.includes(videoId)) {
        showToast(lang === 'hi' ? 'सहेजे गए से हटाया गया' : 'Removed from saved');
        return prev.filter((id) => id !== videoId);
      } else {
        showToast(lang === 'hi' ? 'प्रवचन सहेज लिया गया (Saved)' : 'Video bookmarked');
        return [...prev, videoId];
      }
    });
  };

  const handleOpenSaved = () => {
    setActiveCategory('saved');
    const videosEl = document.getElementById('videos');
    if (videosEl) {
      videosEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFocusSearch = () => {
    const videosEl = document.getElementById('videos');
    if (videosEl) {
      videosEl.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select top featured video
  const featuredVideo = VIDEOS_DATA.find((v) => v.id === 'nGNYiFAR24I') || VIDEOS_DATA[0];

  return (
    <div className="app-layout">
      {/* Top Header */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        theme={theme}
        setTheme={setTheme}
        savedCount={savedVideoIds.length}
        onOpenSaved={handleOpenSaved}
        onFocusSearch={handleFocusSearch}
      />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          lang={lang}
          featuredVideo={featuredVideo}
          onPlayVideo={(video) => setActiveModalVideo(video)}
        />

        {/* Video Hub Section with Search & Categories */}
        <VideoSection
          lang={lang}
          videos={VIDEOS_DATA}
          onPlayVideo={(video) => setActiveModalVideo(video)}
          onShowToast={showToast}
          savedVideoIds={savedVideoIds}
          onToggleSaveVideo={toggleSaveVideo}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchInputRef={searchInputRef}
        />

        {/* Chalisa Reader Section */}
        <ChalisaReader lang={lang} onShowToast={showToast} />

        {/* Suvichar & Navkar Mantra */}
        <SuvicharSection lang={lang} onShowToast={showToast} />

        {/* About Channel & Mission */}
        <AboutSection
          lang={lang}
          videoCount={VIDEOS_DATA.length}
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button 
          className="floating-back-top-btn animate-fade-in"
          onClick={scrollToTop}
          title={lang === 'hi' ? 'ऊपर जाएं' : 'Back to top'}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Embedded Video Modal */}
      {activeModalVideo && (
        <VideoModal
          video={activeModalVideo}
          lang={lang}
          onClose={() => setActiveModalVideo(null)}
          onShowToast={showToast}
        />
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="toast-msg animate-slide-up">
          <CheckCircle2 size={18} color="var(--gold-primary)" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
