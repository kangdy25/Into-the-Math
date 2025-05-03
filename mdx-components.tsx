import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import BlockMath from './components/posts/BlockMath';
import Toggle from './components/posts/Toggle';
import Callout from './components/posts/Callout';

// ID 생성을 위한 헬퍼 함수
const createHeadingId = (children: React.ReactNode): string => {
  // children이 문자열인지 확인
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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      const id = createHeadingId(children);
      return (
        <h2
          id={id}
          style={{
            fontFamily: 'PRETENDARD',
            fontSize: '40px',
            fontWeight: '700',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          {children}
        </h2>
      );
    },
    h2: ({ children }) => {
      const id = createHeadingId(children);
      return (
        <h3
          id={id}
          style={{
            fontFamily: 'PRETENDARD',
            fontSize: '28px',
            fontWeight: '600',
            marginTop: '15px',
            marginBottom: '15px',
          }}
        >
          {children}
        </h3>
      );
    },
    h3: ({ children }) => {
      const id = createHeadingId(children);
      return (
        <h4
          id={id}
          style={{
            fontFamily: 'PRETENDARD',
            fontSize: '24px',
            fontWeight: '500',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          {children}
        </h4>
      );
    },
    h4: ({ children }) => {
      const id = createHeadingId(children);
      return (
        <h5
          id={id}
          style={{
            fontFamily: 'PRETENDARD',
            fontSize: '20px',
            fontWeight: '400',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          {children}
        </h5>
      );
    },
    h5: ({ children }) => {
      const id = createHeadingId(children);
      return (
        <h6
          id={id}
          style={{
            fontFamily: 'PRETENDARD',
            fontSize: '18px',
            fontWeight: '400',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          {children}
        </h6>
      );
    },

    // 나머지 컴포넌트는 동일하게 유지
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
