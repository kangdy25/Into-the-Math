'use client';

import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

const subjects = [
  { name: '기초수학', path: '/basic-mathematics' },
  { name: '이산수학', path: '/discrete-mathematics' },
  { name: '선형대수학', path: '/linear-algebra' },
  { name: '미분적분학', path: '/calculus' },
  { name: '위상수학', path: '/topology' },
  { name: '확률과 통계', path: '/probability-statistics' },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen h-full bg-[radial-gradient(circle,_#4459dd_0%,_#01012a_41%,_#0a1147_71%,_#170231_100%)]">
      <Header />
      <div className="flex flex-col items-center gap-16 m-5 text-white">
        <h1 className=" text-7xl text-center font-pretendard-bold text-white mt-32">
          Into The Mathematics
        </h1>
        <p className="w-[900px] leading-10 text-center text-xl font-pretendard-extralight">
          <b className="text-blue-400 font-pretendard-bold">Mathematics</b> is
          the language of the universe, a silent symphony where every equation
          tells a story. It is both the foundation and the infinite horizon of
          knowledge. With each problem solved, we unlock the mysteries of
          existence.
        </p>
        <div className="my-6 grid grid-cols-3 gap-10">
          {subjects.map((subject) => (
            <button
              key={subject.path}
              onClick={() => router.push(subject.path)}
              className="p-3 w-52 h-40 bg-none border border-white text-white rounded-lg shadow-lg font-pretendard-extralight hover:border-blue-400 transition"
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
