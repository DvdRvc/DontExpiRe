package org.example.controller;

import lombok.AllArgsConstructor;
import org.example.dto.AddProductRequest;
import org.example.dto.RemoveProductRequest;
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

    private ProductService productService;

    @GetMapping("/products")
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @GetMapping("/remove-product")
    public void removeProduct(@RequestBody RemoveProductRequest removeProductRequest){
        productService.removeProduct(removeProductRequest);
    }

    @GetMapping("/add-product")
    public void addProduct(@RequestBody AddProductRequest addProductRequest){
        productService.addProduct(addProductRequest);
    }
}
