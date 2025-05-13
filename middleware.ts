import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

// 미들웨어의 적용 범위 설정 (특정 경로를 제외하고 모든 경로에 미들웨어를 적용)
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
