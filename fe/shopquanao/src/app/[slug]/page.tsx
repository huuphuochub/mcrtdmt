import Categorypage from "../page/Category/categorypage";
import Productdetailpage from "../page/productdetail/productdetailpage";
interface Props {
  params: {
    slug: string;
  };
}
export default function Page({params}:Props){
    const {slug} = params;

  const isProduct = slug.includes('-i.');

  if(isProduct){
    const [_, idPart] = slug.split('-i.');
    const [shopid, itemid] = idPart.split('.'); 
    return(<Productdetailpage/>)

}else{
        const username = slug.replace('shop-', '');
        return(
            <Categorypage/>
        )
}


}
