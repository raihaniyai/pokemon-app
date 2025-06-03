import React from 'react';

interface Props {
  progress: number; // from 0 to 100
  showNumber?: boolean;
  dynamicColor?: boolean;
}

const ProgressBar = ({ progress, showNumber, dynamicColor }: Props) => {
  const progressColor = progress >= 50 || dynamicColor ? 'bg-emerald-400' : 'bg-red-400';
  const width = progress < 100 ? progress : 100;

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
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
