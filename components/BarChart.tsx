export type BarChartRow = {
  label: string;
  value: number;
  color: string;
};

type BarChartProps = {
  id: string;
  title: string;
  rows: readonly BarChartRow[];
  maxValue: number;
  unit: string;
};

export default function BarChart({ id, title, rows, maxValue, unit }: BarChartProps) {
  return (
    <figure
      aria-labelledby={`${id}-title`}
      className="min-w-0 rounded-xl border border-white/10 bg-gray-900 p-4 sm:p-6"
    >
      <figcaption id={`${id}-title`} className="mb-5 text-lg font-semibold text-gray-100">
        {title}
      </figcaption>
      <table className="w-full table-fixed border-collapse text-sm">
        <caption className="sr-only">
          {unit} eduskuntaryhmittäin. Pylväiden asteikko on 0–{maxValue}.
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Eduskuntaryhmä</th>
            <th scope="col">{unit}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="w-2/5 py-2 pr-3 text-left font-normal wrap-anywhere hyphens-auto text-gray-200"
              >
                {row.label}
              </th>
              <td aria-label={`${unit}: ${row.value}`} className="py-2 align-middle">
                <div className="flex items-center gap-2">
                  <div aria-hidden="true" className="h-6 flex-1 border-l border-white/30 bg-white/5">
                    <div
                      className="h-full"
                      style={{ width: `${(row.value / maxValue) * 100}%`, backgroundColor: row.color }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right font-semibold text-white tabular-nums">{row.value}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot aria-hidden="true">
          <tr>
            <td aria-hidden="true" />
            <td aria-hidden="true" className="pt-2 pr-8 text-xs text-gray-400 tabular-nums">
              <div className="flex justify-between border-t border-white/20 pt-2">
                <span>0</span>
                <span>{maxValue / 2}</span>
                <span>{maxValue}</span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </figure>
  );
}
