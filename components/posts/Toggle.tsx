const levelMap = {
  1: 'text-4xl font-bold',
  2: 'text-2xl font-semibold',
  3: 'text-xl font-medium',
};

const Toggle = ({
  title,
  level,
  children,
}: {
  title: string;
  level: 1 | 2 | 3;
  children: React.ReactNode;
}) => {
  const titleClass = levelMap[level];

  return (
    <details className="group my-7 ">
      <summary
        className={`w-auto inline-flex items-center gap-2 font-pretendard-bold cursor-pointer select-none list-none ${titleClass} `}
      >
        <span
          className={`${
            level === 1 ? 'text-xl' : 'text-sm'
          } transition-transform duration-200 group-open:rotate-90`}
        >
          ▶
        </span>
        {title}
      </summary>
      <div className="font-pretendard mt-4">{children}</div>
    </details>
  );
};

export default Toggle;
