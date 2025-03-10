import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import React from 'react';
import Welcome from '@/content/basic-mathematics/Welcome.mdx';

const page = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1 border-2 border-indigo-400">
          <Welcome />
        </div>
        {/* <TOC /> */}
      </div>
    </div>
  );
};

export default page;
