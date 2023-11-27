package com.cysan.springApp.product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> listAll();
    Product create(Product product);
    Product update(Product product);
    void delete(Long id);
}
