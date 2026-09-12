import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Bookmark, Search, Share2, Check, Sun, Moon } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
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
          {/* Theme Switcher Toggle (Chandan Ivory Light / Golden Night) */}
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={
              theme === 'light' 
                ? (lang === 'hi' ? 'स्वर्ण निशा मोड चालू करें' : 'Switch to Night Theme') 
                : (lang === 'hi' ? 'दिव्य चन्दन मोड चालू करें' : 'Switch to Divine Light Theme')
            }
          >
            {theme === 'light' ? (
              <>
                <Moon size={15} color="#845305" />
                <span className="theme-toggle-text">{lang === 'hi' ? 'निशा' : 'Dark'}</span>
              </>
            ) : (
              <>
                <Sun size={15} color="#FAD074" />
                <span className="theme-toggle-text">{lang === 'hi' ? 'चन्दन' : 'Light'}</span>
              </>
            )}
          </button>

          {/* Quick Search Shortcut */}
          <button 
            className="search-shortcut-btn"
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
          >
            <Bookmark size={15} fill={savedCount > 0 ? 'var(--gold-primary)' : 'none'} />
            <span className="saved-count">{savedCount}</span>
          </button>

          {/* Language Toggle */}
          <button 
            className="lang-toggle-btn" 
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            title="भाषा बदलें / Toggle Language"
          >
            <span className="lang-code">{lang === 'hi' ? 'EN' : 'हिं'}</span>
          </button>

          {/* YouTube Subscribe Button */}
          <a 
            href="https://www.youtube.com/@Jindhara123?sub_confirmation=1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="yt-subscribe-btn"
            title="Subscribe on YouTube"
          >
            <YoutubeIcon size={17} color="#FFFFFF" />
            <span className="subscribe-text">{lang === 'hi' ? 'सब्सक्राइब' : 'Subscribe'}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-drawer-inner">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="mobile-nav-item"
              >
                {item.label}
              </button>
            ))}
            <div className="mobile-drawer-footer">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSaved();
                }}
                className="mobile-saved-btn"
              >
                <Bookmark size={16} color="var(--gold-primary)" />
                <span>{lang === 'hi' ? `सहेजे गए प्रवचन (${savedCount})` : `Saved Videos (${savedCount})`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
