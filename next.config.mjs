import nextMDX from '@next/mdx';

const withMDX = nextMDX({
  extension: /\.mdx$/, // .mdx 확장자 파일을 처리
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], // 페이지 확장자
  transpilePackages: ['next-mdx-remote'],
  reactStrictMode: true, // React Strict 모드 활성화= {
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
