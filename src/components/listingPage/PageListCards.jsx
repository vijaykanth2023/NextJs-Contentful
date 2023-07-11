"use client"; // This is a client component
import React, { useMemo } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PageListCards = ({ catData, categoryLists, allProducts }) => {
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [items, setItems] = useState([]);
  const pathname = usePathname();
  console.log("pathname", pathname);
  const products = useMemo(() => catData || [], [catData]);
  const productsList = useMemo(() => categoryLists.results, [categoryLists]);

  const productByValue = useMemo(() => allProducts.results, [allProducts]);

  // const getProductKey = async () => {
  //   for (let i = 0; i < productsList?.length; i++) {
  //     let commerceToolsKey =
  //       productsList[i].masterData.staged.masterVariant.sku;
  //     setProductKey(commerceToolsKey);
  //     console.log("ProductKey", commerceToolsKey);
  //   }
  // };

  // const getContentfulKey = async () => {
  //   for (let j = 0; j < products?.length; j++) {
  //     let contentfulKey = products[j].fields.commercetoolsProduct;
  //     setContentKey(contentfulKey);
  //     console.log("contentfulKey", contentfulKey);
  //   }
  // };

  const getUpdatedCategory = () => {
    const newProducts = products?.map((product) => {
      const getCommerceItem = productsList?.find((item) => {
        return product?.fields?.commercetoolsCategory === item?.id;
      });

      const getCommerceProduct = productByValue?.find((prod) => {
        // console.log("prod", prod);
        return (
          product?.fields?.commercetoolsProduct ===
          prod?.masterData?.staged?.masterVariant?.sku
        );
      });

      product.commerceItem = getCommerceItem;
      product.commerceProduct = getCommerceProduct;

      return product;
    });

    setUpdatedProducts(newProducts);
  };

  // const getProductDetails = async () => {
  //   for (let i = 0; i < updatedProducts?.length; i++) {
  //     let allProductValue =
  //       updatedProducts[i]?.commerceProduct?.masterData?.staged?.masterVariant;
  //     setFullProducts(allProductValue);
  //     console.log("allProductValue", allProductValue);
  //   }
  // };

  // const getItems = async () => {
  //   const allItems = updatedProducts;
  //   const categoryItems = allItems.find(
  //     (item) => item?.commerceItem?.id === item?.fields?.commercetoolsCategory
  //   );
  //   setItems(categoryItems);
  // };

  useEffect(() => {
    // getItems();
    getUpdatedCategory();
    //getProductDetails();
  }, [productsList, products, allProducts]);

  //console.log("catData[0]?.fields?.product", catData[0]?.fields?.product);
  console.log("updatedProducts", updatedProducts);

  const isActive = pathname.match(
    `products/${updatedProducts[0]?.commerceItem?.slug?.en}`
  );
  console.log("isActive", isActive);
  console.log("productByValue", productByValue);
  // console.log("catitems", items);

  // console.log("fullProducts", fullProducts);
  // const ProductSkuValue = fullProducts?.staged?.masterVariant;
  // console.log("ProductSkuValue", ProductSkuValue);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {updatedProducts.map((item, index) => (
          <div
            className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4"
            key={index}
          >
            <article className="overflow-hidden rounded-lg shadow-lg card-list">
              <Link
                href={
                  isActive
                    ? `/product/${item?.commerceProduct?.key}}`
                    : `/products/${item?.commerceItem?.slug?.en}`
                }
              >
                <img
                  alt="Placeholder"
                  className="block h-72 w-full object-contain"
                  //src={item.fields.productImage[0].fields.file.url}
                  src={
                    item?.commerceProduct?.masterData?.staged?.masterVariant
                      .images[0].url
                  }
                />
              </Link>
              <div className={isActive ? "bg-primary" : "card-bodylist"}>
                <header className="flex justify-between leading-tight p-2 md:p-4 flex-col">
                  <h1 className="text-lg subheading">
                    <a
                      className="no-underline hover:underline text-white"
                      href="#"
                    >
                      {/* {item?.commerceProduct?.masterData?.staged?.name?.en} */}
                      {isActive
                        ? item?.commerceProduct?.masterData?.staged?.name?.en
                        : item?.commerceProduct?.masterData?.staged
                            ?.masterVariant?.sku}
                    </a>
                  </h1>
                  <div className="price-counter">
                    <span>
                      {" "}
                      {isActive ? (
                        <span className="a-price-symbol">₹&nbsp;</span>
                      ) : (
                        ""
                      )}
                      {isActive
                        ? item?.commerceProduct?.masterData?.staged?.variants[0]
                            ?.prices[0]?.discounted?.value?.centAmount / 100
                        : " "}
                    </span>
                    <span>
                      {" "}
                      {isActive ? (
                        <span className="a-price-symbol">M.R.P&nbsp;</span>
                      ) : (
                        ""
                      )}
                      {isActive ? (
                        <span className="line-through">
                          {item?.commerceProduct?.masterData?.staged
                            ?.variants[0]?.prices[0]?.value?.centAmount / 100}
                        </span>
                      ) : (
                        " "
                      )}
                    </span>
                  </div>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                  <a
                    className="no-underline hover:underline text-white"
                    href="#"
                  >
                    See all{" "}
                    {
                      item?.commerceProduct?.masterData?.staged?.masterVariant
                        ?.sku
                    }{" "}
                    products
                  </a>
                </footer>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageListCards;
