import React, { useRef, useState } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';
import './PostEditor.css';
import 'react-rte/lib/RichTextEditor.css';
import EmojiPicker from 'emoji-picker-react';
import PostIcon from '../../assets/icons/post_icon.svg'
import AttachFileIcon from '../../assets/icons/attachfile_icon.svg'
import { TOOLBAR_CONFIG } from '../../utils/constants.tsx';

const PostEditor = ({ onPublish }: { onPublish: (content: string, attachments: File[], emoji: string) => void }) => {
  const [value, setValue] = useState<EditorValue>(
    RichTextEditor.createEmptyValue()
  );
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [emoji, setEmoji] = useState('😊');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiData) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handlePublish = () => {
    const postContent = value.toString('html').replace(/^<p>|<\/p>$/g, '');
    onPublish(postContent, attachments, emoji);
  }

  const onChange = (newValue: EditorValue) => {
    setValue(newValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE_MB = 5;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      const validFiles: File[] = [];

      files.forEach((file: File) => {
        const isPNG = file.type === 'image/png';
        const isSizeOK = file.size <= MAX_FILE_SIZE_BYTES;

        if (!isPNG) {
          alert(`${file.name} is not a PNG file.`);
          return;
        }

        if (!isSizeOK) {
          alert(`${file.name} exceeds the ${MAX_FILE_SIZE_MB}MB limit.`);
          return;
        }

        validFiles.push(file);
      });

      if (validFiles.length > 0) {
        setAttachments((prev) => [...prev, ...validFiles]);
      }
    }
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
          <img src={AttachFileIcon} alt="Attach File Icon" className="post-icon" onClick={() => fileInputRef.current?.click()} title="Attach file" />
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
          <input
            type="file"
            accept="video/*"
            ref={videoInputRef}
            onChange={handleFileChange}
            hidden
          />
        </div>
        <img src={PostIcon} alt="Post Icon" className="post-icon" onClick={handlePublish} />
      </div>

      {attachments.length > 0 && (
        <div className="attachment-preview">
          {attachments.map((file, index) => (
            <span key={index} className="file-chip">{file.name}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostEditor;
