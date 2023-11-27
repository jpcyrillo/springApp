package com.cysan.springApp.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("create")
    public User create(@RequestBody User user) {
        return userService.create(user);
    }

    @PostMapping("login")
    public User login(@RequestBody User user) {
        return userService.login(user);
    }
}