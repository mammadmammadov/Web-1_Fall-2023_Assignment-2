products = [];
let currentPage = 1;
fetch("https://dummyjson.com/products?limit=100")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    products = data.products;
    main();
  })
  .catch((error) => {
    console.error("Error while getting the data", error);
  });

function main() {
  const productList = document.getElementById("productList");
  const selectBox = document.getElementById("categories");
  const paginationContainer = document.getElementById("pagination");
  let visibleProducts = [];

  const noProductsElement = document.createElement("div");
  noProductsElement.className = "no-product";
  noProductsElement.classList.add("hide");
  noProductsElement.textContent = "No Product Found 😞";
  productList.appendChild(noProductsElement);

  let categoryList = [];

  products.forEach((product) => {
    if (!categoryList.includes(product.category)) {
      categoryList.push(product.category);
    }

    const productElement = document.createElement("div");
    productElement.classList.add("grid-item");

    //adding data-id attribute and assigning product.id to it
    productElement.setAttribute("data-id", product.id);

    //TODO: change below to template instead
    productElement.innerHTML = `
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Discount: ${product.discountPercentage}%</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
                <img src="${product.thumbnail}" alt="${product.title}">`;

    productElement.addEventListener("click", function () {
      window.open(`product_info.html?id=${product.id}`, "_blank");
    });

    productList.appendChild(productElement);
  });

  //adding the option "All" to select-box
  const allOption = document.createElement("option");
  allOption.text = "All";
  selectBox.appendChild(allOption);

  //adding all categories to select box in alphabetical order
  for (let i = 0; i < categoryList.length; i++) {
    const option = document.createElement("option");
    option.text = categoryList.sort()[i];
    selectBox.appendChild(option);
  }

  //Below Searching and Filtering Functions are Implemented
  const searchInput = document.querySelector(".search-input");
  if (searchInput != null) {
    searchInput.addEventListener("keyup", searchFilterHandler);
  }

  selectBox.addEventListener("change", searchFilterHandler);

  function searchFilterHandler() {
    currentPage = 1;
    const searchValue = searchInput.value.toLowerCase();
    const selectedCategory = selectBox.value.toLowerCase();

    products.forEach((product) => {
      const searchMatch =
        product.title.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue);

      const categoryMatch =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory;

      const isVisible = searchMatch && categoryMatch;
      const productElement = productList.querySelector(
        `[data-id="${product.id}"]`
      );

      //when element does not match with the input, then it will be invisible
      productElement.classList.toggle("hide", !isVisible);
    });
    updateVisibility();
    paginationCore();
    updatePage();
  }

  function updateVisibility() {
    //restricting by class grid-item as noProductsElement has already been added to productList
    visibleProducts = Array.from(
      productList.getElementsByClassName("grid-item")
    ).filter((product) => !product.classList.contains("hide"));

    let zeroVisibleProducts = visibleProducts.length === 0;
    noProductsElement.classList.toggle("hide", !zeroVisibleProducts);
  }

  function paginationCore() {
    const totalPages = Math.ceil(visibleProducts.length / 10);
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.textContent = i;
      pageLink.addEventListener("click", () => {
        currentPage = i;
        updatePage();
        paginationCore();
      });
      if (i === currentPage) {
        pageLink.classList.add("active");
      }
      paginationContainer.appendChild(pageLink);
    }
  }

  function updatePage() {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;

    for (let i = 0; i < visibleProducts.length; i++) {
      const product = visibleProducts[i];
      const isVisible = i >= startIndex && i < endIndex;
      product.classList.toggle("hide", !isVisible);
    }
  }

  updateVisibility();
  paginationCore();
  updatePage();
}
