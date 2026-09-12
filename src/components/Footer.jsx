import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';

export default function Footer({ lang }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>🙏</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF' }}>
                जय जिनेन्द्र | Jai Jinendra
              </span>
            </div>
            <div className="footer-principles">
              ॥ परस्परोपग्रहो जीवानाम् • अहिंसा परमो धर्मः ॥
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://www.youtube.com/@Jindhara123?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="yt-subscribe-btn"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <YoutubeIcon size={16} color="#FFFFFF" />
              <span>@Jindhara123</span>
            </a>

            <button
              onClick={scrollToTop}
              className="lang-btn"
              title="ऊपर जाएं / Back to top"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <ArrowUp size={16} />
              <span>{lang === 'hi' ? 'शीर्ष पर जाएं' : 'Top'}</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} जिनधारा (Jindhara). {lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{lang === 'hi' ? 'जिनवाणी सेवा में सादर समर्पित' : 'Dedicated to the propagation of Jinwani'}</span>
            <Heart size={14} color="#E5A93C" fill="#E5A93C" />
          </div>
        </div>
      </div>
    </footer>
  );
}
