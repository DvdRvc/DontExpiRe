package org.example.repository;

import org.example.enums.ProductType;
import org.example.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByProductType(ProductType type);

    List<Product> findByProductExpiryDateBefore(LocalDate date);

    List<Product> findByProductExpiryDateBetween(LocalDate start, LocalDate end);
}
