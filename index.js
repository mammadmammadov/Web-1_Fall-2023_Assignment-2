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

  });
}

  $(".product").click(function(){
    $(document).on("click" , function() {
      $(this).addClass(".orange");
  });
  })

  document.getElementsByClassName(".product").addEventListener(
    "click", func, false);

  function func(){
    console.log("Hello");
  }
