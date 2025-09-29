import Categorypage from "../page/Category/categorypage";
import Productdetailpage from "../page/productdetail/productdetailpage";
import SubCategorypage from "../page/Category/subcategorypage";

export default async function Page({
  params,
  searchParams 
}: {
  params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string, keyword?: string, bestselling?:string, rating:string,discount:string,newdate:string,minprice:string,maxprice:string } >

}) {
  const { slug } = await params; // 👈 chỗ này phải await
  const query = await searchParams; // 👈 phải await

  const isProduct = slug.includes("-i.");

  if (isProduct) {
    const [, idPart] = slug.split("-i.");
    const [shopid, itemid] = idPart.split(".");

    const res = await fetch(
      `http://localhost:3001/product/productdetail/${itemid}`,
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    // console.log(json);
    

    return (
      <Productdetailpage
        itemid={Number(itemid)}
        shopid={Number(shopid)}
        productprop={json}
      />
    );
  } else if (slug.includes("-shop.")) {
    const username = slug.replace("-shop.", "");
    return <div>day la trang gio hang {username}</div>;
  } else if (slug.includes("-cat.")) {
    const catId = slug.split(".").pop();
    const page = query.page;
    const keyword = query.keyword;
    const bestselling = query.bestselling;
    const rating = query.rating;
    const discount = query.discount;
    const newdate = query.newdate;
    const minprice = query.minprice;
    const maxprice = query.maxprice;
    console.log(page,keyword,bestselling,rating,discount,newdate,minprice,maxprice);
    

    const res = await fetch(
      `http://localhost:3001/category/getjsoncategory/${catId}?page=${page}&keyword=${keyword}&bestselling=${bestselling}&rating=${rating}&discount=${discount}&newdate=${newdate}&minprice=${minprice}&maxprice=${maxprice}&subcate=0`,
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    return <Categorypage categoryprop={json} />;
  } else if (slug.includes("-subcat.")) {
    const subcatid = slug.split(".").pop();
    const page = query.page;
    const keyword = query.keyword;
    const bestselling = query.bestselling;
    const rating = query.rating;
    const discount = query.discount;
    const newdate = query.newdate;
    const minprice = query.minprice;
    const maxprice = query.maxprice;
    const res = await fetch(
      `http://localhost:3001/category/getjsonsubcategory/${subcatid}?page=${page}&keyword=${keyword}&bestselling=${bestselling}&rating=${rating}&discount=${discount}&newdate=${newdate}&minprice=${minprice}&maxprice=${maxprice}`,
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    return <SubCategorypage categoryprop={json} />;
  }

  return <div>dd tahy trang nao</div>;
}
