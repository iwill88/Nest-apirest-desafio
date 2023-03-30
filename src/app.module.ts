import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL,{
      serverSelectionTimeoutMS: 5000,
  }),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
