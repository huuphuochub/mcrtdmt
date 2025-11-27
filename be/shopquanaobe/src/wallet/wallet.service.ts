import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './bank.entity';
import { History } from './hisstory.entity';

@Injectable()
export class WalletService {
    constructor (
        @InjectRepository(Wallet)
        private walletRepo:Repository<Wallet>,

        @InjectRepository(Bank)
        private bankRepo:Repository<Bank>,

        @InjectRepository(History)
        private historyRepo:Repository<History>,

         private dataSource: DataSource 
    ){}

   async GetWallet(seller_id: number) {
  try {
    const data = await this.walletRepo.findOne({
      where: { seller: { id: seller_id } }, // đúng
      relations: ['bank'],                 // load relation
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  }

  async AddBank(body:any){
    try {
      const add = this.bankRepo.create({
        wallet:{id:body.wallet_id},
        account_name:body.account_name,
        account_number:body.account_number,
        namebank:body.namebank,
        image:body.image,
      });

      const banknew = await this.bankRepo.save(add);
      return {
        success:true,
        data:banknew,
        message:'ok'

      }
    } catch (error) {
      return{
        success:false,
        data:null,
        message:'loi service',
      }
    }
  }



async Deposit(body: any) {
  // body :{
// wallet_id:number,
// total_amount:number
//  }
  try {
    return await this.dataSource.transaction(async manager => {
      const wallet = await manager.findOne(Wallet, {
        where: { id: body.wallet_id },
        lock: { mode: "pessimistic_write" } 
      });

      if (!wallet) {
        return {
          success: false,
          data: null,
          message: "error_wallet_not_exist"
        };
      }

      // 2. Cập nhật số dư
      wallet.availableBalance += Number(body.total_amount);
      await manager.save(wallet);

      // 3. Ghi lịch sử giao dịch
      const history = manager.create(History, {
        wallet: { id: body.wallet_id },
        total_amount: body.total_amount,
        type: 0,      
        status: 0     
      });

      await manager.save(history);

      return {
        success: true,
        data: {
          wallet_id: wallet.id,
          balance: wallet.availableBalance
        },
        message: "deposit_success"
      };
    });

  } catch (error) {
    console.error(error);
    // luu lich su khi that bai
    const addhistory =  this.historyRepo.create({
      wallet:{id:body.wallet_id},
      total_amount:body.total_amount,
      type:0,
      status:1
    })
    const save = this.historyRepo.save(addhistory)
    return {
      success: false,
      data: null,
      message: "server_error"
    };
  }
}

async Withdraw(body: any) {
  // body :{
// wallet_id:number,
// total_amount:number
//  }
  try {
    return await this.dataSource.transaction(async manager => {
      const wallet = await manager.findOne(Wallet, {
        where: { id: body.wallet_id },
        lock: { mode: "pessimistic_write" } 
      });

      if (!wallet) {
        return {
          success: false,
          data: null,
          message: "error_wallet_not_exist"
        };
      }

      // 2. Cập nhật số dư
      wallet.availableBalance -= Number(body.total_amount);
      await manager.save(wallet);

      // 3. Ghi lịch sử giao dịch
      const history = manager.create(History, {
        wallet: { id: body.wallet_id },
        total_amount: body.total_amount,
        type: 1,      
        status: 0     
      });

      await manager.save(history);

      return {
        success: true,
        data: {
          wallet_id: wallet.id,
          balance: wallet.availableBalance
        },
        message: "deposit_success"
      };
    });

  } catch (error) {
    console.error(error);
    // luu lich su khi that bai
    const addhistory =  this.historyRepo.create({
      wallet:{id:body.wallet_id},
      total_amount:body.total_amount,
      type:1,
      status:1
    })
    const save = this.historyRepo.save(addhistory)
    return {
      success: false,
      data: null,
      message: "server_error"
    };
  }
}

async GetHistory(seller_id:number){
  try {
    const data = await this.walletRepo.findOne({
      where:{seller:{id:seller_id}},
      relations:['history'],
    })
    return {
      success:true,
      data:data?.history,
      message:'thanh cong',
    }
  } catch (error) {
    return{
      success:false,
      data:null,
      message:'that bai' + error.message,
    }
  }
}

async DeleteBank(body:any){
  try {
    const bank = await this.bankRepo.findOne({
      where:{id:body.bankId}
    });

    if(!bank){
      return{
        success:false,
        data:null,
        message:'bank khong ton tai'
      }
    }
    await this.bankRepo.remove(bank);

    return{
      success:true,
      data:null,
      message:'xoa bank thanh cong'
    }
  } catch (error) {
    return{
      success:false,
      data:null,
      message:'loi xoa bank' + error.message,
    }

  }
}


}


// withdraw

// type
// nap la 0
// rut la 1
// + khi don hang thanh cong la 2




// status 
// 0 la thanh cong
//  1 la that bai