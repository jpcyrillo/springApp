package com.cysan.springApp.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("listAll")
    @PreAuthorize("hasRole('PRODUCT_SELECT')")
    public List<Product> listAll(){
        return productService.listAll();
    }

    @PostMapping("create")
    @PreAuthorize("hasRole('PRODUCT_CREATE')")
    public Product create(@RequestBody Product product){
        return productService.create(product);
    }

    @PutMapping("update")
    @PreAuthorize("hasRole('PRODUCT_UPDATE')")
    public Product update(@RequestBody Product product){
        return productService.update(product);
    }

    @DeleteMapping("delete")
    @PreAuthorize("hasRole('PRODUCT_DELETE')")
    public void delete(@RequestParam("id") Long id){
        productService.delete(id);
    }
}
