import Categorypage from "../page/Category/categorypage";
import Productdetailpage from "../page/productdetail/productdetailpage";
import SubCategorypage from "../page/Category/subcategorypage";
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

}else if(slug.includes('-shop.')){
        const username = slug.replace('-shop.', '');
        return(
            // <Categorypage/>
            <div>day la trang gio hang</div>
        )
}else if(slug.includes('-cat.')){
  
  const catId = slug.split(".").pop();
  // console.log(catId);
  
  const res = await fetch(`http://localhost:3001/category/getjsoncategory/${catId}`,
    { cache: "no-store" }
  )  
  const json = await res.json();
// console.log(json);
  
  return(
    <Categorypage
    categoryprop={json}
    
    />
  ) 
}else if(slug.includes('-subcat.')){
    const subcatid = slug.split('.').pop();
     const res = await fetch(`http://localhost:3001/category/getjsonsubcategory/${subcatid}`,
    { cache: "no-store" }
  )  
  const json = await res.json();
console.log(json);
  
  return(
    <SubCategorypage
    categoryprop={json}
    
    />

  ) 
    
}


else {
  return(
    <div>
      dd tahy trang nao
    </div>
  )
}


}
