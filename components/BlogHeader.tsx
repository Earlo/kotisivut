// Header.tsx
interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <h1 className="mb-6 text-3xl font-semibold text-gray-800">{children}</h1>
  );
};

export default Header;
