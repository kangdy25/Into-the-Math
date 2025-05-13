import { ReactNode } from 'react';

interface BlockMathProps {
  children: ReactNode;
}

const BlockMath = ({ children }: BlockMathProps) => {
  return <div className="text-lg sm:text-xl text-center my-3">{children}</div>;
};

export default BlockMath;
