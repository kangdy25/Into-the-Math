import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const page = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1 border-2 border-indigo-400">
          샬롬
        </div>
      </div>
    </div>
  );
};

export default page;
