import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

export type Heading = {
  depth: number;
  text: string;
  id: string;
};

export default async function getHeadingsFromContent(
  content: string,
): Promise<Heading[]> {
  if (!content) {
    console.warn('Content is empty or undefined');
    return [];
  }

  try {
    const tree = unified().use(remarkParse).parse(content);
    const headings: Heading[] = [];

    visit(tree, 'heading', (node: any) => {
      if (node.depth !== 1 && node.depth !== 2) return; // h1, h2만 가져옴

      const text = node.children
        .filter((child: any) => child.type === 'text')
        .map((child: any) => child.value)
        .join('');

      if (!text) return;

      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-') // 공백 -> 하이픈
        .replace(/[?!]/g, ''); // 특수문자 제거

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
