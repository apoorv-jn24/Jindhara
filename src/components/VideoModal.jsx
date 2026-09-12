import React, { useEffect } from 'react';
import { X, Share2, ExternalLink } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';

export default function VideoModal({ video, onClose, lang, onShowToast }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(video.youtubeUrl);
    if (onShowToast) {
      onShowToast(lang === 'hi' ? 'वीडियो लिंक कॉपी हो गया!' : 'Video link copied to clipboard!');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close video player">
          <X size={20} />
        </button>

        {/* Embedded YouTube Player */}
        <div className="modal-iframe-wrap">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Modal Info & Actions */}
        <div className="modal-footer">
          <h3 className="modal-video-title">{video.title}</h3>

          <div className="modal-actions-bar">
            {/* Direct YouTube Redirection Button */}
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-yt-btn"
              title="Watch on YouTube"
            >
              <YoutubeIcon size={18} color="#FFFFFF" />
              <span>{lang === 'hi' ? 'YouTube पर पूरा देखें' : 'Watch on YouTube'}</span>
              <ExternalLink size={14} />
            </a>

            {/* Share link button */}
            <button className="modal-share-btn" onClick={handleShare}>
              <Share2 size={16} />
              <span>{lang === 'hi' ? 'लिंक शेयर करें' : 'Share Video'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
