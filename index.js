fetch("https://dummyjson.com/products")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const products = data.products;
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

    //change below to template instead
    productElement.innerHTML = `
                <h4 class="product-id">${product.id}</h4>
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Discount: ${product.discountPercentage}%</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
                <img src="${product.thumbnail}" alt="${product.title}">`;

    productElement.addEventListener("click", function () {
      const productInfoURL = `product_info.html?id=${product.id}`;
      window.open(productInfoURL, "_blank");
    });

    productList.appendChild(productElement);

    //Below Searching Function is Implemented
    const searchInput = document.querySelector("[data-search]");
    if (searchInput != null) {
      searchInput.addEventListener("keyup", (e) => {
        const value = e.target.value;

        const isVisible = product.title.trim().toLowerCase().includes(value.toLowerCase()) || 
        product.description.trim().toLowerCase().includes(value.toLowerCase()) ||
        product.category.trim().toLowerCase().includes(value.toLowerCase());

        productElement.classList.toggle("hide", !isVisible);
        
      });
    }
  });
}

