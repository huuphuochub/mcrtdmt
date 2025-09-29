    import axiosClient from "@/lib/axiosclient";

    interface bodyfilter{
        page:number,
        keyword:string | undefined,
        category:number,
        subcate:number,
        bestselling:number,
        rating:number,
        discount:number,
        newdate:number,
        minprice:number,
        maxprice:number,

    }

    const Addproduct =async(data:FormData)=>{
        try {
            const result = await axiosClient.post('/product/add',data);
            return{success:true,data:result.data}
        } catch (error) {
    return {
          success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
    };
        }
    }
    const getAllproduct = async(page:number,limit:number) =>{
        try {
            const result = await axiosClient.get('/product/getallproduct', {
                params:{
                    limit,
                    page
                }
            });
            // console.log(result);
            
            return result;
        } catch (error) {
            return {
             success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
            };
        }
    }

    const getBesellerproduct = async() =>{
        try {
            const result = await axiosClient.get('/product/bestseller');
            // console.log(result);
            
            return result;
        } catch (error) {
            return {
             success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
            };
        }
    }
    const getproductdetail = async(id:number)=>{
        try {
            const result = await axiosClient.get(`/product/productdetail/${id}`)
            return result;
        } catch (error) {
            return {
             success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
            }; 
        }
    }
    const getsizebyidproduct = async(id:number)=>{
        try {
            const result = await axiosClient.get(`/product/getsizebyproduct/${id}`);
            return result;
        } catch (error) {
            return {
              success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
            };
            
        }
    }

    const searchproduct =async(data:any)=>{
        try {
            const result = await axiosClient.post('/product/searchproductkeypage',data);
            
            return result
        } catch (error) {
    return {
          success: false,
            code:  'UNKNOWN_ERROR',
            message: error,
            data:null
    };
        }
    }

    const AddKeywordSearch =async(body:any) =>{
        try {
            const result = await axiosClient.post('/product/addserch',body)
        } catch (error) {
            
        }
    }

    const getHistorysearch = async() =>{
        try {
            const search = await axiosClient.get('/users/gethistorysearch');
            return search
        } catch (error) {
            return{
                success:false,
                message:'loi',
                data:null,
            }
        }
    }

    const deletehistory = async(id:number)=>{
        try {
            const xoa = await axiosClient.delete(`/users/deletesearch/${id}`);
            return xoa
        } catch (error) {
            return{
                success:false,
                message:'loi',
                data:null,
            }
        }
    }

    const GetBestsell = async(page:any)=>{
        // console.log("hahahahahha" ,page);
        
        try {
            const body = {
                page:page
            }
            const prd = await axiosClient.post('/product/getbestselling',body)
            return prd
        } catch (error) {
            return{
                success:false,
                message:'khong gui dc',
                data:null
            }
        }
    }

        const GetRating = async(page:any)=>{
        // console.log("hahahahahha" ,page);
        
        try {
            const body = {
                page:page
            }
            const prd = await axiosClient.post('/product/getrating',body)
            return prd
        } catch (error) {
            return{
                success:false,
                message:'khong gui dc',
                data:null
            }
        }
    }

            const GetNewProduct = async(page:any)=>{
        // console.log("hahahahahha" ,page);
        
        try {
            const body = {
                page:page
            }
            const prd = await axiosClient.post('/product/getnewproduct',body)
            return prd
        } catch (error) {
            return{
                success:false,
                message:'khong gui dc',
                data:null
            }
        }
    }


    const FilterPrd = async(body:bodyfilter) =>{
        try {
            const products = await axiosClient.post('/product/filter/user',body)
            return products
        } catch (error) {
            return{
                success:false,
                data:null,
                message:'không gửi đc'
            }
        }
    }

    const AddFavourite=async(product_id:number) =>{
        try {
            const ok = await axiosClient.post('/product/favourite/add',{product_id:product_id})
            return ok
        } catch (error) {
            return {
                success:false,
                message:'khong gui dc',
                data:null
            }
        }
    }

        const deLeteFv=async(product_id:number) =>{
        try {
            const ok = await axiosClient.post('/product/favourite/delete',{product_id:product_id})
            return ok
        } catch (error) {
            return {
                success:false,
                message:'khong gui dc',
                data:null
            }
        }
    }

        const CheckFv=async(product_id:number) =>{
        try {
            const ok = await axiosClient.post('/product/favourite/check',{product_id:product_id})
            return ok
        } catch (error) {
            return {
                success:false,
                message:'khong gui dc',
                data:null
            }
        }
    }

    const GetAllFavourite =async(page:number) =>{
        try {
            const prds = await axiosClient.get('product/all/favourite',{params:{page:page}})
            return prds 
        } catch (error) {
            return{
                success:false,
                data:null,
                message:'loi k gui dc'
            }
        }
    }

    const GetAllProductSeller=async(seller_id:number,page:number) =>{
        try {
            const prds = await axiosClient.get('product/all/seller',{params:{seller_id:seller_id,page:page,limit:12}})
            return prds 
        } catch (error) {
            return{
                success:false,
                data:null,
                message:'loi k gui dc'
            }
        }
    }


    export {GetAllProductSeller,GetAllFavourite,deLeteFv,CheckFv,AddFavourite,FilterPrd,GetNewProduct,GetRating,GetBestsell,Addproduct,getAllproduct,getBesellerproduct,getproductdetail,getsizebyidproduct,searchproduct,AddKeywordSearch,getHistorysearch,deletehistory}