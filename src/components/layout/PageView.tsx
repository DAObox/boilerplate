export function PageView({
  rightColumn,
  children,
}: {
  rightColumn?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="-mt-24 pb-8">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div
            className={`grid grid-cols-1 gap-4 ${rightColumn ? "lg:col-span-2" : "lg:col-span-3"}`}
          >
            {children}
          </div>

          {/* Right column */}
          {rightColumn && <div className="grid grid-cols-1 gap-4">{rightColumn}</div>}
        </div>
      </div>
    </main>
  );
}
