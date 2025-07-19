import React from 'react';
import './PostCard.css'
import { getRelativeTime } from "../../utils/date.tsx";

interface Props {
  author: string;
  text: string;
  emoji: string;
  content: string;
  imageUrl: string;
  timestamp: number;
}

export default function PostCard({ author, text, emoji, content, imageUrl, timestamp }: Props) {
  return (
    <div className="post-card">
      <div className="post-data-section">
        <div className="post-header">
          <img src={imageUrl} alt="author" className="author-image" />
          <div className="author-info">
            <strong>{author}</strong>
            <span className="timestamp">{getRelativeTime(timestamp)}</span>
          </div>
        </div>
        <div className="post-body">
          <div className="post-content">
            <span className="emoji">{emoji}</span>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
