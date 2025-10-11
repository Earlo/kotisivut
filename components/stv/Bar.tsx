interface BarProps {
  maxVotes: number;
  votes: number;
  label: string;
  color?: string;
}

const Bar: React.FC<BarProps> = ({ maxVotes, votes, label, color = '#aaaaaa' }) => {
  return (
    <div className="flex flex-col items-center px-1 text-gray-200">
      <div className="flex h-56 flex-col-reverse">
        <div
          className={`transition-all duration-300 ease-in-out`}
          style={{
            height: `${(votes / maxVotes) * 100}%`,
            backgroundColor: color,
            width: '20px',
          }}
          aria-label={`Bar for ${label}`}
        />
      </div>
      <span className="mt-2 text-center">{label + ' ' + votes}</span>
    </div>
  );
};

export default Bar;
