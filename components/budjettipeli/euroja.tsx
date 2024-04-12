interface EuroFormatterProps {
  amount: number;
}

const EuroFormatter: React.FC<EuroFormatterProps> = ({ amount }) => {
  const formatEuro = (value: number) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)} mrd €`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)} m €`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(2)} t €`;
    } else {
      return `${value.toFixed(2)} €`;
    }
  };

  return <span>{formatEuro(amount)}</span>;
};

export default EuroFormatter;
