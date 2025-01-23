import React from "react";
import products from "./products"; // Import product data

function ProductListingPage() {
  return (
    <div
      className="bg-cover bg-center py-16"
      style={{
        backgroundImage: "url('https://tse4.mm.bing.net/th?id=OIP.0wL9NJJzsFl_ej_cnXqbKgHaEE&rs=1&pid=ImgDetMain')",
      }}
    >
      <div className="container mx-auto text-center text-white mb-12">
        <h1 className="text-4xl font-extrabold leading-tight drop-shadow-md">
          Our Products
        </h1>
        <p className="mt-4 text-lg drop-shadow-md">
          Browse through our premium selection of car spare parts.
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-400 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black">{product.name}</h3>
                <p className="mt-2 text-black">{product.description}</p>
                <p className="mt-4 text-lg font-bold text-black">{product.price}</p>
                <button
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListingPage;
