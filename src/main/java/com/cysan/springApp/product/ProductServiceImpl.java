package com.cysan.springApp.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> listAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }


    @Override
    public ResponseEntity<?> create(Product product) {
        if (product.getId() != null) {
            throw new RuntimeException("To create a record, you cannot have an ID");
        }

        Optional<Product> existProduct = productRepository.findByName(product.getName());

        if(existProduct.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Este produto já foi cadastrado.");
        }
        productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body("Produto cadastrado com sucesso!");
    }

    @Override
    public ResponseEntity<?> update(Product product) {
        if (product.getId() == null) {
            throw new RuntimeException("To update a record, you must have an ID");
        }
        productRepository.save(product);
        return ResponseEntity.status(HttpStatus.OK).body("Produto atualizado com sucesso!");
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
