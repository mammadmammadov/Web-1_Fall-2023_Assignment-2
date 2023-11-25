
fetch("https://dummyjson.com/products")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const products = data.products
    // console.log(products);
    displayProducts(products);

  })
  .catch((error) => {
    console.error("Error while getting the data", error);
  });


function displayProducts(products) {

  const productList = document.getElementById("productList");

  const productArray = Array.from(products);

  productArray.forEach((product) => {

    const productElement = document.createElement("div");

    productElement.classList.add("product");
    productElement.classList.add("grid-item");

    productElement.innerHTML = `
                <h4 class="product-id">${product.id}</h4>
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Discount: ${product.discountPercentage}%</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
                <img src="${product.thumbnail}" alt="${product.title}">`;

    productElement.addEventListener("click", function() {
      const productInfoURL = `product_info.html?id=${product.id}`;
      window.open(productInfoURL, "_blank");
    });

    productList.appendChild(productElement);

  });
}

// const container = document.getElementById("productList");
// container.addEventListener('click', function(event){
//   console.log(event.target.parentNode);
//   window.open("https://www.youtube.com/watch?v=023Psne_-_4", '_blank');




// })

// const openProductDetailsPage = (productId) => {
//   const url = `https://example.com/product-details/${productId}`;
//   window.open(url, '_blank');
// };