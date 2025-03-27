import Header from '@/components/ui/Header';
import SubjectBtn from '@/components/ui/SubjectBtn';

export default function Home() {
  return (
    <div className="min-h-screen h-full bg-[radial-gradient(circle,_#ebecff_0%,_#ffffff_37%,_#e2e4ff_61%,_#d6f0fa_100%)] dark:bg-[radial-gradient(circle,_#a3a6b2_0%,_#15182c_16%,_#000000_37%,_#222222_91%,_#000000_100%)]">
      <Header />
      <div className="flex flex-col items-center gap-16 m-5 dark:text-white">
        <h1 className=" text-7xl text-gray-700 text-center font-pretendard-bold  mt-32 dark:text-white">
          Into the Mathematics
        </h1>
        <p className="w-[900px] leading-10 text-xl font-pretendard-extralight">
          <b className="text-indigo-500 font-pretendard-bold ">Mathematics</b>{' '}
          is the language of the universe, a silent symphony where every
          equation tells a story. It is both the foundation and the infinite
          horizon of knowledge. With each problem solved, we unlock the
          mysteries of existence.
        </p>
        <SubjectBtn />
      </div>
    </div>
  );
}
