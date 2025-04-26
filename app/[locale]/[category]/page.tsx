import { getMdxMetadata } from '@/lib/mdxParsing';
import { getSubjectBySlug } from '@/constants/subject';
import MathPageLayout from '@/components/ui/MathPageLayout';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: 'en' | 'ko'; category: string }>;
}) {
  const { locale, category } = await params;

  // 카테고리 검증
  const subjectInfo = getSubjectBySlug(category);
  if (!subjectInfo) {
    return <div>존재하지 않는 카테고리입니다.</div>;
  }

  // index.mdx 로드
  const metadata = getMdxMetadata(locale, `${category}/index`);

  return (
    <MathPageLayout locale={locale} metadata={metadata} category={category} />
  );
}
