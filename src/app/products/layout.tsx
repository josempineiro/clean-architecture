export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col h-full">
      {children}
    </div>
  )
}
