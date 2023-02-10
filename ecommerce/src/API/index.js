export const getAllProducts = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};
export const getProductsByCategory = (category) => {
  return fetch(`https://dummyjson.com/products/category/${category}`).then(
    (res) => res.json()
  );
};

export const getCard = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const addtoCart = (id) => {
  return fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
        {
          id: 50,
          quantity: 2,
        },
      ],
    }),
  }).then((res) => res.json());
};
