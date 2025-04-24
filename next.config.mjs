import nextMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

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

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
