package model;

import enums.ProductType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class Product {

    int productId;
    String productName;
    String productBrand;
    Date productExpiryDate;
    float productPrice;
    ProductType productType;


}
