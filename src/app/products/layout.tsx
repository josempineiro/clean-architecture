export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>
        Products header
      </header>
      {children}
    </div>
  )
}
