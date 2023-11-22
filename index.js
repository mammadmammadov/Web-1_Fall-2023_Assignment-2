fetch("https://dummyjson.com/products")
  .then((response) => {
    return response.json();
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
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Discount: ${product.discountPercentage}%</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
                <img src="${product.thumbnail}" alt="${product.title}">`;

    productList.appendChild(productElement);

    document.querySelectorAll(".product").forEach(function(element) {
      element.addEventListener("click", function() {
        window.open('detail.html', "_blank");
      });
    });

  });
}


