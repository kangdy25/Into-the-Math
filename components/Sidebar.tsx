import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Sidebar() {
  const files = fs.readdirSync(
    path.join(process.cwd(), '/content/basic-mathematics'),
  );
  const pages = files.map((file) => file.replace('.mdx', ''));

  return (
    <aside className="sidebar h-screen w-[200px] border border-red-400">
      <h2 className="font-pretendard-bold">Basic Mathematics</h2>
      <ul>
        {pages.map((page) => (
          <li className="ml-5" key={page}>
            <Link href={`/basic-mathematics/${page}`}>
              {page.replace('-', ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
