const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.lastProductId = 0;
  }

  addProduct(product) {

   

    if (!product.titulo || !product.descripcion || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log('Error: Todos los campos son obligatorios.');
      return;
    }

  
    if (this.products.some((p) => p.code === product.code)) {
      console.log('Error: El código del producto ya existe.');
      return;
    }

   
    this.lastProductId++;
    const newProduct = {
      ...product,
      id: this.lastProductId
    };

    this.products.push(newProduct);
    console.log('Producto agregado exitosamente.');
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log('Error: Producto no encontrado.');
    }
  }
}


const manager = new ProductManager();

manager.addProduct({
  titulo: 'Campera Amarilla',
  descripcion: 'Campera de Cuero sin detalles',
  price: 100,
  thumbnail: 'campera_amarilla.jpg',
  code: '1994',
  stock: 28
});

manager.addProduct({
  titulo: 'Bolsa Cartera',
  descripcion: 'Cartera mctaylor',
  price: 80,
  thumbnail: 'populares_3',
  code: '1995',
  stock: 10
});

console.log(manager.getProducts());

console.log(manager.getProductById(1));
console.log(manager.getProductById(3));


const productsJSON = JSON.stringify(manager.getProducts());
fs.writeFileSync('productos.json', productsJSON, 'utf8');
console.log('Productos guardados en el archivo "productos.json".');
