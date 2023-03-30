import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose/dist";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>
@Schema()
export class Product {


    @Prop({required:true})
    timestamp: string;

    @Prop({required:true})
    title:string;

    @Prop({required:true})
    author:string;

    @Prop({required:true})
    description:string;

    @Prop({required:true})
    code:string;

    @Prop({required:true})
    thumbnail:string;

    @Prop({required:true})
    price:number;
    
    @Prop({required:true})
    stock:number;

    @Prop({required:true})
    category:string
    
}

export const ProductSchema = SchemaFactory.createForClass(Product);