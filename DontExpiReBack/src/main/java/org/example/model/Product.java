package org.example.model;

import jakarta.persistence.*;
import org.example.enums.ProductType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int productId;

    String productName;
    String productBrand;
    LocalDate productExpiryDate;
    float productPrice;
    @Enumerated(EnumType.STRING)
    ProductType productType;


}
