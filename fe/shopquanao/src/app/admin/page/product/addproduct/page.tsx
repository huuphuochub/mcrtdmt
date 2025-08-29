"use client";
import React, { useState, useEffect } from "react";
import { Category } from "@/interface/category.interface";
import { Getallcategory, Getsubcatygorybyid } from "@/service/categoryservice";
import { Subcategory } from "@/interface/category.interface";
import { Addproduct as AddProductService } from "@/service/product.service";
import Image from "next/image";

interface FormErrors {
  name?: string;
  price?: string;
  discountprice?: string;
  describe?: string;
  category?: string;
  subcategory?: string;
  origin?: string;
  production?: string;
  visibility?: string;
  mainImage?: string;
  subImage?: string;
  quantity?:string;
}

export default function Addproduct() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [previewMain, setPreviewMain] = useState<string | null>(null);
  // const [quantity,setQuantity] = useState<number>(0)
  const [subImage, setSubImage] = useState<File[]>([]);
  const [previewSub, setPreviewSub] = useState<string[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [subcates, setSubcates] = useState<Subcategory[]>([]);
  const [idcategory, setIdcategory] = useState<number>(0);
  const [idsubcategory, setIdsubcategory] = useState<number>(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setFile: React.Dispatch<React.SetStateAction<File | null>>, 
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      // Clear error when image is selected
      setErrors(prev => ({ ...prev, mainImage: undefined }));
    }
  };

  const getsubcategorybyid = async (id: number) => {
    // console.log(id);
    
    setIdcategory(id);
    const subcate = await Getsubcatygorybyid(id);
    // console.log(subcate);
    
    if (subcate.success) {
      // console.log(subcate.data.result);
      setSubcates(subcate.data.data);
    }
  };

  const changesubcate = (id: number) => {
    setIdsubcategory(id);
    // Clear error when subcategory is selected
    setErrors(prev => ({ ...prev, subcategory: undefined }));
  };

  useEffect(() => {
    getallcategory();
  }, []);

  const getallcategory = async () => {
    const allcate = await Getallcategory();
    // console.log(allcate.data);
    
    if (allcate.data.success) {
      // console.log(allcate.data.result);
      setCategorys(allcate.data.data);
    }
  };

  const handleSubimage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.slice(0, 3 - subImage.length);
    const newPreview = newFiles.map((file) => URL.createObjectURL(file));
    setSubImage((prev) => [...prev, ...newFiles]);
    setPreviewSub((prev) => [...prev, ...newPreview]);
    // Clear error when sub images are selected
    setErrors(prev => ({ ...prev, subImage: undefined }));
  };

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};

    // Validate name
    const name = formData.get('name') as string;
    if (!name || name.trim().length < 3) {
      errors.name = 'Tên sản phẩm phải có ít nhất 3 ký tự';
    }

    // Validate price
    const price = formData.get('price') as string;
    if (!price || parseFloat(price) <= 0) {
      errors.price = 'Giá phải lớn hơn 0';
    }

    // Validate discount price
    const discountprice = formData.get('discountprice') as string;
    if (discountprice && parseFloat(discountprice) >= parseFloat(price)) {
      errors.discountprice = 'Giá khuyến mãi phải nhỏ hơn giá gốc';
    }

    // Validate description
    const describe = formData.get('describe') as string;
    if (!describe || describe.trim().length < 10) {
      errors.describe = 'Mô tả phải có ít nhất 10 ký tự';
    }

    // Validate category
    if (idcategory === 0) {
      errors.category = 'Vui lòng chọn danh mục';
    }

    // Validate subcategory
    if (idsubcategory === 0) {
      errors.subcategory = 'Vui lòng chọn danh mục con';
    }

    // validate quantity
    const quantity = formData.get('quantity' ) as string;
    if(!quantity || parseFloat(quantity) <=0){
      errors.quantity = "vui long nhap so luong"
    }
    // Validate origin
    const origin = formData.get('origin') as string;
    if (!origin || origin.trim().length < 2) {
      errors.origin = 'Xuất xứ phải có ít nhất 2 ký tự';
    }

    // Validate production date
    const production = formData.get('producttion') as string;
    if (!production) {
      errors.production = 'Vui lòng chọn ngày sản xuất';
    }

    // Validate visibility
    const visibility = formData.get('visibility') as string;
    if (!visibility) {
      errors.visibility = 'Vui lòng chọn trạng thái hiển thị';
    }

    // Validate main image
    if (!mainImage) {
      errors.mainImage = 'Vui lòng chọn ảnh chính';
    }

    // Validate sub images (optional but if selected, validate)
    if (subImage.length > 0 && subImage.length < 1) {
      errors.subImage = 'Nếu chọn ảnh phụ, phải có ít nhất 1 ảnh';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formData = new FormData(e.currentTarget);
    
    // Add category and subcategory IDs
    formData.append('categoryId', idcategory.toString());
    formData.append('subcategoryId', idsubcategory.toString());

    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Add images to FormData
    if (mainImage) {
      formData.append('mainImage', mainImage);
    }

    subImage.forEach((file) => {
      formData.append(`subImages`, file);
    });

    try {
      // const tempObj:any = {};
      // formData.forEach((value, key) => {
      //   tempObj[key] = value;
      // });
      // console.log(tempObj);

      const result = await AddProductService(formData);
      if (result.success) {
        setSubmitMessage({ type: 'success', message: 'Thêm sản phẩm thành công!' });
        // Reset form
        e.currentTarget.reset();
        setMainImage(null);
        setPreviewMain(null);
        setSubImage([]);
        setPreviewSub([]);
        setIdcategory(0);
        setIdsubcategory(0);
        setSubcates([]);
        setErrors({});
      } else {
        setSubmitMessage({ type: 'error', message: 'Có lỗi xảy ra khi thêm sản phẩm' });
      }
    } catch {
      setSubmitMessage({ type: 'error', message: 'Có lỗi xảy ra khi thêm sản phẩm' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">🛒 Thêm Sản Phẩm</h2>

      {submitMessage && (
        <div className={`mb-4 p-4 rounded ${
          submitMessage.type === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {submitMessage.message}
        </div>
      )}

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-sm font-semibold mb-1">Tên sản phẩm</label>
          <input
            type="text"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : ''
            }`}
            required
            name="name"
            onChange={() => setErrors(prev => ({ ...prev, name: undefined }))}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Giá */}
        <div>
          <label className="block text-sm font-semibold mb-1">Giá</label>
          <input
            type="number"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.price ? 'border-red-500' : ''
            }`}
            required
            name="price"
            min="0"
            onChange={() => setErrors(prev => ({ ...prev, price: undefined }))}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Giá khuyến mãi */}
        <div>
          <label className="block text-sm font-semibold mb-1">Giá khuyến mãi</label>
          <input
            type="number"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.discountprice ? 'border-red-500' : ''
            }`}
            name="discountprice"
            min="0"
            onChange={() => setErrors(prev => ({ ...prev, discountprice: undefined }))}
          />
          {errors.discountprice && <p className="text-red-500 text-sm mt-1">{errors.discountprice}</p>}
        </div>

        {/* so luong */}
        <div>
          <label className="block text-sm font-semibold mb-1">So luong</label>
          <input
            type="number"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.quantity ? 'border-red-500' : ''
            }`}
            name="quantity"
            min="0"
            onChange={() => setErrors(prev => ({ ...prev, quantity: undefined }))}
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        {/* Mô tả */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">Mô tả</label>
          <textarea
            className={`w-full border rounded px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.describe ? 'border-red-500' : ''
            }`}
            required
            name="describe"
            onChange={() => setErrors(prev => ({ ...prev, describe: undefined }))}
          />
          {errors.describe && <p className="text-red-500 text-sm mt-1">{errors.describe}</p>}
        </div>

        {/* Danh mục */}
        <div>
          <label className="block text-sm font-semibold mb-1">Danh mục</label>
          <select 
            className={`w-full border rounded px-4 py-2 ${
              errors.category ? 'border-red-500' : ''
            }`} 
            name="category" 
            onChange={(e) => {
              getsubcategorybyid(Number(e.target.value));
              setErrors(prev => ({ ...prev, category: undefined }));
            }}
          >
            <option value="">Chọn danh mục</option>
            {categorys.map((cate, index) => (
              <option key={index} value={cate.id}>{cate.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Danh mục con */}
        <div>
          <label className="block text-sm font-semibold mb-1">Danh mục con</label>
          <select 
            className={`w-full border rounded px-4 py-2 ${
              errors.subcategory ? 'border-red-500' : ''
            }`} 
            name="subcategory" 
            onChange={(e) => changesubcate(Number(e.target.value))}
            disabled={subcates.length === 0}
          >
            <option value="">Chọn danh mục con</option>
            {subcates.length > 0 && (
              subcates.map((subcate, index) => (
                <option key={index} value={subcate.id}>{subcate.name}</option>
              ))
            )}
          </select>
          {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory}</p>}
        </div>

        {/* Ảnh chính */}
        <div>
          <label className="block text-sm font-semibold mb-2">Chọn hình ảnh</label>
          <label className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Tải ảnh chính
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, setMainImage, setPreviewMain)}
            />
          </label>
          {previewMain && (
            <div className="mt-3">
              <Image
              height={128}
              width={128}
                src={previewMain}
                alt="preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
          {errors.mainImage && <p className="text-red-500 text-sm mt-1">{errors.mainImage}</p>}
        </div>

        {/* Ảnh phụ */}
        <div>
          <label className="block text-sm font-semibold mb-2">Hình ảnh phụ (tối đa 3)</label>

          <label className="cursor-pointer inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50">
            {subImage.length < 3 ? "Tải ảnh phụ" : "Đã đủ 3 ảnh"}
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={subImage.length >= 3}
              className="hidden"
              onChange={handleSubimage}
            />
          </label>

          {previewSub.length > 0 && (
            <div className="flex gap-3 mt-3 flex-wrap">
              {previewSub.map((src, idx) => (
                <div key={idx} className="relative w-24 h-24">
                  <Image
                  height={96}
                  width={96}
                    src={src}
                    alt={`sub-${idx}`}
                    className="w-full h-full object-cover rounded border"
                  />
                </div>
              ))}
            </div>
          )}
          {errors.subImage && <p className="text-red-500 text-sm mt-1">{errors.subImage}</p>}
        </div>

        {/* Xuất xứ */}
        <div>
          <label className="block text-sm font-semibold mb-1">Xuất xứ</label>
          <input
            type="text"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.origin ? 'border-red-500' : ''
            }`}
            required
            name="origin"
            onChange={() => setErrors(prev => ({ ...prev, origin: undefined }))}
          />
          {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin}</p>}
        </div>

        {/* Ngày sản xuất */}
        <div>
          <label className="block text-sm font-semibold mb-1">Ngày sản xuất</label>
          <input
            type="date"
            className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.production ? 'border-red-500' : ''
            }`}
            required
            name="producttion"
            onChange={() => setErrors(prev => ({ ...prev, production: undefined }))}
          />
          {errors.production && <p className="text-red-500 text-sm mt-1">{errors.production}</p>}
        </div>

        {/* Hiển thị/Ẩn */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Trạng thái hiển thị</label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="visibility" 
                value="1"
                className="accent-blue-600" 
                onChange={() => setErrors(prev => ({ ...prev, visibility: undefined }))}
              />
              Ẩn
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="visibility" 
                value="0"
                className="accent-blue-600" 
                onChange={() => setErrors(prev => ({ ...prev, visibility: undefined }))}
              />
              Hiện
            </label>
          </div>
          {errors.visibility && <p className="text-red-500 text-sm mt-1">{errors.visibility}</p>}
        </div>

        {/* Submit button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </button>
        </div>
      </form>
    </div>
  );
}
