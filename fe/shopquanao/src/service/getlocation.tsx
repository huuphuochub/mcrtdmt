// pages/api/province.ts
const  getprovince=async() =>{
  try {
    const response = await fetch('https://partner.viettelpost.vn/v2/categories/listProvinceById?provinceId=');
  const data = await response.json();
  return data;
  } catch (error) {
    console.error('Error fetching province data:', error);
    throw error;
  }
}

const getDistrict = async(provinId:number)=>{
const response = await fetch(`https://partner.viettelpost.vn/v2/categories/listDistrict?provinceId=${provinId}`);
  const data = await response.json();
  return data;

}


const getWards = async(districId:number)=>{
const response = await fetch(`https://partner.viettelpost.vn/v2/categories/listWards?districtId=${districId}`);
  const data = await response.json();
  return data;

}

export {getDistrict,getprovince,getWards}