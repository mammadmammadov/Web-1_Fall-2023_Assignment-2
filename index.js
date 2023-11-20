fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log)
.catch(error => console.error('Error:', error));