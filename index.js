products = [];
fetch("https://dummyjson.com/products?limit=100")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    products = data.products;
    // console.log(products);
    main();
  })
  .catch((error) => {
    console.error("Error while getting the data", error);
  });


function main() {
  const productList = document.getElementById("productList");
  const selectBox = document.getElementById("categories");

  const noProductsDiv = document.createElement("div");
  noProductsDiv.classList.add("hide");
  noProductsDiv.textContent = "No Product Found";
  productList.appendChild(noProductsDiv);

  let categoryList = [];

  products.forEach((product) => {
    if (!categoryList.includes(product.category)) {
      categoryList.push(product.category);
    }

    const productElement = document.createElement("div");
    productElement.classList.add("product", "grid-item");
    productElement.setAttribute("data-id", product.id);

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
  })

  const allOption = document.createElement("option");
  allOption.text = "All";
  selectBox.appendChild(allOption);

  for (let i = 0; i < categoryList.length; i++) {
    const option = document.createElement("option");
    option.text = categoryList.sort()[i];
    selectBox.appendChild(option);
  }

    //Below Searching and Filtering Functions are Implemented
    const searchInput = document.querySelector("[data-search]");
    if (searchInput != null) {
      searchInput.addEventListener("keyup", searchFilterHandler);
    }

    selectBox.addEventListener("change", handleFilterChange);

    function searchFilterHandler(){
      const searchValue = searchInput.value.trim().toLowerCase();
      const selectedCategory = selectBox.value.trim().toLowerCase();

      products.forEach(product => {
        const searchMatch = product.title.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue)||
        product.category.toLowerCase().includes(selectedCategory);

        const selectCategoryMatch = selectedCategory === "all" || product.category.toLowerCase()===selectedCategory;

        const isVisible = searchMatch && selectCategoryMatch;
        const productElement = productList.querySelector(`[data-id="${product.id}"]`);
        productElement.classList.toggle("hide", !isVisible);
      })
      updateVisibility();
  }

  function handleFilterChange() {
    // Call the handleSearch function to update the product visibility
    searchFilterHandler();
  }


  function updateVisibility(){
    const visibleProducts = 
    Array.from(productList.getElementsByClassName("grid-item")).filter(product =>
      !product.classList.contains("hide"))

    if(visibleProducts.length===0){
      noProductsDiv.classList.remove("hide");
    }
    else{
      noProductsDiv.classList.add("hide")
    }
  }

}

