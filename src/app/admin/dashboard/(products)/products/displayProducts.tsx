import Image from "next/image";
import Link from "next/link";
import React from "react";

interface productDataProp {
  productData: Product[];
}

const DisplayProducts = ({ productData }: productDataProp) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl  text-center">ALL PRODUCTS</h1>
        <Link href={"/admin/dashboard/addNewProduct"} className="bg-blue-300 px-4 py-2 rounded-2xl">
          ADD NEW PRODUCT
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8">
        {productData.map((product) => (
          <Link
            href={`/dashboard/products/${product.productId}`}
            key={product.productId}
            className="border p-4 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold text-center my-2">
              {product.productName}
            </h2>

            <div className="relative w-full h-60">
              <Image
                src={product.productImageUrl}
                alt={product.productName}
                // width={400}
                // height={50}
                style={{ objectFit: "cover" }}
                fill
                className="rounded-t-lg border border-gray-500"
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Code:</span>
                <span className="text-gray-700">{product.productCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Type:</span>
                <span className="text-gray-700">{product.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Subtype:</span>
                <span className="text-gray-700">{product.subType}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DisplayProducts;
