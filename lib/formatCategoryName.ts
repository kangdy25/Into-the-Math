/**
 * 카테고리 경로 문자열에서 숫자 접두어를 보기 좋게 포맷합니다.
 * 예: "/02_Basics" → "/02. Basics"
 *
 * @param category 변환할 카테고리 문자열 (예: '02_Basics')
 * @returns 포맷된 카테고리 문자열 (예: '02. Basics')
 */

export default function formatCategoryName(category: string): string {
  const parts = category.split('/'); // '/' 기준으로 각 경로 부분을 나눔

  return (
    parts
      .map((part) => {
        // "숫자_이름" 패턴인 경우 (예: 01_Introduction → 01. Introduction)
        const match = part.match(/^(\d+)_(.+)$/);
        return match ? `${match[1]}. ${match[2]}` : part;
      })
      // 다시 '/'로 합쳐서 전체 경로 문자열로 반환
      .join('/')
  );
}
