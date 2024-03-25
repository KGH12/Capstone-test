import React, { useState } from 'react';

function ProductRegistration() {
  const [category, setCategory] = useState({
    name: '',
    detail: '',
    genderCategory: 0,
    largeCategory: 0,
    smallCategory: 0,
    sellerEmail: ''
  });

  const [productDetail, setProductDetail] = useState({
    color: '',
    size: '',
    remaining: 0,
    price: 0,
    clothesId: 0
  });

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProductDetailChange = (e) => {
    const { name, value } = e.target;
    setProductDetail(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting category:', category);
    console.log('Submitting product detail:', productDetail);
    // 여기에 서버로 데이터를 전송하는 로직을 추가합니다.
  };

  return (
    <div>
      <h1>상품 등록</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <h2>상품 카테고리 등록</h2>
        <input type="text" name="name" value={category.name} onChange={handleCategoryChange} placeholder="Name" />
        <input type="text" name="detail" value={category.detail} onChange={handleCategoryChange} placeholder="Detail" />
        <input type="number" name="genderCategory" value={category.genderCategory} onChange={handleCategoryChange} placeholder="Gender Category" />
        <input type="number" name="largeCategory" value={category.largeCategory} onChange={handleCategoryChange} placeholder="Large Category" />
        <input type="number" name="smallCategory" value={category.smallCategory} onChange={handleCategoryChange} placeholder="Small Category" />
        <input type="email" name="sellerEmail" value={category.sellerEmail} onChange={handleCategoryChange} placeholder="Seller Email" />
        <h2>상품 상세 정보 등록</h2>
        <input type="text" name="color" value={productDetail.color} onChange={handleProductDetailChange} placeholder="Color" />
        <input type="text" name="size" value={productDetail.size} onChange={handleProductDetailChange} placeholder="Size" />
        <input type="number" name="remaining" value={productDetail.remaining} onChange={handleProductDetailChange} placeholder="Remaining" />
        <input type="number" name="price" value={productDetail.price} onChange={handleProductDetailChange} placeholder="Price" />
        <input type="number" name="clothesId" value={productDetail.clothesId} onChange={handleProductDetailChange} placeholder="Clothes ID" />
        <button type="submit">상품 등록</button>
      </form>
    </div>
  );
}

export default ProductRegistration;
