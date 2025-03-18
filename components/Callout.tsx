import React from 'react';

const Callout = ({ type, children } : any) => {
    
  let info = '';
  let calloutStyle = '';
  let icon = '';
  let color = '';

  switch (type) {
    
    case 'tip':
      info= 'tip';
      calloutStyle = 'bg-teal-50 border-l-7 border-teal-500';
      icon = '💡';
      color = 'text-teal-500';
      break;
    case 'warning':
      info= 'warning';
      calloutStyle = 'bg-yellow-50 border-l-7 border-yellow-500';
      icon = '⚠️';
      color = 'text-yellow-500';
      break;
    case 'danger':
      info= 'danger';
      calloutStyle = 'bg-red-50 border-l-7 border-red-500';
      icon = '💥';
      color = 'text-red-500';
      break;
    default:
      info= 'note';
      calloutStyle = 'bg-indigo-50 border-l-7  border-blue-500';
      icon = '🔔';
      color = 'text-blue-500';
      break;
  }

  return (
    <div className={`flex flex-col items-start gap-3 pl-6 py-4 my-4 rounded-lg ${calloutStyle} dark:bg-slate-900`}>
        <div className=''>
          <span className="text-md mr-2">{icon}</span>
          <span className={`text-lg font-pretendard-bold ${color}`}>{info}</span>
        </div>
      <div className="flex-1 font-pretendard-light text-base pl-2 text-slate-900 dark:text-white">{children}</div>
    </div>
  );
};

export default Callout;
