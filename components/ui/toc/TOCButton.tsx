import React, { useState } from 'react';
import { ArrowUpToLine, Check, Files, MessageSquareText } from 'lucide-react';

const TOCButton = () => {
  const buttonStyle =
    'relative flex justify-center items-center w-9 h-9 p-2 border rounded-md cursor-pointer';
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 복사 완료 표시 사라짐
    } catch (error) {
      console.error('URL 복사 실패', error);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToComments = () => {
    const commentsSection = document.getElementById('comments');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute bottom-[-50px] flex flex-row justify-start gap-2">
      {/* Top 버튼 추가 */}
      <button onClick={handleScrollToTop} className={buttonStyle}>
        <ArrowUpToLine />
      </button>

      {/* 댓글 이동 버튼 추가 */}
      <button onClick={handleScrollToComments} className={buttonStyle}>
        <MessageSquareText />
      </button>

      {/* URL 복사 버튼 추가 */}
      <button onClick={handleCopyUrl} className={buttonStyle}>
        {/* 복사 전: Files 아이콘, 복사 후: Check 아이콘 */}
        {copied ? <Check /> : <Files />}
        {/* 복사 완료 메시지 */}
        {copied && (
          <div className="absolute top-[-30px] text-xs bg-black text-white py-1 px-2 rounded-md">
            Copied!
          </div>
        )}
      </button>
    </div>
  );
};

export default TOCButton;
