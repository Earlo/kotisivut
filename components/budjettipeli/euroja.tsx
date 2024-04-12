interface EuroFormatterProps {
  amount: number;
}

const EuroFormatter: React.FC<EuroFormatterProps> = ({ amount }) => {
  const formatEuro = (value: number) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)} miljardia €`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)} miljoonaa €`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(2)} tuhatta €`;
    } else {
      return `${value.toFixed(2)} €`;
    }
  };

  return <span>{formatEuro(amount)}</span>;
};

export default EuroFormatter;
