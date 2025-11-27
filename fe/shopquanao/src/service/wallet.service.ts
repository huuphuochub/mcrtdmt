import axiosClient from "@/lib/axiosclient"

type BankBody ={
     wallet_id:number;
  namebank: string;
  account_number: string;
  account_name:string;
  image: string;

}
const FetchWallet = async() =>{
    try {
        const data = await axiosClient.get('/wallet/getwallet');
        return data
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi ở fe'
        }
    }
}
const AddWallet = async(body:BankBody) =>{
    try {
        const result = await axiosClient.post('/wallet/addbank',body);
        return result;
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }

}

const Deposit = async (body:{wallet_id:number,total_amount:number}) =>{
    try {
        const result = await axiosClient.post('/wallet/deposit',body);
        return result
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}

const Withdraw = async (body:{wallet_id:number,total_amount:number}) =>{
    try {
        const result = await axiosClient.post('/wallet/withdraw',body);
        return result
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}

const GetHistory = async () =>{
    try {
        const result = await axiosClient.get(`/wallet/gethistory`);
        return result;
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}
const deleteBank = async (bankId:number) =>{
    try {
        const result = await axiosClient.post(`/wallet/deletebank/`,{bankId:bankId});    
        return result;
    } catch (error) {
        return{
            success:false,
            data:null,
            message:'loi fe'
        }
    }
}


export {FetchWallet,AddWallet,Deposit,Withdraw,GetHistory,deleteBank}