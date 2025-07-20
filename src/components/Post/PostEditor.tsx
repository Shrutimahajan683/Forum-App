import React, { useRef, useState } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';
import './PostEditor.css';
import 'react-rte/lib/RichTextEditor.css';
import EmojiPicker from 'emoji-picker-react';
import PostIcon from '../../assets/icons/post_icon.svg'
import AttachFileIcon from '../../assets/icons/attachfile_icon.svg'
import RecorderIcon from '../../assets/icons/recorder_icon.svg'
import VedioCamIcon from '../../assets/icons/vediocam_icon.svg'
import { TOOLBAR_CONFIG } from '../../utils/constants.tsx';
import { notImplemeted } from '../../utils/actions.tsx';

const postEditorActionsIcons = [AttachFileIcon, RecorderIcon, VedioCamIcon];
const defaultEmoji = '😊';
const PostEditor = ({ onPublish }: { onPublish: (content: string, emoji: string) => void }) => {
  const [value, setValue] = useState<EditorValue>(
    RichTextEditor.createEmptyValue()
  );
  const [error, setError] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [emoji, setEmoji] = useState(defaultEmoji);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiData) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handlePublish = () => {
    const postContent = value.toString('html');
    const isEmpty = postContent === '' || postContent === '<p><br></p>';
    if (isEmpty) {
      setError("Please put content before publishing post");
      return;
    }
    setValue(RichTextEditor.createEmptyValue());
    setEmoji(defaultEmoji);
    onPublish(postContent, emoji);
  }

  const onChange = (newValue: EditorValue) => {
    if (error) {
      setError(null);
    }
    setValue(newValue);
  };



  return (
    <div className="editor-wrapper">
      <div className="emoji-input">
        <button onClick={() => {
          setShowEmojiPicker((prev) => {
            return !prev;
          });
        }}>
          {emoji}
        </button>

        {showEmojiPicker && (
          <div className="emoji-dropdown">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
      <div className="rte-editor">
        <RichTextEditor
          value={value}
          onChange={onChange}
          placeholder="Start writing here..."
          toolbarConfig={TOOLBAR_CONFIG}
        />
      </div>
      <div className="editor-footer-actions">
        <div className="action-bar">
          {postEditorActionsIcons.map((actionIcon, index) => <img src={actionIcon} alt="actions icon" className="post-icon" onClick={notImplemeted} />)}
        </div>
        <img src={PostIcon} alt="Post Icon" className="post-icon" onClick={handlePublish} />
      </div>
      {error && <span className="empty-post-error">{error}</span>}
    </div>
  );
};

export default PostEditor;
