import ProductRepository from "./product.repository.js";

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productRepository.getAllProducts();
            if (!products || products.length === 0) {
                return res.status(404).send({ message: "No products found" });
            }
            res.status(200).send({ products });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async addNewProduct(req, res) {
        try {
            const newProduct = req.body;
            const createdProduct = await this.productRepository.addNewproduct(newProduct);
            res.status(201).send({ product: createdProduct });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}
