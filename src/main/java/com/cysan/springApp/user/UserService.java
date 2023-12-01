package com.cysan.springApp.user;

import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> create(User user);
    ResponseEntity<?> login(User user);
    void delete(Long id);
}
