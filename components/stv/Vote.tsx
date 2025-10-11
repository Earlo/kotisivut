interface VoteProps {
  candidates: string[];
}

const Vote: React.FC<VoteProps> = ({ candidates }) => {
  return (
    <div className="mx-auto my-8 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <ul className="list-decimal pl-4">
        {candidates.map((candidate, index) => (
          <li key={index} className="text-lg text-gray-700">
            {candidate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vote;
