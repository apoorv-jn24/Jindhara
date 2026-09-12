import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, X, Play, ExternalLink, ArrowUpDown, LayoutGrid, 
  List, Bookmark, Share2, Copy, Sparkles, Filter 
} from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';
import { CATEGORIES } from '../data/videosData';

export default function VideoSection({ 
  lang, 
  videos, 
  onPlayVideo, 
  onShowToast, 
  savedVideoIds, 
  onToggleSaveVideo,
  activeCategory,
  setActiveCategory,
  searchInputRef
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'popular'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts = {
      all: videos.length,
      saved: savedVideoIds.length,
      pravachan: 0,
      bhakti: 0,
      vidhan: 0,
      tirth: 0,
      motivational: 0
    };
    videos.forEach((v) => {
      if (counts[v.category] !== undefined) {
        counts[v.category]++;
      }
    });
    return counts;
  }, [videos, savedVideoIds]);

  const categoryList = [
    { id: 'all', label: CATEGORIES.all[lang], count: categoryCounts.all },
    { id: 'saved', label: lang === 'hi' ? 'सहेजे गए' : 'Saved', count: categoryCounts.saved, isSaved: true },
    { id: 'pravachan', label: CATEGORIES.pravachan[lang], count: categoryCounts.pravachan },
    { id: 'bhakti', label: CATEGORIES.bhakti[lang], count: categoryCounts.bhakti },
    { id: 'vidhan', label: CATEGORIES.vidhan[lang], count: categoryCounts.vidhan },
    { id: 'tirth', label: CATEGORIES.tirth[lang], count: categoryCounts.tirth },
    { id: 'motivational', label: CATEGORIES.motivational[lang], count: categoryCounts.motivational },
  ];

  // Filtering and Sorting
  const filteredVideos = useMemo(() => {
    let result = [...videos];

    // Filter by Category
    if (activeCategory === 'saved') {
      result = result.filter((v) => savedVideoIds.includes(v.id));
    } else if (activeCategory !== 'all') {
      result = result.filter((v) => v.category === activeCategory);
    }

    // Filter by Search Query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          (v.meta && v.meta.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'popular') {
      result.sort((a, b) => {
        const getViews = (meta) => {
          if (!meta) return 0;
          if (meta.includes('10K')) return 10000;
          if (meta.includes('1.9K')) return 1900;
          if (meta.includes('1.7K')) return 1700;
          const match = meta.match(/(\d+)/);
          return match ? parseInt(match[1], 10) : 0;
        };
        return getViews(b.meta) - getViews(a.meta);
      });
    }

    return result;
  }, [videos, activeCategory, savedVideoIds, searchTerm, sortBy]);

  const getCategoryLabel = (catId) => {
    return CATEGORIES[catId] ? CATEGORIES[catId][lang] : catId;
  };

  const handleShareVideo = (e, video) => {
    e.stopPropagation();
    navigator.clipboard.writeText(video.youtubeUrl);
    onShowToast(lang === 'hi' ? 'वीडियो लिंक कॉपी हो गया!' : 'Video link copied to clipboard!');
  };

  const handleWhatsAppShare = (e, video) => {
    e.stopPropagation();
    const text = `*${video.title}*\n\nYouTube पर जिनधारा चैनल का यह पावन वीडियो अवश्य देखें:\n${video.youtubeUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="videos" className="video-hub-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div className="section-pretitle">
              <YoutubeIcon size={16} color="#FF0000" />
              <span>{lang === 'hi' ? 'समस्त वीडियो संग्रह' : 'Video Library'}</span>
            </div>
            <h2 className="section-title">
              {lang === 'hi' ? 'जिनधारा वीडियो गैलरी' : 'Jindhara Video Archive'}
            </h2>
          </div>

          <div className="section-header-controls">
            {/* View Mode Toggle */}
            <div className="view-mode-toggle" role="group" aria-label="View mode">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={15} />
              </button>
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortBy(sortBy === 'latest' ? 'popular' : 'latest')}
              className="sort-dropdown-btn"
              title="Change sort order"
            >
              <ArrowUpDown size={14} />
              <span>
                {sortBy === 'latest'
                  ? (lang === 'hi' ? 'नवीनतम' : 'Latest')
                  : (lang === 'hi' ? 'सर्वाधिक लोकप्रिय' : 'Most Popular')}
              </span>
            </button>
          </div>
        </div>

        {/* Video Hub Search & Filter Bar */}
        <div className="video-hub-controls">
          <div className="search-bar-wrap">
            <Search className="search-icon" size={17} />
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder={
                lang === 'hi'
                  ? 'वीडियो खोजें... (उदा: विद्यासागर जी, चालीसा, सरूरपुर, पंचकल्याणक) [प्रेस /]'
                  : 'Search discourses, chalisas, events, acharyas... [Press /]'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills with counts */}
          <div className="filter-categories-wrap">
            {categoryList.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill ${activeCategory === cat.id ? 'active' : ''} ${cat.isSaved ? 'saved-pill' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.isSaved && <Bookmark size={13} style={{ marginRight: '4px', verticalAlign: '-1px' }} />}
                <span>{cat.label}</span>
                <span className="cat-count-badge">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Status Bar */}
          <div className="video-status-bar">
            <span>
              {lang === 'hi'
                ? `कुल ${filteredVideos.length} वीडियो उपलब्ध हैं`
                : `Showing ${filteredVideos.length} videos`}
            </span>
            {(searchTerm || activeCategory !== 'all') && (
              <button
                className="reset-filters-inline-btn"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                {lang === 'hi' ? 'फ़िल्टर हटाएं' : 'Clear Filters'}
              </button>
            )}
          </div>
        </div>

        {/* Videos Container: Grid or List */}
        {filteredVideos.length === 0 ? (
          <div className="empty-state-card">
            <p className="empty-state-title">
              {activeCategory === 'saved'
                ? (lang === 'hi' ? 'अभी तक कोई प्रवचन सहेजा नहीं गया है।' : 'No saved pravachans yet.')
                : (lang === 'hi' ? 'कोई वीडियो नहीं मिला' : 'No videos matched your criteria')}
            </p>
            <p className="empty-state-subtitle">
              {activeCategory === 'saved'
                ? (lang === 'hi' ? 'किसी भी वीडियो कार्ड पर बुकमार्क आइकन दबाकर उसे यहाँ सहेजें।' : 'Click the bookmark icon on any video card to save it here for later.')
                : (lang === 'hi' ? 'कृपया अन्य शब्द खोजें या फ़िल्टर रीसेट करें।' : 'Try searching different terms or clear active filters.')}
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              style={{ marginTop: '16px' }}
            >
              {lang === 'hi' ? 'सभी वीडियो देखें' : 'View All Videos'}
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'videos-grid' : 'videos-list'}>
            {filteredVideos.map((video) => {
              const isSaved = savedVideoIds.includes(video.id);

              return (
                <article key={video.id} className={`video-card ${viewMode === 'list' ? 'video-card-list' : ''}`}>
                  {/* Thumbnail Container */}
                  <div
                    className="video-thumb-container"
                    onClick={() => {
                      window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
                    }}
                    title={lang === 'hi' ? 'YouTube पर देखने के लिए क्लिक करें' : 'Click to watch directly on YouTube'}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="video-thumb-img"
                      loading="lazy"
                    />
                    <span className="video-category-tag">
                      {getCategoryLabel(video.category)}
                    </span>

                    {/* Bookmark Button Floating on Thumbnail */}
                    <button
                      className={`thumb-bookmark-btn ${isSaved ? 'is-bookmarked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveVideo(video.id);
                      }}
                      title={isSaved ? (lang === 'hi' ? 'सहेजे गए से हटाएं' : 'Remove bookmark') : (lang === 'hi' ? 'प्रवचन सहेजें' : 'Bookmark video')}
                    >
                      <Bookmark size={15} fill={isSaved ? '#E5A93C' : 'none'} />
                    </button>

                    {/* Hover Play Button */}
                    <div className="video-thumb-hover-overlay">
                      <div className="mini-play-icon" title="Watch on YouTube">
                        <Play size={18} fill="#0F1318" style={{ marginLeft: '2px' }} />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="video-body">
                    <div className="video-title-wrap">
                      <h3
                        className="video-title"
                        onClick={() => {
                          window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
                        }}
                        title={video.title}
                      >
                        {video.title}
                      </h3>
                    </div>

                    <div className="video-meta-row">
                      <span className="video-meta-tag">{video.meta || (lang === 'hi' ? 'प्रवचन' : 'Video')}</span>
                      
                      {/* Social Micro Action Buttons */}
                      <div className="video-micro-actions">
                        <button 
                          className="micro-action-btn"
                          onClick={(e) => handleShareVideo(e, video)}
                          title="Copy Link"
                        >
                          <Copy size={13} />
                        </button>
                        <button 
                          className="micro-action-btn whatsapp"
                          onClick={(e) => handleWhatsAppShare(e, video)}
                          title="Share on WhatsApp"
                        >
                          <Share2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Actions: Direct YouTube + In-Site Player */}
                    <div className="video-action-row">
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-card-yt"
                        title={lang === 'hi' ? 'सीधे YouTube पर देखें' : 'Watch directly on YouTube'}
                      >
                        <YoutubeIcon size={15} color="#FF0000" />
                        <span>{lang === 'hi' ? 'YouTube पर खोलें' : 'On YouTube'}</span>
                        <ExternalLink size={12} />
                      </a>

                      <button
                        className="btn-card-modal"
                        onClick={() => onPlayVideo(video)}
                        title={lang === 'hi' ? 'यहीं वेबसाइट पर देखें' : 'Quick View in Modal'}
                      >
                        <Play size={13} />
                        <span>{lang === 'hi' ? 'यहाँ चलाएं' : 'Quick View'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
