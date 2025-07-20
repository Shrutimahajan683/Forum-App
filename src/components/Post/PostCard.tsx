import React from 'react';
import './PostCard.css'
import { getRelativeTime } from "../../utils/date.tsx";
import { DEFAULT_PROFILE_IMAGE_URL } from '../../utils/constants.tsx';
import PostHeartIcon from '../../assets/icons/heart_icon.svg'
import PostCommentIcon from '../../assets/icons/comment_icon.svg'
import PostShareIcon from '../../assets/icons/share_icon.svg'
import { notImplemeted } from '../../utils/actions.tsx';

interface Props {
  author: string;
  text: string;
  emoji: string;
  content: string;
  imageUrl: string;
  timestamp: number;
}

const postActionIcons = [PostHeartIcon, PostCommentIcon, PostShareIcon];
export default function PostCard({ author, text, emoji, content, imageUrl, timestamp }: Props) {
  console.log(author, content, imageUrl);
  return (
    <div className="card-container">
      <div className="post-card">
        <div className="post-data-section">
          <div className="post-header">
            <img src={imageUrl || DEFAULT_PROFILE_IMAGE_URL} alt="author" className="author-image" />
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
      <div className="post-actions">
        {postActionIcons.map((postAction, index) =>
          <img src={postAction} alt="heart-icon" key={`post-action-${index}`} className="post-action-icon" onClick={notImplemeted} />
        )}
      </div>
    </div>
  );
}
