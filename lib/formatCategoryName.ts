export default function formatCategoryName(category: string): string {
  const parts = category.split('/');

  return (
    parts
      .map((part) => {
        // "숫자_이름" 패턴인 경우 (예: 01_Introduction)
        const match = part.match(/^(\d+)_(.+)$/);
        return match ? `${match[1]}. ${match[2]}` : part;
      })
      // 변환된 부분들을 다시 경로 구분자로 결합
      .join('/')
  );
}
