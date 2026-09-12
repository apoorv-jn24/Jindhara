import React from 'react';
import { Heart } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';

export default function AboutSection({ lang, videoCount, onShowToast }) {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left: About details */}
          <div className="about-text">
            <span className="badge-spiritual" style={{ marginBottom: '14px' }}>
              <Heart size={14} color="#E5A93C" />
              {lang === 'hi' ? 'हमारा संकल्प' : 'Our Sacred Mission'}
            </span>

            <h3>
              {lang === 'hi' ? 'जिनधारा का पावन उद्देश्य' : 'The Story of Jindhara'}
            </h3>

            <p>
              {lang === 'hi'
                ? "जिनधारा एक समर्पित धार्मिक और आध्यात्मिक यूट्यूब चैनल है जिसका उद्देश्य वीतराग जिनशासन, पूज्य दिगंबर मुनिराजों, आचार्यों एवं आर्यिका माताओं के अमृत प्रवचनों को प्रत्येक भक्त और जिज्ञासु तक पहुँचाना है।"
                : "Jindhara is a dedicated devotional YouTube channel committed to broadcasting the pure wisdom of Jain Dharma, uplifting pravachans of revered Digambar Acharyas, Muniraj, and Aryika Sangh."}
            </p>

            <p>
              {lang === 'hi'
                ? "चैनल पर विभिन्न पावन तीर्थ क्षेत्रों (जैसे सरूरपुर कलां बागपत, मेरठ, जयपुर, गिरनार जी) के विधान, मंगल कलश स्थापना, पंचकल्याणक महोत्सव एवं जीवन निर्माणकारी प्रेरक विचारों को साझा किया जाता है।"
                : "From sacred Tirth kshetras (including Saroorpur Kalan, Meerut, Jaipur, Girnar) to Panchkalyanak mahotsavs and practical moral guidance, Jindhara preserves and shares these timeless spiritual treasures."}
            </p>

            {/* Quick Stats */}
            <div className="channel-stats-row">
              <div className="stat-box">
                <div className="stat-number">{videoCount}+</div>
                <div className="stat-label">{lang === 'hi' ? 'वीडियो उपलब्ध' : 'Videos Cataloged'}</div>
              </div>

              <div className="stat-box">
                <div className="stat-number">10K+</div>
                <div className="stat-label">{lang === 'hi' ? 'शीर्ष प्रवचन दर्शक' : 'Top Video Views'}</div>
              </div>

              <div className="stat-box">
                <div className="stat-number">100%</div>
                <div className="stat-label">{lang === 'hi' ? 'निशुल्क जिनवाणी' : 'Devotional Access'}</div>
              </div>
            </div>
          </div>

          {/* Right: Channel Profile Card */}
          <div className="about-card-banner">
            <div className="big-avatar-wrap">
              <img
                src="https://yt3.googleusercontent.com/Xl1k5yVcLCSkmbG0IWKOy5PRD3RriHD9VlGNelF6kHzlxAIy7ZXtGJETdhnhnzwdUNg_y1Y-e_w=s900-c-k-c0x00ffffff-no-rj"
                alt="Jindhara Official Avatar"
                className="big-avatar"
              />
            </div>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '4px' }}>
              जिनधारा (Jindhara)
            </h4>
            <p style={{ color: 'var(--gold-light)', fontSize: '0.9rem', marginBottom: '16px' }}>
              @Jindhara123
            </p>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
              {lang === 'hi'
                ? "यह चैनल धार्मिक चैनल है इस पर जैन धर्म संबंधी एवं मोटिवेशनल वीडियो धार्मिक वीडियो प्रवचन आदि उपलब्ध हैं।"
                : "A sacred channel featuring Jain Dharma discourses, motivational episodes, and spiritual events."}
            </p>

            <a
              href="https://www.youtube.com/@Jindhara123?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="yt-subscribe-btn"
              style={{ display: 'inline-flex', padding: '12px 28px', fontSize: '1rem' }}
            >
              <YoutubeIcon size={20} color="#FFFFFF" />
              <span>{lang === 'hi' ? 'YouTube पर सब्सक्राइब करें' : 'Subscribe on YouTube'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
