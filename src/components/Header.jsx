import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sparkles, Bookmark, Search, Share2, 
  Check, Sun, Moon, Globe, Video, BookOpen, Heart, Info, ExternalLink 
} from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';

export default function Header({ 
  lang, 
  setLang, 
  theme, 
  setTheme, 
  savedCount, 
  onOpenSaved, 
  onFocusSearch 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for compact sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { 
      id: 'videos', 
      label: lang === 'hi' ? 'वीडियो लाइब्रेरी' : 'Video Library',
      icon: Video
    },
    { 
      id: 'chalisa', 
      label: lang === 'hi' ? 'चालीसा संग्रह' : 'Chalisa & Stuti',
      icon: BookOpen
    },
    { 
      id: 'suvichar', 
      label: lang === 'hi' ? 'जिनवाणी सुविचार' : 'Daily Suvichar',
      icon: Sparkles
    },
    { 
      id: 'about', 
      label: lang === 'hi' ? 'चैनल परिचय' : 'About Jindhara',
      icon: Info
    }
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    // Allow drawer to dismiss and body scroll lock to release
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -76;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 60);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Brand Group */}
          <a 
            href="#" 
            className="brand-group" 
            onClick={(e) => { 
              e.preventDefault(); 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }}
          >
            <div className="brand-avatar-wrap">
              <img 
                src="https://yt3.googleusercontent.com/Xl1k5yVcLCSkmbG0IWKOy5PRD3RriHD9VlGNelF6kHzlxAIy7ZXtGJETdhnhnzwdUNg_y1Y-e_w=s900-c-k-c0x00ffffff-no-rj" 
                alt="Jindhara Logo" 
                className="brand-avatar"
              />
              <span className="live-indicator-dot" title="Channel Active" />
            </div>
            <div className="brand-meta">
              <div className="brand-title">
                जिनधारा <span className="brand-badge-en">Jindhara</span>
              </div>
              <div className="brand-subline">
                <span className="brand-handle">@Jindhara123</span>
                <span className="status-pill">
                  <span className="status-dot"></span>
                  Official
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item.id)}
                    className="nav-link-btn"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Controls */}
          <div className="header-actions">
            {/* Quick Search Button (Accessible on both Mobile & Desktop) */}
            <button 
              className="search-shortcut-btn"
              onClick={onFocusSearch}
              title={lang === 'hi' ? 'खोजें (प्रेस /)' : 'Search videos (Press /)'}
              aria-label="Search videos"
            >
              <Search size={16} />
              <span className="kbd-hint desktop-only">/</span>
            </button>

            {/* Theme Toggle Button (Visible on all devices) */}
            <button 
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={
                theme === 'light' 
                  ? (lang === 'hi' ? 'स्वर्ण निशा मोड' : 'Dark Mode') 
                  : (lang === 'hi' ? 'दिव्य चन्दन मोड' : 'Light Mode')
              }
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={16} color="#845305" />
                  <span className="theme-toggle-text desktop-only">{lang === 'hi' ? 'निशा' : 'Dark'}</span>
                </>
              ) : (
                <>
                  <Sun size={16} color="#FAD074" />
                  <span className="theme-toggle-text desktop-only">{lang === 'hi' ? 'चन्दन' : 'Light'}</span>
                </>
              )}
            </button>

            {/* Bookmarks Counter (Desktop Only) */}
            <button 
              className={`saved-badge-btn desktop-only ${savedCount > 0 ? 'has-saved' : ''}`}
              onClick={onOpenSaved}
              title={lang === 'hi' ? 'सहेजे गए प्रवचन' : 'Saved Pravachans'}
            >
              <Bookmark size={15} fill={savedCount > 0 ? 'var(--gold-primary)' : 'none'} />
              <span className="saved-count">{savedCount}</span>
            </button>

            {/* Language Toggle (Desktop Only) */}
            <button 
              className="lang-toggle-btn desktop-only" 
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              title="भाषा बदलें / Toggle Language"
            >
              <span className="lang-code">{lang === 'hi' ? 'EN' : 'हिं'}</span>
            </button>

            {/* YouTube Subscribe Button (Desktop Only) */}
            <a 
              href="https://www.youtube.com/@Jindhara123?sub_confirmation=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="yt-subscribe-btn desktop-only"
              title="Subscribe on YouTube"
            >
              <YoutubeIcon size={16} color="#FFFFFF" />
              <span className="subscribe-text">{lang === 'hi' ? 'सब्सक्राइब' : 'Subscribe'}</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer & Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="mobile-nav-modal animate-slide-left" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drawer Top Bar */}
            <div className="mobile-modal-header">
              <div className="mobile-brand-wrap">
                <img 
                  src="https://yt3.googleusercontent.com/Xl1k5yVcLCSkmbG0IWKOy5PRD3RriHD9VlGNelF6kHzlxAIy7ZXtGJETdhnhnzwdUNg_y1Y-e_w=s900-c-k-c0x00ffffff-no-rj" 
                  alt="Jindhara Logo" 
                  className="mobile-brand-avatar"
                />
                <div>
                  <div className="mobile-brand-name">जिनधारा (Jindhara)</div>
                  <div className="mobile-brand-handle">@Jindhara123</div>
                </div>
              </div>

              <button 
                className="mobile-modal-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="mobile-modal-body">
              <div className="mobile-nav-group-title">
                {lang === 'hi' ? 'मुख्य पृष्ठ' : 'Navigation'}
              </div>

              <div className="mobile-links-list">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="mobile-link-row"
                    >
                      <span className="mobile-link-icon-wrap">
                        <Icon size={18} />
                      </span>
                      <span className="mobile-link-text">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Quick Action Cards */}
              <div className="mobile-nav-group-title" style={{ marginTop: '20px' }}>
                {lang === 'hi' ? 'त्वरित सुविधाएं' : 'Quick Actions'}
              </div>

              <div className="mobile-tools-grid">
                {/* Saved Videos Card */}
                <button 
                  className="mobile-tool-card"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSaved();
                  }}
                >
                  <Bookmark size={18} color="var(--gold-primary)" fill={savedCount > 0 ? "var(--gold-primary)" : "none"} />
                  <div className="mobile-tool-text">
                    <span className="mobile-tool-main">{lang === 'hi' ? 'सहेजे गए प्रवचन' : 'Saved Pravachans'}</span>
                    <span className="mobile-tool-sub">{savedCount} {lang === 'hi' ? 'वीडियो' : 'videos'}</span>
                  </div>
                </button>

                {/* Video Search Trigger */}
                <button 
                  className="mobile-tool-card"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onFocusSearch();
                  }}
                >
                  <Search size={18} color="var(--gold-primary)" />
                  <div className="mobile-tool-text">
                    <span className="mobile-tool-main">{lang === 'hi' ? 'वीडियो खोजें' : 'Search Videos'}</span>
                    <span className="mobile-tool-sub">{lang === 'hi' ? 'खोज बॉक्स खोलें' : 'Filter by keywords'}</span>
                  </div>
                </button>

                {/* Language Switcher */}
                <button 
                  className="mobile-tool-card"
                  onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
                >
                  <Globe size={18} color="var(--gold-primary)" />
                  <div className="mobile-tool-text">
                    <span className="mobile-tool-main">{lang === 'hi' ? 'Switch to English' : 'हिंदी भाषा चुनें'}</span>
                    <span className="mobile-tool-sub">{lang === 'hi' ? 'वर्तमान: हिंदी' : 'Current: English'}</span>
                  </div>
                </button>

                {/* Theme Switcher in Drawer */}
                <button 
                  className="mobile-tool-card"
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? <Moon size={18} color="var(--gold-primary)" /> : <Sun size={18} color="var(--gold-primary)" />}
                  <div className="mobile-tool-text">
                    <span className="mobile-tool-main">{theme === 'light' ? (lang === 'hi' ? 'स्वर्ण निशा रूप' : 'Dark Mode') : (lang === 'hi' ? 'दिव्य चन्दन रूप' : 'Light Mode')}</span>
                    <span className="mobile-tool-sub">{theme === 'light' ? (lang === 'hi' ? 'रात्रि पठन हेतु' : 'For night time') : (lang === 'hi' ? 'उज्ज्वल मंदिर रूप' : 'Temple ivory')}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Drawer Footer with direct YouTube Subscribe CTA */}
            <div className="mobile-modal-footer">
              <a 
                href="https://www.youtube.com/@Jindhara123?sub_confirmation=1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="yt-subscribe-btn mobile-yt-banner-btn"
              >
                <YoutubeIcon size={20} color="#FFFFFF" />
                <span>{lang === 'hi' ? 'YouTube पर सब्सक्राइब करें' : 'Subscribe on YouTube'}</span>
                <ExternalLink size={15} style={{ marginLeft: 'auto', opacity: 0.8 }} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
