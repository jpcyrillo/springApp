package com.cysan.springApp.user;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    List<User> listAll();
    ResponseEntity<?> create(User user);
    ResponseEntity<?> login(User user);
    void delete(Long id);
}
