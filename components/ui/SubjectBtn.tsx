'use client';

import { useRouter } from 'next/navigation';
import subjects from '@/constants/subject';

const SubjectBtn = () => {
  const router = useRouter();

  return (
    <div className="w-[800px] mt-6 mb-40 grid grid-cols-3 gap-10 justify-center items-center">
      {subjects.map((subject) => (
        <button
          key={subject.path}
          onClick={() => router.push(subject.path)}
          className=" flex flex-col justify-center text-black items-center p-3 h-[250px] gap-3 bg-none border-2 border-gray-400 text-xl rounded-lg shadow-lg font-pretendard hover:border-indigo-500 dark:hover:border-blue-400 transition dark:text-white dark:border-white dark:border"
        >
          <img
            src={subject.icon.src}
            alt={subject.name}
            className="size-16 mb-2"
          />
          <p>{subject.name}</p>
          <span className="text-gray-500 dark:text-gray-400">
            {subject.eng}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SubjectBtn;
