function searchProduct(){
const searchInput = document.querySelector("[data-search]");
if (searchInput != null) {
  searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value;

    products.forEach((product) => {

    const isVisible = product.title.trim().toLowerCase().includes(value.toLowerCase()) || 
    product.description.trim().toLowerCase().includes(value.toLowerCase()) ||
    product.category.trim().toLowerCase().includes(value.toLowerCase());

    product.classList.toggle("hide", !isVisible);
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
})

const selectBox = document.getElementById('categories');
for(let i=0; i<categoryList.length; i++){
const option = document.createElement('option');
option.text = categoryList[i];
selectBox.appendChild(option);
}
}
}