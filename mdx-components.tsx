import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Customize heading components
    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: 'PRETENDARD',
          fontSize: '40px',
          fontWeight: '700',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: 'PRETENDARD',
          fontSize: '28px',
          fontWeight: '600',
          marginTop: '15px',
          marginBottom: '15px',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: 'PRETENDARD',
          fontSize: '24px',
          fontWeight: '500',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          fontFamily: 'PRETENDARD',
          fontSize: '20px',
          fontWeight: '400',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5
        style={{
          fontFamily: 'PRETENDARD',
          fontSize: '18px',
          fontWeight: '400',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6
        style={{
          fontFamily: 'PRETENDARD',
          fontSize: '16px',
          fontWeight: '400',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {children}
      </h6>
    ),
    // Customize paragraph component
    p: ({ children }) => (
      <p
        style={{
          fontFamily: 'PRETENDARD',
          fontSize: '16px',
          lineHeight: '1.6',
        }}
      >
        {children}
      </p>
    ),
    // Customize unordered list
    ul: ({ children }) => (
      <ul
        style={{
          marginLeft: '1.5rem',
          marginBottom: '1rem',
        }}
      >
        {children}
      </ul>
    ),
    // Customize ordered list
    ol: ({ children }) => (
      <ol
        style={{
          marginLeft: '1.5rem',
          marginBottom: '1rem',
        }}
      >
        {children}
      </ol>
    ),
    // Customize list item
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
    // Customize inline code
    code: ({ children }) => (
      <pre
        style={{
          fontFamily: 'd2coding, monospace',
          padding: '15px',
          border: '1px solid white',
          borderRadius: '10px',
          display: 'block',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.75',
        }}
      >
        {children}
      </pre>
    ),
    // Customize blockquote
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
    // Customize image component
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
    // Customize link component
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
    // Customize horizontal rule
    hr: () => (
      <hr
        style={{
          border: '0',
          borderTop: '1px solid #ccc',
          margin: '2rem 0',
        }}
      />
    ),
    // Customize task list checkbox
    input: (props) => (
      <input
        type="checkbox"
        style={{
          marginRight: '0.5rem',
        }}
        {...props}
      />
    ),
    // Spread custom components if provided
    ...components,
  };
}
