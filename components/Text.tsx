//components/Text.tsx
import { cn } from '@/lib/helpers';
interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, className }) => {
  return <p className={cn('mb-4 text-lg leading-relaxed text-gray-200', className)}>{children}</p>;
};

export default Text;
