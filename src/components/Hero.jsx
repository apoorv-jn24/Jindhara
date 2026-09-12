import React from 'react';
import { Play, Sparkles, Compass, Flame, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';

export default function Hero({ lang, featuredVideo, onPlayVideo }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-card">
          {/* Background Ambient Glow */}
          <div className="hero-ambient-glow" />

          {/* Left Column: Mission & Highlights */}
          <div className="hero-content">
            <div className="hero-badge-row">
              <span className="badge-spiritual">
                <ShieldCheck size={14} className="badge-icon-gold" />
                {lang === 'hi' ? 'आधिकारिक जैन आध्यात्मिक मंच' : 'Official Jain Spiritual Portal'}
              </span>
              <span className="badge-spiritual badge-accent">
                <Flame size={14} className="badge-icon-saffron" />
                {lang === 'hi' ? '30+ प्रवचन एवं भक्ति वीडियो' : '30+ Discourses & Bhakti'}
              </span>
            </div>

            <h2 className="hero-headline">
              {lang === 'hi' ? (
                <>
                  जिनवाणी, आध्यात्मिक प्रवचन एवं <span className="text-gradient-gold">भक्ति का पावन संगम</span>
                </>
              ) : (
                <>
                  Sacred Stream of <span className="text-gradient-gold">Jain Wisdom & Devotion</span>
                </>
              )}
            </h2>

            <p className="hero-desc">
              {lang === 'hi'
                ? "पूज्य दिगंबर आचार्यश्री, मुनिराजों एवं आर्यिका संघ के मंगल प्रवचन, पंचकल्याणक महोत्सव, अतिशय क्षेत्र दर्शन, भक्ति, चालीसा एवं जीवनोपयोगी प्रेरक विचारों का विश्वसनीय केंद्र।"
                : "A sacred sanctuary broadcasting authentic Jain pravachans, Panchkalyanak mahotsavs, Atishay Kshetra darshan, divine chalisas, and uplifting spiritual wisdom."}
            </p>

            {/* Quick Channel Stats Pills */}
            <div className="hero-stats-strip">
              <div className="stat-pill">
                <span className="stat-pill-val">30+</span>
                <span className="stat-pill-lbl">{lang === 'hi' ? 'प्रवचन वीडियो' : 'Videos'}</span>
              </div>
              <div className="stat-pill-divider" />
              <div className="stat-pill">
                <span className="stat-pill-val">10K+</span>
                <span className="stat-pill-lbl">{lang === 'hi' ? 'शीर्ष दर्शक' : 'Peak Views'}</span>
              </div>
              <div className="stat-pill-divider" />
              <div className="stat-pill">
                <span className="stat-pill-val">HD</span>
                <span className="stat-pill-lbl">{lang === 'hi' ? 'उच्च गुणवत्ता' : '1080p Quality'}</span>
              </div>
            </div>

            <div className="hero-buttons">
              <a 
                href="#videos" 
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Compass size={18} />
                <span>{lang === 'hi' ? 'वीडियो लाइब्रेरी देखें' : 'Explore Videos'}</span>
              </a>

              <a 
                href="https://www.youtube.com/@Jindhara123?sub_confirmation=1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary"
              >
                <YoutubeIcon size={18} color="#FF0000" />
                <span>{lang === 'hi' ? 'चैनल से जुड़ें' : 'Join on YouTube'}</span>
                <ExternalLink size={14} style={{ opacity: 0.7 }} />
              </a>
            </div>
          </div>

          {/* Right Column: Featured Spotlight Card */}
          {featuredVideo && (
            <div className="hero-spotlight">
              <div className="spotlight-card">
                <div 
                  className="spotlight-thumb-wrap" 
                  onClick={() => window.open(featuredVideo.youtubeUrl, '_blank', 'noopener,noreferrer')}
                  title={lang === 'hi' ? 'YouTube पर देखने के लिए क्लिक करें' : 'Click to watch on YouTube'}
                >
                  <img 
                    src={featuredVideo.thumbnail} 
                    alt={featuredVideo.title} 
                    className="spotlight-thumb"
                  />
                  <div className="play-overlay-btn">
                    <div className="play-circle">
                      <Play size={22} fill="#0E121A" style={{ marginLeft: '2px' }} />
                    </div>
                  </div>
                  <span className="spotlight-badge-floating">
                    {lang === 'hi' ? 'शीर्ष प्रवचन' : 'Featured Video'}
                  </span>
                </div>

                <div className="spotlight-info">
                  <div className="spotlight-meta-row">
                    <span className="spotlight-category-chip">
                      {lang === 'hi' ? 'प्रवचन' : 'Pravachan'}
                    </span>
                    <span className="spotlight-views-text">
                      {featuredVideo.meta}
                    </span>
                  </div>

                  <h3 
                    className="spotlight-title" 
                    onClick={() => window.open(featuredVideo.youtubeUrl, '_blank', 'noopener,noreferrer')}
                  >
                    {featuredVideo.title}
                  </h3>

                  <div className="spotlight-action-row">
                    <a 
                      href={featuredVideo.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-yt-direct"
                      title="Watch directly on YouTube"
                    >
                      <YoutubeIcon size={14} color="#FF0000" />
                      <span>{lang === 'hi' ? 'YouTube पर देखें' : 'Watch on YouTube'}</span>
                      <ExternalLink size={12} />
                    </a>

                    <button
                      className="btn-card-modal"
                      onClick={() => onPlayVideo(featuredVideo)}
                      style={{ padding: '6px 12px' }}
                      title="Quick view in popup"
                    >
                      <Play size={13} />
                      <span>{lang === 'hi' ? 'त्वरित चलाएं' : 'Quick Play'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
