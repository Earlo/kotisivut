//components/generic/footer/FooterIcon.tsx
import Icon from '@/components/generic/Icon';

interface IconLinkProps {
  href: string;
  name: string;
}

const IconLink: React.FC<IconLinkProps> = ({ href, name }) => {
  return (
    <a href={href}>
      <Icon name={name} />
      <span className="sr-only">{name}</span>
    </a>
  );
};
export default IconLink;
