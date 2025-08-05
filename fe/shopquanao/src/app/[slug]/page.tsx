import Categorypage from "../page/Category/categorypage";
import Productdetailpage from "../page/productdetail/productdetailpage";
interface Props {
  params: {
    slug: string;
  };
}
export default async function Page({params}:Props){
    const {slug} = params;

  const isProduct = slug.includes('-i.');

  if(isProduct){
    const [_, idPart] = slug.split('-i.');
    const [shopid, itemid] = idPart.split('.'); 
    const res = await fetch(
    `http://localhost:3001/product/productdetail/${itemid}`,
    { cache: "no-store" } // để luôn fetch mới
  );
  const json = await res.json();
  // console.log(json);
  
    return(<Productdetailpage

      itemid = {Number(itemid)}
      shopid = {Number(shopid)}
      productprop={json}
    />)

}else{
        const username = slug.replace('shop-', '');
        return(
            <Categorypage/>
        )
}


}
