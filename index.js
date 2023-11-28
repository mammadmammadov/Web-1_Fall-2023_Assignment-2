products=[]
fetch("https://dummyjson.com/products?limit=100")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    products = data.products;
    // console.log(products);
    displayProducts(products);
  })
  .catch((error) => {
    console.error("Error while getting the data", error);
  });

function displayProducts(products) {

  const productList = document.getElementById("productList");

  const noProductsDiv = document.createElement("div");
  noProductsDiv.classList.add("hide");
  noProductsDiv.textContent = "No Product Found";
  productList.appendChild(noProductsDiv);

  let categoryList = [];

  const productArray = Array.from(products);

  productArray.forEach((product) => {

    if(!categoryList.includes(product.category)){
      categoryList.push(product.category);
    }

    console.log(categoryList);

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
        product.category.trim().toLowerCase().includes(value.toLowerCase()) 

        productElement.classList.toggle("hide", !isVisible);
        if(isVisible){
          noProductsDiv.classList.add("hide");
        } else{
          let visibleProducts = Array.from(productList.getElementsByClassName("grid-item")).filter(product =>
             !product.classList.contains("hide"))
             if(visibleProducts.length===0){
              noProductsDiv.classList.remove("hide");
             }
        }
      });
    }


  const selectBox = document.getElementById('categories');
  for(let i=0; i<categoryList.length; i++){
    const option = document.createElement('option');
    option.text = categoryList[i];
    selectBox.appendChild(option);
  }

  // selectBox.addEventListener("change", (e) => {
  //   const selectedElement = e.target.value;
  //   isVisible = product.category == selectedElement;

  //   productElement.classList.toggle("hide", !isVisible);
  //       if(isVisible){
  //         noProductsDiv.classList.add("hide");
  //       } else{
  //         visibleProducts = Array.from(visibleProducts.getElementsByClassName("grid-item")).filter(product =>
  //            !product.classList.contains("hide"))
  //            if(visibleProducts.length===0){
  //             noProductsDiv.classList.remove("hide");
  //            }
  //       }

  // })

  });

  

}



