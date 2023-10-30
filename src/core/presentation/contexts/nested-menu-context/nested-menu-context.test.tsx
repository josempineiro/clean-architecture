import React, { Fragment } from 'react'
import { renderHook, render, fireEvent, waitFor } from '@testing-library/react'
import {
  NestedMenuContext,
  useNestedMenu,
  NestedMenuProvider,
} from './nested-menu-context' // Import your context file here

interface TestItem {
  id: string
  label: string
}

const items = [
  {
    id: 'menu1',
    label: 'Menu 1',
  },
]

const MenuComponent = ({ items }: { items: Array<TestItem> }) => {
  const { openMenu, closeMenu, isOpen } = useNestedMenu()

  return (
    <div>
      {items.map((item) => (
        <Fragment key={item.id}>
          {isOpen(item.id) && <div>{item.label}</div>}
          <button
            data-testId={item.id}
            onClick={() => {
              isOpen(item.id) ? closeMenu(item.id) : openMenu(item.id)
            }}
          >
            Menu 1
          </button>
        </Fragment>
      ))}
    </div>
  )
}

describe('NestedMenuContext', () => {
  describe('Provider', () => {
    it('should provide values to consumers', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NestedMenuProvider<TestItem>
          items={items}
          getItemId={(item: TestItem) => item.id}
        >
          {children}
        </NestedMenuProvider>
      )

      const { result } = renderHook(() => useNestedMenu(), {
        wrapper,
      })

      expect(result.current).toBeDefined()
      expect(result.current.openMenu).toBeInstanceOf(Function)
      expect(result.current.closeMenu).toBeInstanceOf(Function)
      expect(result.current.closeAllMenus).toBeInstanceOf(Function)
      expect(result.current.openAllMenus).toBeInstanceOf(Function)
      expect(result.current.isOpen).toBeInstanceOf(Function)
    })

    it('should open and close menus', () => {
      const { getByText, getByTestId } = render(
        <NestedMenuProvider<TestItem>
          items={items}
          getItemId={(item: TestItem) => item.id}
        >
          <MenuComponent items={items} />
        </NestedMenuProvider>,
      )

      const menuButton = getByTestId(items[0].id)
      fireEvent.click(menuButton)
      waitFor(() => {
        expect(getByText(items[0].label)).toBeInTheDocument()
      })
    })
  })
})
