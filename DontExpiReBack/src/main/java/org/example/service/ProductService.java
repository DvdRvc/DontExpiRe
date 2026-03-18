package org.example.service;

import lombok.AllArgsConstructor;
import org.example.dto.AddProductRequest;
import org.example.dto.RemoveProductRequest;
import org.example.dto.UpdateProductRequest;
import org.example.enums.ProductType;
import org.example.error.ProductNotFoundException;
import org.example.error.RemoveProductException;
import org.example.error.TypeDoesntExistYetException;
import org.example.model.Product;
import org.example.model.User;
import org.example.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    final private ProductRepository productRepository;

    public List<Product> getProducts(){
        return productRepository.findAll();
    }


    public void removeProduct(RemoveProductRequest product){
        Long id = product.getProductId();

        if(!productRepository.existsById(id)){
            throw new RemoveProductException("This product doesn't exist!");
        }
        productRepository.deleteById(id);
    }


    public void addProduct(AddProductRequest product){

        Product p = new Product();

        p.setProductName(product.getProductName());
        p.setProductBrand(product.getProductBrand());
        p.setProductPrice(product.getProductPrice());
        p.setProductType(product.getProductType());
        p.setProductExpiryDate(product.getProductExpiryDate());

        productRepository.save(p);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found!"));
    }

    public List<Product> getProductsByType(ProductType type) {

        if(productRepository.findByProductType(type).isEmpty()){
            throw new TypeDoesntExistYetException("This type is not in the fridge yet!");
        }

        return productRepository.findByProductType(type);
    }

    public void updateProduct(Long id, UpdateProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found!"));


        product.setProductName(request.getProductName());
        product.setProductBrand(request.getProductBrand());
        product.setProductExpiryDate(request.getProductExpiryDate());
        product.setProductPrice(request.getProductPrice());
        product.setProductType(request.getProductType());

        productRepository.save(product);
    }

    public List<Product> getExpiringSoonProducts() {
        LocalDate now = LocalDate.now();
        LocalDate soon = now.plusDays(3);

        return productRepository.findByProductExpiryDateBetween(now, soon);

    }

    public List<Product> getExpiredProducts() {
        return productRepository.findByProductExpiryDateBefore(LocalDate.now());
    }

    public List<Product> getProductsExpiringIn(int days) {
        LocalDate now = LocalDate.now();
        LocalDate target = now.plusDays(days);

        return productRepository.findByProductExpiryDateBetween(now, target);
    }
}
