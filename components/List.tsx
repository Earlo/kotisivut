interface ListProps {
  items: string[];
}

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-lg text-gray-200">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;
