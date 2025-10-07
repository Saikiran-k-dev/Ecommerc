import ProductRepository from "./product.repository.js";

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req, res) {
        try {
            const query = {};
        
            // 🔍 Filtering
            if (req.query.category) {
              query.category = req.query.category;
            }
        
            if (req.query.minPrice || req.query.maxPrice) {
              query.price = {};
              if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
              if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
            }
        
            // 📦 Pagination
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = (page - 1) * limit;
        
            // 🔃 Sorting
            let sort = {};
            if (req.query.sort) {
              const [field, order] = req.query.sort.split("_");
              sort[field] = order === "desc" ? -1 : 1;
            } else {
              sort = { createdAt: -1 }; // default latest first
            }
            console.log(query,sort,skip,limit)
            const products = await this.productRepository.getFilteredProducts(query, sort, skip, limit);
        
            const total = await this.productRepository.countProducts(query);
        
            res.status(200).send({
              total,
              currentPage: page,
              totalPages: Math.ceil(total / limit),
              products,
            });
          } catch (error) {
            res.status(500).send({ message: error.message });
          }
    }

    async addNewProduct(req, res) {
        try {
            console.log(req.user)
            const newProduct = req.body;
            const createdProduct = await this.productRepository.addNewproduct(newProduct);
            res.status(201).send({ product: createdProduct });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async getOneProduct(req,res){
        try {
            const productId = req.params.productId
            const product = await this.productRepository.getOneProduct(productId)
            if(!product){
                res.status(400).send("no such product exist bro")
            }
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send({ message: error.message }); 
        }
    }

    async updateProduct(req,res){
        try {
            const productId = req.params.productId
            const newProductDetails = req.body
            const updatedProduct = await this.productRepository.updateProduct(productId,newProductDetails)
            res.status(201).send(updatedProduct)
        } catch (error) {
            res.status(500).send({ message: error.message }); 
        }
    }


    async deleteProduct(req,res){
        try {
            const productId = req.params.productId
            const isProductDeleted = await this.productRepository.deletingTheProduct(productId)
            res.status(201).send(isProductDeleted)
        } catch (error) {
            res.status(500).send({ message: error.message }); 
        }
    }
}
