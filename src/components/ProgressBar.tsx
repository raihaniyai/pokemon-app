import React from 'react';

interface Props {
  progress: number; // from 0 to 100
  showNumber?: boolean;
}

const ProgressBar = ({ progress, showNumber }: Props) => {
  const progressColor = progress < 50 ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className='flex items-center space-x-6 h-full'>
      {showNumber &&
        <div>
          {progress}
        </div>
      }

      <div className="w-full bg-gray-200 rounded-full h-1">
        <div
          className={`h-1 rounded-full ${progressColor} shadow-md`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
