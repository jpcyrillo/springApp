package com.cysan.springApp.user;

import com.cysan.springApp.product.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("list")
    public List<User> listAll(){
        return userService.listAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody User user) {
        return userService.create(user);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User user) {
        return userService.login(user);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> delete(@RequestParam("id") Long id) {
        try {
            userService.delete(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}