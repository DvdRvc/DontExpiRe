package org.example.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RemoveProductRequest {
    int productId;
    String productName;
    Date productExpiryDate;
}
