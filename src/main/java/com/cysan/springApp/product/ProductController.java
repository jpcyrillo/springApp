package com.cysan.springApp.product;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @PreAuthorize("hasRole('PRODUCT_SELECT')")
    public List<Product> listAll(){
        return productService.listAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('PRODUCT_CREATE')")
    public Product create(@RequestBody Product product){
        return productService.create(product);
    }

    @PutMapping
    @PreAuthorize("hasRole('PRODUCT_UPDATE')")
    public Product update(@RequestBody Product product){
        return productService.update(product);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('PRODUCT_DELETE')")
    public void delete(@RequestParam("id") Long id){
        productService.delete(id);
    }
}
