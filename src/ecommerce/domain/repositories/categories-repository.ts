import { Repository } from "@/core/domain/entities/repository";
import { Category } from "@/ecommerce/domain/entities/category";

export interface CategoriesRepository extends Repository<Category> {
}