import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProductRepository{
    constructor(private prisma: PrismaService){}

    async createProduct(body: any){
        return await this.prisma.product.create({
            data: body
        })
    }

    async findProducts(){
        return await this.prisma.product.findMany()
    }

    async findProduct(id: string){
        return await this.prisma.product.findUnique({
            where: {
                id: id
            }
        })
    }

}


