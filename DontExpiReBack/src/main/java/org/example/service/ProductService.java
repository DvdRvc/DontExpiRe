package org.example.service;

import lombok.AllArgsConstructor;
import org.example.dto.AddProductRequest;
import org.example.dto.RemoveProductRequest;
import org.example.model.Product;
import org.example.model.User;
import org.example.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    final private ProductRepository productRepository;

    public List<Product> getProducts(){
        return productRepository.findAll();
    }


    public void removeProduct(RemoveProductRequest product){
        Long id = (long) product.getProductId();

        if(!productRepository.existsById(id)){
            throw new RuntimeException("IDIDID");
        }
        productRepository.deleteById(id);
    }


    public void addProduct(AddProductRequest product){
        Long id = (long) product.getProductId();

        if(productRepository.existsById(id)){
            throw new RuntimeException("The same product exists!");
        }

        Product p = new Product();
        p.setProductId(product.getProductId());
        p.setProductName(product.getProductName());
        p.setProductBrand(product.getProductBrand());
        p.setProductPrice(product.getProductPrice());
        p.setProductType(product.getProductType());
        p.setProductExpiryDate(product.getProductExpiryDate());

        productRepository.save(p);
    }
}
