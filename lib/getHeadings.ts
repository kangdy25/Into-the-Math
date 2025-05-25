import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

export type Heading = {
  depth: number; // heading의 깊이 (1 = h1, 2 = h2)
  text: string; // heading 텍스트 내용
  id: string; // URL에 사용할 ID (텍스트 기반으로 생성)
};

/**
 * 마크다운 문자열에서 h1, h2 헤딩을 추출하여 TOC용 배열을 반환합니다.
 *
 * @param content 마크다운 형식의 문자열
 * @returns Heading 배열 (depth, text, id 포함)
 */

export default async function getHeadingsFromContent(
  content: string,
): Promise<Heading[]> {
  if (!content) {
    console.warn('Content is empty or undefined');
    return [];
  }

  try {
    // 마크다운 파싱 트리 생성
    const tree = unified().use(remarkParse).parse(content);
    const headings: Heading[] = [];

    // AST에서 heading 노드 탐색
    visit(tree, 'heading', (node) => {
      // TOC에 필요한 h1, h2만 추출
      if (node.depth !== 1 && node.depth !== 2) return;

      // heading 내부의 텍스트 노드만 필터링하여 텍스트 추출
      const text = node.children
        .filter((child) => child.type === 'text')
        .map((child) => child.value)
        .join('');

      if (!text) return;

      // 텍스트를 ID 형태로 변환 (소문자, 공백 → 하이픈, 특수문자 제거)
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-') // 공백 -> 하이픈
        .replace(/[?!]/g, ''); // 특수문자 제거

      // 추출한 heading 정보를 배열에 추가
      headings.push({
        depth: node.depth,
        text,
        id,
      });
    });

    return headings;
  } catch (error) {
    console.error('Error parsing markdown content:', error);
    return [];
  }
}
