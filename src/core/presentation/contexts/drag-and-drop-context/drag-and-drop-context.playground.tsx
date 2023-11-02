'use client'

import {
  useDragAndDrop,
  DragAndDropProvider,
  useDragItemAttributes,
  useDropItemAttributes,
} from './drag-and-drop-context'

interface DragDroppable {
  type:
    | 'group-product'
    | 'group'
    | 'product'
    | 'purpose'
    | 'group-product-purpose'
  id: string
}

type Group = DragDroppable & {
  type: 'group'
  products: Product[]
}

type Product = DragDroppable & {
  type: 'product'
  purposes: Purpose[]
}

type Purpose = DragDroppable & {
  type: 'purpose'
}

type GroupProduct = DragDroppable & {
  type: 'group-product'
  product: Product
  group: Group
}

interface GroupProductPurpose extends DragDroppable {
  type: 'group-product-purpose'
  group: Group
  product: Product
  purpose: Purpose
}

type Draggable = Group | Product | Purpose | GroupProductPurpose | GroupProduct

function isGroup(item: DragDroppable): item is Group {
  return item.type === 'group'
}

function isGroupProduct(item: DragDroppable): item is GroupProduct {
  return item.type === 'group-product'
}

function isProduct(item: DragDroppable): item is Product {
  return item.type === 'product'
}

function isGroupProductPurpose(
  item: DragDroppable,
): item is GroupProductPurpose {
  return item.type === 'group-product-purpose'
}

function isPurpose(item: DragDroppable): item is Purpose {
  return item.type === 'purpose'
}

const purposes = Array.from({ length: 10 }, (_, index) => ({
  id: `pur${index}`,
  type: 'purpose',
}))

const products = Array.from({ length: 10 }, (_, index) => ({
  id: `pro${index}`,
  type: 'product',
  purposes: [],
}))

const group: Group = {
  id: 'g1',
  type: 'group',
  products: [
    {
      id: 'pr1',
      type: 'product',
      purposes: [
        {
          id: 'pu1',
          type: 'purpose',
        },
        {
          id: 'pu2',
          type: 'purpose',
        },
      ],
    },
    {
      id: 'pr2',
      type: 'product',
      purposes: [
        {
          id: 'pu3',
          type: 'purpose',
        },
        {
          id: 'pu4',
          type: 'purpose',
        },
      ],
    },
    {
      id: 'pr3',
      type: 'product',
      purposes: [
        {
          id: 'pu5',
          type: 'purpose',
        },
        {
          id: 'pu6',
          type: 'purpose',
        },
      ],
    },
    {
      id: 'pr4',
      type: 'product',
      purposes: [
        {
          id: 'pu7',
          type: 'purpose',
        },
        {
          id: 'pu8',
          type: 'purpose',
        },
      ],
    },
  ],
}

interface RouteMovement<
  TDraggable extends DragDroppable,
  TDroppable extends DragDroppable | null,
> {
  draggable: TDraggable
  droppable: TDroppable
}

type MoveProductToGroup = RouteMovement<Product, Group>
type MoveGroupProductPurposeToGroupProduct = RouteMovement<
  GroupProductPurpose,
  GroupProduct
>
type RemoveGroupProductPurpose = RouteMovement<GroupProductPurpose, null>
type RemoveGroupProduct = RouteMovement<GroupProduct, null>

type MovePurposeToGroupProduct = RouteMovement<Purpose, GroupProduct>
type MovePurposeToGroupProductPurpose = RouteMovement<
  Purpose,
  GroupProductPurpose
>

function isMoveProductToGroup(
  route: RouteMovement<DragDroppable, DragDroppable>,
): route is MoveProductToGroup {
  return isProduct(route.draggable) && isGroup(route.droppable)
}
function isMoveGroupProductPurposeToGroupProduct(
  route: RouteMovement<DragDroppable, DragDroppable>,
): route is MoveGroupProductPurposeToGroupProduct {
  return (
    isGroupProductPurpose(route.draggable) && isGroupProduct(route.droppable)
  )
}
function isRemoveGroupProductPurpose(
  route: RouteMovement<DragDroppable, null>,
): route is RemoveGroupProductPurpose {
  return isGroupProductPurpose(route.draggable) && route.droppable === null
}
function isRemoveGroupProduct(
  route: RouteMovement<DragDroppable, null>,
): route is RemoveGroupProduct {
  return isGroupProduct(route.draggable) && route.droppable === null
}
function isMovePurposeToGroupProduct(
  route: RouteMovement<DragDroppable, DragDroppable>,
): route is MovePurposeToGroupProduct {
  return isPurpose(route.draggable) && isGroupProduct(route.droppable)
}
function isMovePurposeToProductPurpose(
  route: RouteMovement<DragDroppable, DragDroppable>,
): route is MovePurposeToGroupProductPurpose {
  return isPurpose(route.draggable) && isGroupProductPurpose(route.droppable)
}

interface Route {
  groupId?: string
  productId?: string
  purposeId?: string
}

const handleMove = (
  routes: Route[],
  movement: RouteMovement<DragDroppable, DragDroppable | null>,
) => {
  if (
    movement.droppable &&
    isProduct(movement.draggable) &&
    isGroup(movement.droppable)
  ) {
    return [
      ...routes,
      {
        groupId: movement.droppable.id,
        productId: movement.draggable.id,
      },
    ]
  }
  if (
    movement.droppable &&
    isGroupProductPurpose(movement.draggable) &&
    isGroupProduct(movement.droppable)
  ) {
    const { product, purpose, group } = movement.draggable
    return [
      ...routes.filter(
        (route) =>
          route.groupId !== group.id &&
          route.productId !== product.id &&
          route.purposeId !== purpose.id,
      ),
      {
        groupId: movement.droppable.group.id,
        productId: movement.droppable.product.id,
        purposeId: movement.draggable.purpose.id,
      },
    ]
  }
  if (
    isGroupProductPurpose(movement.draggable) &&
    movement.droppable === null
  ) {
    const { product, purpose, group } = movement.draggable
    return routes.filter(
      (route) =>
        movement &&
        route.productId !== product.id &&
        route.purposeId !== purpose.id &&
        route.groupId !== group.id,
    )
  }
  if (isGroupProduct(movement.draggable) && movement.droppable === null) {
    const { product, group } = movement.draggable
    return routes.filter(
      (route) =>
        movement &&
        route.productId !== product.id &&
        route.groupId !== group.id,
    )
  }
  if (
    isPurpose(movement.draggable) &&
    movement.droppable &&
    isGroupProduct(movement.droppable)
  ) {
    return [
      ...routes,
      {
        groupId: movement.droppable.group.id,
        productId: movement.droppable.product.id,
        purposeId: movement.draggable.id,
      },
    ]
  }
  if (
    isPurpose(movement.draggable) &&
    movement.droppable &&
    isGroupProductPurpose(movement.droppable)
  ) {
    const { product, purpose, group } = movement.droppable
    const groupProductPurposeIndex = routes.findIndex(
      (route) =>
        route.groupId === group.id &&
        route.productId === product.id &&
        route.purposeId === purpose.id,
    )
    const newRoutes = [...routes]
    newRoutes.splice(groupProductPurposeIndex, 0, {
      groupId: movement.droppable.group.id,
      productId: movement.droppable.product.id,
      purposeId: movement.draggable.id,
    })
    return newRoutes
  }
}

function GroupProductPurposeCard({
  groupProductPurpose,
  index,
  groupProductPurposes,
}: {
  groupProductPurpose: GroupProductPurpose
  index: number
  groupProductPurposes: GroupProductPurpose[]
}) {
  const { draggedItem, draggedOverItem, compareItems } =
    useDragAndDrop<DragDroppable>()
  const dropItemAttributes =
    useDropItemAttributes<GroupProductPurpose>(groupProductPurpose)
  const dragItemAttributes =
    useDragItemAttributes<GroupProductPurpose>(groupProductPurpose)

  const effectiveGroupProduct = groupProductPurposes[index]
  return (
    <div {...dropItemAttributes}>
      <div {...dragItemAttributes}>
        <div
          style={{
            border: '1px dotted white',
            padding: '16px',
            gap: '16px',
            display: 'flex',
          }}
        >
          {effectiveGroupProduct.purpose.id}
        </div>
      </div>
    </div>
  )
}

function GroupProductCard({
  groupProduct,
  index,
  groupProducts,
}: {
  groupProduct: GroupProduct
  index: number
  groupProducts: GroupProduct[]
}) {
  const { draggedItem, draggedOverItem, compareItems, sortItems } =
    useDragAndDrop<DragDroppable>()

  const effectiveGroupProduct = groupProducts[index]
  const dropItemAttributes = useDropItemAttributes(groupProduct)
  const dragItemAttributes = useDragItemAttributes(groupProduct)
  const effectiveGroupProductPurposes =
    effectiveGroupProduct.product.purposes.map((purpose) => ({
      type: `group-product-purpose`,
      id: `${effectiveGroupProduct.group.id}-${effectiveGroupProduct.product.id}-${purpose.id}`,
      purpose,
      product: effectiveGroupProduct.product,
      group: effectiveGroupProduct.group,
    })) as GroupProductPurpose[]
  const sortedEffectiveGroupProductPurposes = sortItems<GroupProductPurpose>(
    effectiveGroupProductPurposes,
  )
  return (
    <div
      {...dropItemAttributes}
      style={{
        border: '1px dotted white',
      }}
    >
      <div {...dragItemAttributes}>
        <div
          style={{
            padding: '16px',
            gap: '16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>{effectiveGroupProduct.id}</div>
          {sortedEffectiveGroupProductPurposes.map(
            (groupProductPurpose, index) => (
              <GroupProductPurposeCard
                key={effectiveGroupProductPurposes[index]?.id ?? index}
                groupProductPurpose={effectiveGroupProductPurposes[index]}
                index={index}
                groupProductPurposes={sortedEffectiveGroupProductPurposes}
              />
            ),
          )}
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  product,
  index,
  products,
}: {
  product: Product
  index: number
  products: Product[]
}) {
  const { draggedItem, draggedOverItem, compareItems, sortItems } =
    useDragAndDrop<DragDroppable>()

  const effectiveProduct = products[index]
  const dropItemAttributes = useDropItemAttributes(product)
  const dragItemAttributes = useDragItemAttributes(product)

  return (
    <div
      {...dropItemAttributes}
      style={{
        border: '1px dotted white',
      }}
    >
      <div {...dragItemAttributes}>
        <div
          style={{
            padding: '16px',
            gap: '16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>{effectiveProduct.id}</div>
        </div>
      </div>
    </div>
  )
}

function GroupCard({ group }: { group: Group }) {
  const { draggedItem, sortItems } = useDragAndDrop<DragDroppable>()
  const dropItemAttributes = useDropItemAttributes(group)
  const groupProducts = group.products.map((product) => ({
    id: `${group.id}-${product.id}`,
    type: 'group-product',
    product,
    group,
  }))
  const sortedGroupProducts = sortItems<GroupProduct>(
    groupProducts as GroupProduct[],
  )
  return (
    <div
      {...dropItemAttributes}
      style={{
        minHeight: 200,
        border: '1px dotted white',
        opacity: draggedItem === group ? 0.5 : 1,
        padding: '16px',
        gap: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>{group.id}</h1>
      <div
        style={{
          gap: '16px',
          display: 'flex',
        }}
      >
        {sortedGroupProducts.map((sortedGroupProduct, index) => (
          <GroupProductCard
            key={groupProducts[index]?.id ?? index}
            groupProduct={groupProducts[index] as GroupProduct}
            index={index}
            groupProducts={sortedGroupProducts as GroupProduct[]}
          />
        ))}
      </div>
    </div>
  )
}

function Products({ products }: { products: Product[] }) {
  const { draggedItem, draggedOverItem, compareItems, sortItems } =
    useDragAndDrop<DragDroppable>()
  const sortedProducts = sortItems<Product>(products)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {sortedProducts.map((product, index) => (
        <ProductCard
          key={products[index]?.id || index}
          product={product}
          index={index}
          products={sortedProducts}
        />
      ))}
    </div>
  )
}

export default function DragAndDropContextPlayground() {
  return (
    <DragAndDropProvider<Draggable>
      isDraggable={(draggedItem) => true}
      isDroppable={(draggedItem, draggedOverItem) => {
        return (
          draggedItem.type === draggedOverItem.type ||
          (draggedOverItem.type === 'group' &&
            draggedItem.type === 'product') ||
          (draggedOverItem.type === 'group-product' &&
            draggedItem.type === 'product')
        )
      }}
      compareItems={(item1, item2) => item1.id === item2.id}
      onDrop={(draggedItem, draggedOverItem) => {
        console.log(draggedItem.id, draggedOverItem.id)
      }}
    >
      <GroupCard group={group} />
      <div
        style={{
          display: 'flex',
        }}
      >
        <Products products={products} />
        <div></div>
      </div>
    </DragAndDropProvider>
  )
}
