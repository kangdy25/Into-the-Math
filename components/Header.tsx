import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="w-full h-16 text-white border-b px-7 py-10 border-b-slate-500 flex items-center justify-between">
      <div className="flex w-100 gap-8 items-center">
        <h3 className="text-2xl font-pretendard-bold cursor-pointer">
          Into the Math
        </h3>
        <button className="border-1 px-5 py-3 w-40 flex justify-start items-center border-slate-600 rounded-lg cursor-pointer">
          <FontAwesomeIcon
            className="text-slate-300"
            icon={faMagnifyingGlass}
          />
          <span className="mx-3 text-slate-300">검색</span>
        </button>
      </div>

      <div className="flex gap-5">
        <button>홈</button>
        <button>번역</button>
        <button>다크모드</button>
        <button>깃허브</button>
      </div>
    </div>
  );
};

export default Header;
