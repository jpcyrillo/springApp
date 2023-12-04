package com.cysan.springApp.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("product")
public class ProductController {
    @Autowired
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("list")
    public List<Product> listAll(){
        return productService.listAll();
    }

    @GetMapping("find")
    public Optional<Product> findById(@RequestParam("id") Long id) {
        return productService.findById(id);
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Product product){
        return productService.create(product);
    }

    @PutMapping("update")
    public ResponseEntity<?> update(@RequestBody Product product){
        return productService.update(product);
    }

    @DeleteMapping("delete")
    public void delete(@RequestParam("id") Long id){
        productService.delete(id);
    }
}
