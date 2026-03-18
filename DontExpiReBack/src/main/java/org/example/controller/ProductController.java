package org.example.controller;

import lombok.AllArgsConstructor;
import org.example.dto.AddProductRequest;
import org.example.dto.RemoveProductRequest;
import org.example.dto.UpdateProductRequest;
import org.example.enums.ProductType;
import org.example.model.Product;
import org.example.model.User;
import org.example.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/product-controller")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products")
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @DeleteMapping("/remove-product")
    public void removeProduct(@RequestBody RemoveProductRequest removeProductRequest){
        productService.removeProduct(removeProductRequest);
    }

    @PostMapping("/add-product")
    public void addProduct(@RequestBody AddProductRequest addProductRequest){
        productService.addProduct(addProductRequest);
    }

    @GetMapping("/type/{type}")
    public List<Product> getProductsByType(@PathVariable ProductType type) {
        return productService.getProductsByType(type);
    }

    @GetMapping("/expiring-soon")
    public List<Product> getExpiringSoonProducts() {
        return productService.getExpiringSoonProducts();
    }

    @GetMapping("/expired")
    public List<Product> getExpiredProducts() {
        return productService.getExpiredProducts();
    }

    @GetMapping("/expiring-in/{days}")
    public List<Product> getProductsExpiringIn(@PathVariable int days) {
        return productService.getProductsExpiringIn(days);
    }

    @PutMapping("/update/{id}")
    public void updateProduct(@PathVariable Long id, @RequestBody UpdateProductRequest request) {
        productService.updateProduct(id, request);
    }
}
