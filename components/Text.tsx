interface TextProps {
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children }) => {
  return (
    <p className="mb-4 text-lg leading-relaxed text-gray-200 ">{children}</p>
  );
};

export default Text;
