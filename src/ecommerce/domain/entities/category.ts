import { Entity } from "@/core/domain"

export interface Category extends Entity {
  _type: 'Category'
  id: string
  name: string
  description: string
}
