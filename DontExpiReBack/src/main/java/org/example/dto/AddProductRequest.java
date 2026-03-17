package org.example.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import org.example.enums.ProductType;

import java.util.Date;

@Getter
@Setter
public class AddProductRequest {

    int productId;
    String productName;
    String productBrand;
    Date productExpiryDate;
    float productPrice;
    ProductType productType;

}
