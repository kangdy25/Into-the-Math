import nextMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const withMDX = nextMDX({
  extension: /\.mdx$/, // .mdx 확장자 파일을 처리
  options: {
    // remarkPlugins: [remarkMath], // 수학 관련 기능 추가
    // rehypePlugins: [
    //   rehypeKatex, // KaTeX 수식 렌더링
    //   [
    //     rehypePrettyCode,
    //     {
    //       // Pretty Code 스타일링
    //       theme: 'one-dark-pro', // 하이라이팅 테마 설정
    //       emptyStyle: false, // 빈 코드 블록에 대한 스타일 적용 여부
    //     },
    //   ],
    // ],
  },
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], // 페이지 확장자
  reactStrictMode: true, // React Strict 모드 활성화= {
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
