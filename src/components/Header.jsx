import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Bookmark, Search, Share2, Check, Sun, Moon, Globe } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'videos', label: lang === 'hi' ? 'वीडियो लाइब्रेरी' : 'Videos' },
    { id: 'chalisa', label: lang === 'hi' ? 'चालीसा संग्रह' : 'Chalisa' },
    { id: 'suvichar', label: lang === 'hi' ? 'जिनवाणी सुविचार' : 'Daily Suvichar' },
    { id: 'about', label: lang === 'hi' ? 'चैनल परिचय' : 'About' }
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
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

        {/* Desktop Navigation */}
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

        {/* Header Actions */}
        <div className="header-actions">
          {/* Theme Switcher Toggle */}
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={
              theme === 'light' 
                ? (lang === 'hi' ? 'स्वर्ण निशा मोड चालू करें' : 'Switch to Night Theme') 
                : (lang === 'hi' ? 'दिव्य चन्दन मोड चालू करें' : 'Switch to Divine Light Theme')
            }
            aria-label="Toggle light or dark theme"
          >
            {theme === 'light' ? (
              <>
                <Moon size={15} color="#845305" />
                <span className="theme-toggle-text hide-on-xs">{lang === 'hi' ? 'निशा' : 'Dark'}</span>
              </>
            ) : (
              <>
                <Sun size={15} color="#FAD074" />
                <span className="theme-toggle-text hide-on-xs">{lang === 'hi' ? 'चन्दन' : 'Light'}</span>
              </>
            )}
          </button>

          {/* Quick Search Shortcut (Desktop/Tablet) */}
          <button 
            className="search-shortcut-btn hide-on-mobile"
            onClick={onFocusSearch}
            title={lang === 'hi' ? 'खोजें (प्रेस /)' : 'Search videos (Press /)'}
          >
            <Search size={15} />
            <span className="kbd-hint">/</span>
          </button>

          {/* Bookmarks Counter */}
          <button 
            className={`saved-badge-btn ${savedCount > 0 ? 'has-saved' : ''}`}
            onClick={onOpenSaved}
            title={lang === 'hi' ? 'सहेजे गए प्रवचन' : 'Saved Pravachans'}
            aria-label="Saved videos"
          >
            <Bookmark size={15} fill={savedCount > 0 ? 'var(--gold-primary)' : 'none'} />
            <span className="saved-count">{savedCount}</span>
          </button>

          {/* Language Toggle (Desktop/Tablet) */}
          <button 
            className="lang-toggle-btn hide-on-mobile" 
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            title="भाषा बदलें / Toggle Language"
          >
            <span className="lang-code">{lang === 'hi' ? 'EN' : 'हिं'}</span>
          </button>

          {/* YouTube Subscribe Button (Desktop/Tablet) */}
          <a 
            href="https://www.youtube.com/@Jindhara123?sub_confirmation=1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="yt-subscribe-btn hide-on-mobile"
            title="Subscribe on YouTube"
          >
            <YoutubeIcon size={16} color="#FFFFFF" />
            <span className="subscribe-text">{lang === 'hi' ? 'सब्सक्राइब' : 'Subscribe'}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-drawer-inner">
            {/* Mobile Nav Links */}
            <div className="mobile-nav-links-list">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="mobile-nav-item"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Quick Action Buttons Bar */}
            <div className="mobile-drawer-actions">
              {/* Language Switch */}
              <button 
                onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
                className="mobile-action-pill"
              >
                <Globe size={15} />
                <span>{lang === 'hi' ? 'English में बदलें' : 'हिंदी में बदलें'}</span>
              </button>

              {/* Quick Search trigger */}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onFocusSearch();
                }}
                className="mobile-action-pill"
              >
                <Search size={15} />
                <span>{lang === 'hi' ? 'वीडियो खोजें' : 'Search Videos'}</span>
              </button>
            </div>

            {/* Mobile YouTube Subscribe Banner */}
            <a 
              href="https://www.youtube.com/@Jindhara123?sub_confirmation=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="yt-subscribe-btn mobile-yt-subscribe"
            >
              <YoutubeIcon size={18} color="#FFFFFF" />
              <span>{lang === 'hi' ? 'YouTube पर सब्सक्राइब करें' : 'Subscribe on YouTube'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
