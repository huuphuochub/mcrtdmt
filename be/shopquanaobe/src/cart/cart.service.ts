import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './cartItem.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartrepo:Repository<Cart>,

        @InjectRepository(CartItem)
        private cartitemrepo:Repository<CartItem>
    ){}
    async Addcart(id_user: number, body: any) {
            try {
            let cart = await this.cartrepo.findOneBy({ id_user });

            // Nếu chưa có cart thì tạo mới
            if (!cart) {
            cart = this.cartrepo.create({ id_user });
            cart = await this.cartrepo.save(cart);
            }

            // Kiểm tra cartitem có tồn tại chưa
            const existItem = await this.cartitemrepo.findOneBy({
            cart_id: cart.id,
            product_id: body.product_id,
            size_id: body.size_id,
            color_id: body.color_id,
            });

            if (!existItem) {
            // Tạo mới cartitem
            let newItem = this.cartitemrepo.create({
                cart_id: cart.id,
                product_id: body.product_id,
                size_id: body.size_id,
                color_id: body.color_id,
                quantity: body.quantity,
            });
            newItem = await this.cartitemrepo.save(newItem);

            return {
                success: true,
                message: 'Đã thêm vào giỏ hàng',
                data: newItem,
            };
            } else {
            // Cập nhật số lượng
            existItem.quantity += body.quantity;
            const updatedItem = await this.cartitemrepo.save(existItem);

            return {
                success: true,
                message: 'Đã cập nhật số lượng trong giỏ hàng',
                data: updatedItem,
            };
            }
        } catch (error) {
            return {
            success: false,
            message: 'Lỗi khi thêm giỏ hàng',
            data: error,
            };
        }
        }

    async Getallcartitem(id_user:number){
        try {
            const cart = await this.cartrepo.findOneBy({id_user:id_user})
            if(!cart){
                return{
                    success:false,
                    message:'loi khi lay gio hang',
                    data:null
                }
            }else{
                const cartitem = await this.cartitemrepo.findBy({cart_id:cart.id})
                return{
                    success:true,
                    message:'',
                    data:cartitem
                }
            }
        } catch (error) {
            return{
                success:false,
                message:'loi k lay dc gio hang',
                data:null,
            }
        }
    }

}
