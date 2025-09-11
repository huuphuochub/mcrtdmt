import Categorypage from "../page/Category/categorypage";
import Productdetailpage from "../page/productdetail/productdetailpage";
import SubCategorypage from "../page/Category/subcategorypage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 👈 chỗ này phải await

  const isProduct = slug.includes("-i.");

  if (isProduct) {
    const [, idPart] = slug.split("-i.");
    const [shopid, itemid] = idPart.split(".");

    const res = await fetch(
      `http://localhost:3001/product/productdetail/${itemid}`,
      { cache: "no-store" }
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
    const res = await fetch(
      `http://localhost:3001/category/getjsoncategory/${catId}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    return <Categorypage categoryprop={json} />;
  } else if (slug.includes("-subcat.")) {
    const subcatid = slug.split(".").pop();
    const res = await fetch(
      `http://localhost:3001/category/getjsonsubcategory/${subcatid}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    return <SubCategorypage categoryprop={json} />;
  }

  return <div>dd tahy trang nao</div>;
}
