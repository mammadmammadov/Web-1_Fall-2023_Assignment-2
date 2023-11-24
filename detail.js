fetch("https://dummyjson.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const products = data.products
    // console.log(products);
    displayProduct(products);
  })
  .catch((error) => {
    console.error("Error while getting the data", error);
  });

function displayProduct(product) {


    const pro = document.getElementById("product-detail");

    const productElement = document.createElement("div");
    


    productElement.innerHTML = `
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Discount: ${product.discountPercentage}%</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
                <img src="${product.thumbnail}" alt="${product.title}">`;

    pro.appendChild(productElement);

  };



