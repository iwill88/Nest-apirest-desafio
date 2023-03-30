import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.schema';
import { ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) {}

  private readonly product: Product[] = [];

  async create(createProductDto: CreateProductDto) {

    try {
      let data = {
           timestamp:new Date().toISOString(),
           ...createProductDto,  
       }
       const product = await this.ProductModel.create(data);
       if (!product) {
           throw new Error(`No se creo el producto correctamente`);
       }
       return product
    } catch (err) {
          throw err;
    }
  }

  async findAll() {
    try {
      const products = await this.ProductModel.find({});
      if(!products) {
           throw new Error(`No se encontraron los productos`);
      }
      return products
      } catch (err) {
            throw err;
      }    
  }

  async findOne(id: string) {
    try {
      const product = await this.ProductModel.findOne({ _id: new ObjectId(id) });
      if (!product) {
           throw new Error(`No se encontró el producto con ID ${id}`);
      }
      return product;
      } catch (err) {
            throw err;
      } 
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      let updatedProduct = { 
           timestamp: new Date().toISOString(),
           ...updateProductDto
       };
      const result = await this.ProductModel.findOneAndUpdate({ _id: new ObjectId(id) },{$set:updatedProduct})
      if (!result) {
        
           throw new Error(`No se actualizó el producto con ID ${id}`);
         }
      return await this.ProductModel.findOne({ _id: new ObjectId(id) })
        
      } catch (err) {
  
            throw err;
      }
  }

  async remove(id: string) {
    try {
              
      const result = await this.ProductModel.deleteOne({ _id: new ObjectId(id) })
      if (!result){
        
        throw new Error(`No se borro el producto correctamente con ID ${id}`);
      }
      return 
   } catch (err) {
       
        throw err;
   }
  }
}
