export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-1 bg-gray-950 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">{children}</div>
    </div>
  );
}
