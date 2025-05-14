'use client';

import { useRouter } from 'next/navigation';
import subjects from '@/constants/subject';
import { useLocale } from 'next-intl';

const SubjectBtn = () => {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="w-full max-w-[850px] mt-6 mb-40 flex flex-wrap gap-10 justify-center items-center">
      {subjects.map((subject) => (
        <button
          key={subject.path}
          onClick={() => router.push(subject.path)}
          className="flex flex-col justify-center text-black items-center p-3 w-[200px] sm:w-[250px] h-[300px] gap-3 bg-none border-2 border-gray-400 text-xl rounded-lg shadow-lg font-pretendard hover:border-indigo-500 dark:hover:border-blue-400 transition dark:text-white dark:border-white dark:border"
        >
          <img
            src={subject.icon.src}
            alt={subject.name}
            className="size-16 mb-2"
          />
          <p>{locale === 'en' ? subject.eng : subject.name}</p>
          <span className="text-gray-500 text-base dark:text-gray-400">
            {locale === 'en' ? subject.descriptionEng : subject.descriptionKo}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SubjectBtn;
