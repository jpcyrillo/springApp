package com.cysan.springApp.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Product product){
        return productService.create(product);
    }

    @PutMapping("update")
    public Product update(@RequestBody Product product){
        return productService.update(product);
    }

    @DeleteMapping("delete")
    public void delete(@RequestParam("id") Long id){
        productService.delete(id);
    }
}
