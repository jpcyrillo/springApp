package com.cysan.springApp.product;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> listAll();
    Optional<Product> findById(Long id);
    ResponseEntity<?> create(Product product);
    ResponseEntity<?> update(Product product);
    void delete(Long id);
}
