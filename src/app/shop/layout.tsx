'use client'

import { ShopApplicationProvider } from '@/shop/presentation'
import { ShopApplication } from '@/shop/application'
import { productsRepository } from '@/shop/infrastructure'

const shopApplication = new ShopApplication({
  productsRepository,
})

export default function ShopApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ShopApplicationProvider application={shopApplication}>
      {children}
    </ShopApplicationProvider>
  )
}
