interface ListProps {
  items: string[];
}

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-lg text-gray-200">
      {items.map((item, index) => (
        // Repeated list items are valid, so their position is the only available identity.
        // oxlint-disable-next-line react/no-array-index-key
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;
