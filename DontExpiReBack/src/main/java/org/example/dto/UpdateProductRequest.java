package org.example.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.enums.ProductType;

import java.time.LocalDate;

@Getter
@Setter
public class UpdateProductRequest {

    private String productName;
    private String productBrand;
    private LocalDate productExpiryDate;
    private float productPrice;
    private ProductType productType;
}
