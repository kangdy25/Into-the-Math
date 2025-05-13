import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import BlockMath from './components/posts/BlockMath';
import Toggle from './components/posts/Toggle';
import Callout from './components/posts/Callout';
import { JSX, ReactNode } from 'react';

// TOC를 위한 ID 생성을 위한 함수
const createHeadingId = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children
      .toLowerCase()
      .replace(/\s+/g, '-') // 공백을 하이픈으로 변환
      .replace(/[?!.,]/g, ''); // 특수문자 제거
  }

  // children이 복잡한 React 노드인 경우 (예: 강조, 링크 등이 포함된 경우)
  // toString을 시도하고 실패하면 빈 문자열 반환
  try {
    return (children as string)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[?!.,]/g, '');
  } catch (e) {
    console.warn('Could not generate ID for heading:', children);
    return '';
  }
};

/**
 * 공통 heading 렌더링 함수 (h1~h5 대응)
  MDX 문서 상의 h1이지만, 실제 HTML에서는 페이지 내 <h1>은 하나만 사용해야 하므로
  시멘틱 구조를 위해 <h2>로 렌더링
  예: MDX 상의 h1 → HTML의 h2, h2 → h3 ...
 */
const renderHeading = (
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  tag: keyof JSX.IntrinsicElements,
  fontSize: string,
  fontWeight: string,
  marginTop = '10px',
  marginBottom = '10px',
) => {
  return ({ children }: { children: ReactNode }) => {
    const id = createHeadingId(children);
    const HeadingTag = tag;
    return (
      <HeadingTag
        id={id}
        style={{
          fontFamily: 'PRETENDARD',
          fontSize,
          fontWeight,
          marginTop,
          marginBottom,
        }}
      >
        {children}
      </HeadingTag>
    );
  };
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Heading
    h1: renderHeading('h1', 'h2', '40px', '700', '20px', '20px'),
    h2: renderHeading('h2', 'h3', '28px', '600', '15px', '15px'),
    h3: renderHeading('h3', 'h4', '24px', '500'),
    h4: renderHeading('h4', 'h5', '20px', '400'),
    h5: renderHeading('h5', 'h6', '18px', '400'),

    p: ({ children }) => (
      <p
        style={{
          fontFamily: 'PRETENDARD',
          fontSize: '16px',
          lineHeight: '1.75',
        }}
      >
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        style={{
          marginLeft: '1.5rem',
          marginTop: '0.5rem',
          marginBottom: '1rem',
          listStyleType: 'circle',
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={{
          marginLeft: '1.5rem',
          marginTop: '0.5rem',
          marginBottom: '1rem',
          listStyleType: 'decimal',
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li
        style={{
          fontFamily: 'PRETENDARD',
          fontSize: '16px',
          marginBottom: '0.5rem',
        }}
      >
        {children}
      </li>
    ),
    code: ({ children }) => (
      <pre
        style={{
          fontFamily: 'd2coding, monospace',
          padding: '30px 0 30px 40px',
          border: '1px solid white',
          borderRadius: '10px',
          display: 'block',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.75',
          maxHeight: '700px',
          overflow: 'scroll',
          background:
            'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
          scrollbarColor: 'white #333',
          scrollbarWidth: 'thin',
        }}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          display: 'flex',
          alignItems: 'center',
          borderLeft: '7px solid #ccc',
          margin: '1rem',
          paddingLeft: '1rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        }}
      >
        {children}
      </blockquote>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
          marginBottom: '1rem',
        }}
        {...(props as ImageProps)}
      />
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        style={{
          color: '#0070f3',
          textDecoration: 'none',
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    hr: () => (
      <hr
        style={{
          border: '0',
          borderTop: '1px solid #ccc',
          margin: '2rem 0',
        }}
      />
    ),
    input: (props) => (
      <input
        type="checkbox"
        style={{
          marginRight: '0.5rem',
        }}
        {...props}
      />
    ),
    // 테이블 스타일 추가
    table: ({ children }) => (
      <table
        style={{
          width: '100%',
          padding: '2rem',
        }}
      >
        {children}
      </table>
    ),
    th: ({ children }) => (
      <th
        style={{
          borderBottom: '1px solid rgba(128, 128, 128, 0.5)',
          padding: '1rem',
          textAlign: 'center',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: '18px',
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        style={{
          borderBottom: '1px solid rgba(128, 128, 128, 0.5)',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        {children}
      </td>
    ),

    // Add custom Components
    BlockMath,
    Callout,
    Toggle,

    // Spread custom components if provided
    ...components,
  };
}
