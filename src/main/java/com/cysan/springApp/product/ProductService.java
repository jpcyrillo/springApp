package com.cysan.springApp.product;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    List<Product> listAll();
    ResponseEntity<?> create(Product product);
    Product update(Product product);
    void delete(Long id);
}
