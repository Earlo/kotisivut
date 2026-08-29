import { cn } from '@/lib/helpers';

interface TitleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ id, children, className }) => {
  return (
    <h1 id={id} className={cn('mb-4 text-3xl leading-relaxed font-bold text-gray-200', className)}>
      {children}
    </h1>
  );
};

export default Title;
