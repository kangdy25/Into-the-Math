import { getMdxMetadata } from '@/lib/mdxParsing';
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

  return (
    <MathPageLayout locale={locale} metadata={metadata} category={category} />
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
