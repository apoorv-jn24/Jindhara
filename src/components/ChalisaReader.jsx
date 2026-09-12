import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles, Volume2 } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';
import { CHALISAS } from '../data/chalisaData';

export default function ChalisaReader({ lang, onShowToast }) {
  const [selectedChalisaId, setSelectedChalisaId] = useState(CHALISAS[0].id);
  const [fontSize, setFontSize] = useState('medium'); // 'small' | 'medium' | 'large'
  const [activeChaupaiIdx, setActiveChaupaiIdx] = useState(null);

  const chalisa = CHALISAS.find((c) => c.id === selectedChalisaId) || CHALISAS[0];

  const getFontSizeStyle = () => {
    switch (fontSize) {
      case 'small':
        return { fontSize: '1.02rem', lineHeight: '2' };
      case 'large':
        return { fontSize: '1.38rem', lineHeight: '2.4' };
      case 'medium':
      default:
        return { fontSize: '1.18rem', lineHeight: '2.2' };
    }
  };

  const copyChaupai = (line, idx) => {
    navigator.clipboard.writeText(`${line}\n— ${chalisa.title}`);
    setActiveChaupaiIdx(idx);
    onShowToast(lang === 'hi' ? 'पंक्ति कॉपी हो गई!' : 'Line copied to clipboard!');
    setTimeout(() => setActiveChaupaiIdx(null), 2500);
  };

  return (
    <section id="chalisa" className="chalisa-section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="section-pretitle">
              <BookOpen size={16} color="#E5A93C" />
              <span>{lang === 'hi' ? 'भक्ति एवं स्तुति' : 'Devotional Hymns'}</span>
            </div>
            <h2 className="section-title">
              {lang === 'hi' ? 'पावन चालीसा पाठ संग्रह' : 'Sacred Chalisa Reader'}
            </h2>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {lang === 'hi' ? 'जिनवाणी एवं गुरुभक्ति संग्रह' : 'Devotional collection for daily recitation'}
          </span>
        </div>

        <div className="chalisa-card">
          {/* Chalisa Selection Tabs */}
          <div className="chalisa-tabs">
            {CHALISAS.map((item) => (
              <button
                key={item.id}
                className={`chalisa-tab-btn ${item.id === chalisa.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedChalisaId(item.id);
                  setActiveChaupaiIdx(null);
                }}
              >
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          <div className="chalisa-content-wrap">
            <h3 className="chalisa-header-title">{chalisa.title}</h3>
            <p className="chalisa-header-sub">{chalisa.subtitle}</p>

            {/* Toolbar for Font Resizing and Video Link */}
            <div className="chalisa-toolbar">
              <div className="font-size-control">
                <span className="font-ctrl-label">
                  {lang === 'hi' ? 'अक्षर आकार:' : 'Font Size:'}
                </span>
                <button
                  className={`font-btn ${fontSize === 'small' ? 'active' : ''}`}
                  onClick={() => setFontSize('small')}
                >
                  अ-
                </button>
                <button
                  className={`font-btn ${fontSize === 'medium' ? 'active' : ''}`}
                  onClick={() => setFontSize('medium')}
                >
                  अ
                </button>
                <button
                  className={`font-btn ${fontSize === 'large' ? 'active' : ''}`}
                  onClick={() => setFontSize('large')}
                >
                  अ+
                </button>
              </div>

              {/* Direct Recitation Video Link on Jindhara */}
              {chalisa.audioLink && (
                <a
                  href={chalisa.audioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-card-yt"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  title="Watch / Listen recitation on YouTube"
                >
                  <YoutubeIcon size={16} color="#FF0000" />
                  <span>{lang === 'hi' ? 'चैनल पर वीडियो पाठ सुनें' : 'Listen on YouTube'}</span>
                </a>
              )}
            </div>

            {/* Chalisa Text Body */}
            <div className="chalisa-text-body" style={getFontSizeStyle()}>
              <div className="chalisa-doha">
                <span className="doha-heading">
                  ॥ दोहा ॥
                </span>
                {chalisa.doha}
              </div>

              <div className="chalisa-chaupai-list">
                <span className="doha-heading" style={{ marginBottom: '14px' }}>
                  ॥ चौपाई ॥
                </span>
                {chalisa.chaupai.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={`chalisa-chaupai-row ${activeChaupaiIdx === idx ? 'highlighted' : ''}`}
                    onClick={() => copyChaupai(line, idx)}
                    title={lang === 'hi' ? 'क्लिक करके कॉपी करें' : 'Click to copy line'}
                  >
                    <span className="chaupai-text">{line}</span>
                    <button className="chaupai-copy-btn">
                      {activeChaupaiIdx === idx ? <Check size={14} color="#E5A93C" /> : <Copy size={13} />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="chalisa-doha">
                <span className="doha-heading">
                  ॥ समापन दोहा ॥
                </span>
                {chalisa.closingDoha}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
