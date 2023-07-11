"use client"; // This is a client component
import React from "react";
import PageListCards from "@/components/listingPage/PageListCards";
import { client } from "@/lib/contentful/client";
import { useEffect, useState } from "react";
import { getApiRoot, projectKey } from "@/lib/commerceTools";

const ProductsCategoryPage = ({ params }) => {
  console.log("params", params);

  const [categoryList, setHeroCategoryList] = useState([]);

  const [categoryDetails, setCategoryDetails] = useState({});

  const [productDetails, setProductDetails] = useState({});

  const getCategoryId = async () => {
    try {
      const project = await getApiRoot()
        .withProjectKey({ projectKey })
        //.products()
        .categories()
        //.customers()
        .get()
        .execute();
      // .get()
      // .execute();

      setCategoryDetails(project.body);
    } catch (e) {
      console.log(e);
    }
  };

  const getProductId = async () => {
    try {
      const project = await getApiRoot()
        .withProjectKey({ projectKey })
        .products()
        //.categories()
        //.customers()
        .get()
        .execute();
      // .get()
      // .execute();

      setProductDetails(project.body);
    } catch (e) {
      console.log(e);
    }
  };
  const getCategory = async () => {
    // const response = await client.getEntries({ content_type: "product" });
    const responseProduct = await client.getEntries({
      content_type: "ourProducts",
    });

    //   const categoryData = response.items;
    const categorySlug = params?.category;
    const filteredProduct = responseProduct?.items[0]?.fields?.product?.filter(
      (item) =>
        categorySlug ? item.fields.commercetoolsProduct === categorySlug : true
    );
    setHeroCategoryList(filteredProduct);

    // console.log("categoryData", categoryData);
    console.log("ourproducts", responseProduct.items);
  };

  useEffect(() => {
    getCategory();
    getCategoryId();
    getProductId();
  }, []);

  // console.log("projectDetails", categoryDetails.results);
  // console.log("productDetails", productDetails.results);
  // console.log("projectDetails", JSON.stringify(projectDetails, undefined, 2));
  return (
    <div>
      <PageListCards
        catData={categoryList}
        categoryLists={categoryDetails}
        allProducts={productDetails}
      ></PageListCards>
    </div>
  );
};

export default ProductsCategoryPage;
