import React, { useState } from 'react';
import { Quote, Sparkles, RefreshCw, Share2, Copy, Heart, Check } from 'lucide-react';
import { SUVICHARS, NAVKAR_MANTRA } from '../data/suvicharData';

export default function SuvicharSection({ lang, onShowToast }) {
  const [suvicharIndex, setSuvicharIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentSuvichar = SUVICHARS[suvicharIndex];

  const handleNext = () => {
    setSuvicharIndex((prev) => (prev + 1) % SUVICHARS.length);
  };

  const handleCopyQuote = () => {
    const text = `"${currentSuvichar.quote}" — ${currentSuvichar.source}\n\n(जिनधारा - @Jindhara123)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast(lang === 'hi' ? 'सुविचार कॉपी हो गया!' : 'Quote copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const getWhatsAppShareUrl = () => {
    const text = `*आज का जिनवाणी सुविचार - जिनधारा (Jindhara)*\n\n"${currentSuvichar.quote}"\n\n— *${currentSuvichar.source}*\n\nजैन धर्म के पावन प्रवचनों से जुड़ने के लिए देखें YouTube पर जिनधारा:\nhttps://www.youtube.com/@Jindhara123`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="suvichar" className="spiritual-section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="section-pretitle">
              <Sparkles size={16} color="#E5A93C" />
              <span>{lang === 'hi' ? 'आध्यात्मिक प्रेरणा' : 'Spiritual Inspiration'}</span>
            </div>
            <h2 className="section-title">
              {lang === 'hi' ? 'आज का सुविचार एवं णमोकार मंत्र' : 'Jinwani Wisdom & Navkar Mantra'}
            </h2>
          </div>
        </div>

        <div className="spiritual-grid">
          {/* Suvichar Card */}
          <div className="spiritual-card">
            <div className="card-top-icon">
              <Quote size={24} />
            </div>

            <div className="suvichar-top-meta">
              <span className="badge-spiritual" style={{ fontSize: '0.75rem' }}>
                {currentSuvichar.category}
              </span>
              <span className="suvichar-counter">
                {suvicharIndex + 1} / {SUVICHARS.length}
              </span>
            </div>

            <blockquote className="suvichar-quote">
              "{currentSuvichar.quote}"
            </blockquote>

            <div className="suvichar-author">
              — {currentSuvichar.source}
            </div>

            <div className="suvichar-actions">
              <button className="btn-suvichar-next" onClick={handleNext} title="Next quote">
                <RefreshCw size={14} />
                <span>{lang === 'hi' ? 'अगला विचार' : 'Next'}</span>
              </button>

              <button className="btn-suvichar-copy" onClick={handleCopyQuote} title="Copy quote">
                {copied ? <Check size={14} color="#E5A93C" /> : <Copy size={14} />}
                <span>{copied ? (lang === 'hi' ? 'कॉपी हुआ' : 'Copied') : (lang === 'hi' ? 'कॉपी करें' : 'Copy')}</span>
              </button>

              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-share-whatsapp"
                title="Share on WhatsApp"
              >
                <Share2 size={14} />
                <span>{lang === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Navkar Mahamantra Card */}
          <div className="spiritual-card navkar-card-glow">
            <div className="card-top-icon navkar-icon-wrap">
              <Heart size={24} />
            </div>

            <h3 className="navkar-card-title">
              {NAVKAR_MANTRA.title}
            </h3>
            <p className="navkar-card-sub">
              {lang === 'hi' ? 'अनादि निधन पंच परमेष्ठी महामंत्र' : 'The Universal Jain Prayer to the Five Supreme Beings'}
            </p>

            <div className="navkar-lines">
              {NAVKAR_MANTRA.lines.map((item, idx) => (
                <div key={idx} className="navkar-line">
                  <div className="navkar-text">{item.text}</div>
                  <div className="navkar-meaning">{item.meaning}</div>
                </div>
              ))}
            </div>

            <div className="navkar-phala">
              {NAVKAR_MANTRA.phala}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
