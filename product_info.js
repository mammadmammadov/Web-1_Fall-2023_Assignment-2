document.addEventListener("DOMContentLoaded", displaySingleProduct())

function displaySingleProduct(){
  const productId = new URLSearchParams(window.location.search).get("id");
  const url = `https://dummyjson.com/products/${productId}`
  fetch(url)
      .then((res) => res.json())
      .then((product) => {
        const productInfoSet = document.getElementById("productInfoSet");
        productInfoSet.innerHTML = `
              <h3>${product.title}</h3>
              <p style="font-weight:bold">${product.brand}</p>
              <p>${product.description}</p>
              <p>Price: $${product.price}</p>
              <p>Discount: ${product.discountPercentage}%</p>
              <p>Category: ${product.category}</p>
              <p>Stock: ${product.stock}</p>
              <p>Rating: ${product.rating}</p>
              <div id="pictures"></div>`;
        const imageSet =
          productInfoSet.querySelector("#pictures");
        product.images.map((image) => {
          const pic = document.createElement("img");
          [pic.src, pic.alt] = [image, product.title];
          imageSet.appendChild(pic);
        });
      }).catch((error) => {
        console.log("Error while getting the product", error);
      })
}

