import { getMdxMetadata, getHeadingsFromContent } from '@/lib/mdxParsing';
import { getSubjectBySlug } from '@/constants/subject';
import MathPageLayout from '@/components/ui/MathPageLayout';

type PageParams = Promise<{
  locale: 'en' | 'ko';
  category: string;
  slug: string[];
}>;

export default async function Page({ params }: { params: PageParams }) {
  const { locale, category, slug } = await params;

  // 카테고리 검증
  const subjectInfo = getSubjectBySlug(category);
  if (!subjectInfo) {
    return <div>존재하지 않는 카테고리입니다.</div>;
  }

  // 배열로 된 slug를 문자열로 변환
  const slugPath = slug.join('/');
  const metadata = getMdxMetadata(locale, `${category}/${slugPath}`);

  if (!metadata) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  // metadata.content 확인
  if (!metadata.content) {
    console.log('콘텐츠가 비어있습니다');
    return <div>페이지 콘텐츠를 불러오는데 실패했습니다.</div>;
  }

  let headings = await getHeadingsFromContent(metadata.content);

  return (
    <MathPageLayout
      locale={locale}
      metadata={metadata}
      category={category}
      headings={headings}
    />
  );
}

// 정적 경로 생성
export async function generateStaticParams() {
  const { getAllSlugs } = await import('@/lib/mdxParsing');
  const locales = ['en', 'ko']; // 언어별로

  const allParams: any = [];

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
