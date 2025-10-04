interface SubheaderProps {
  children: React.ReactNode;
}

const Subheader: React.FC<SubheaderProps> = ({ children }) => {
  return <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-300">{children}</h2>;
};

export default Subheader;
