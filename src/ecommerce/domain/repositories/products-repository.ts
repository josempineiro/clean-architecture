import { Repository } from "@/core/domain/repository";
import { Product } from "@/ecommerce/domain/entities/product";

export interface ProductsRepository extends Repository<Product> {}