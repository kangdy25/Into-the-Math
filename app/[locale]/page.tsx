import Header from '@/components/ui/Header';
import SubjectBtn from '@/components/ui/SubjectBtn';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('main');

  return (
    <div
      className="w-full min-h-screen h-full 
    bg-[radial-gradient(circle,_#ebecff_0%,_#ffffff_37%,_#e2e4ff_61%,_#d6f0fa_100%)] 
    dark:bg-[radial-gradient(circle,_#64696f_0%,_#101012_25%,_#000000_47%,_#222222_91%,_#000000_100%)]"
    >
      <Header />
      <div className="flex flex-col items-center gap-16 m-5 dark:text-white">
        <h1 className="text-5xl sm:text-7xl leading-[1.25] text-gray-700 text-center font-pretendard-bold  mt-36 dark:text-white">
          Into the Mathematics
        </h1>
        <p className="w-full max-w-[900px] leading-10 text-lg sm:text-xl font-pretendard-extralight">
          <b className="text-indigo-500 font-pretendard-bold ">{t('title')}</b>
          {t('paragraph')}
        </p>
        <SubjectBtn />
      </div>
    </div>
  );
}
