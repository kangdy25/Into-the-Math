import MathPageLayout from '@/components/ui/layout/MathPageLayout';
import { getSubjectBySlug } from '@/constants/subject';
import { getMdxPageData } from '@/lib/metadata';
import getHeadingsFromContent from '@/lib/getHeadings';

const locales = ['en', 'ko'] as const;

type Locale = (typeof locales)[number];

type PageParams = {
  locale: Locale;
  category: string;
  slug: string[];
};

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, category, slug } = await params;

  // 카테고리 검증
  const subjectInfo = getSubjectBySlug(category);
  if (!subjectInfo) {
    return <div>존재하지 않는 카테고리입니다.</div>;
  }

  // 배열로 된 slug를 문자열로 변환
  const slugPath = slug.join('/');
  const pageData = getMdxPageData(locale, `${category}/${slugPath}`);

  if (!pageData) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  // pageData.content 확인
  if (!pageData.content) {
    console.log('콘텐츠가 비어있습니다');
    return <div>페이지 콘텐츠를 불러오는데 실패했습니다.</div>;
  }

  let headings = await getHeadingsFromContent(pageData.content);

  return (
    <MathPageLayout
      locale={locale}
      pageData={pageData}
      category={category}
      headings={headings}
    />
  );
}

// 정적 경로 생성
export async function generateStaticParams() {
  const { getAllSlugs } = await import('@/lib/getAllSlugs');

  const allParams: PageParams[] = [];

  for (const locale of locales) {
    const slugs = getAllSlugs(locale);

    slugs.forEach((slug) => {
      const [category, ...rest] = slug.split('/');
      allParams.push({
        locale,
        category,
        slug: rest,
      });
    });
  }

  return allParams;
}
