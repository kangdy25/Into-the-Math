import { getMdxMetadata } from '@/lib/mdxParsing';
import { getSubjectBySlug } from '@/constants/subject';
import MathPageLayout from '@/components/ui/MathPageLayout';

export default async function Page({ 
  params 
}: { 
  params: { category: string } 
}) {
  const { category } = await params;
  
  // 카테고리 검증
  const subjectInfo = getSubjectBySlug(category);
  if (!subjectInfo) {
    return <div>존재하지 않는 카테고리입니다.</div>;
  }

  // index.mdx 로드
  const metadata = getMdxMetadata(`${category}/index`);

  return <MathPageLayout metadata={metadata} category={category} />;
}