import { Repository } from "@/core/domain/entities/repository";
import { Product } from "@/ecommerce/domain/entities/product";

export interface ProductsRepository extends Repository<Product> {}