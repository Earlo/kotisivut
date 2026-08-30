interface MoneyProps {
  amount: number;
  showPlus?: boolean;
}

const moneyFormatter = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const Money = ({ amount, showPlus = false }: MoneyProps) => (
  <span className="whitespace-nowrap">
    {showPlus && amount > 0 ? '+' : ''}
    {moneyFormatter.format(amount)}
  </span>
);

export default Money;
