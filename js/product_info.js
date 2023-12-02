document.addEventListener("DOMContentLoaded", displaySingleProduct());

function displaySingleProduct() {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (productId != null) {
    const url = `https://dummyjson.com/products/${productId}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new ResponseError('Bad fetch response', res);
        }
        return res.json()
      })
      .then((product) => {
        const productInfoSet = document.getElementById("productInfoSet");

        productInfoSet.innerHTML = `
              <h4>${product.title}</h4>
              <p class="brand">${product.brand}</p>
              <p>${product.description}</p>
              <p>Price: $${product.price}</p>
              <p>Discount: ${product.discountPercentage}%</p>
              <p>Category: ${product.category}</p>
              <p>Stock: ${product.stock}</p>
              <p>Rating: ${product.rating}</p>
              <div id="pictures"></div>`;
        const imageSet = productInfoSet.querySelector("#pictures");
        product.images.map((image) => {
          const pic = document.createElement("img");

          //destructuring assignment
          [pic.src, pic.alt] = [image, product.title];

          imageSet.appendChild(pic);
        });
      })
      .catch((error) => {
        console.log("Error while getting the product", error);
      });
  }
}
