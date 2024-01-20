// Subheader.tsx
interface SubheaderProps {
  children: React.ReactNode;
}

const Subheader: React.FC<SubheaderProps> = ({ children }) => {
  return (
    <h2 className="mb-4 mt-10 text-2xl font-bold text-orange-300">
      {children}
    </h2>
  );
};

export default Subheader;
