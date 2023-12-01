package com.cysan.springApp.user;

import com.cysan.springApp.role.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Override
    public ResponseEntity<?> create(User user) {
        Optional<User>  existUser = userRepository.findByUsername(user.getUsername());

        if (existUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Nome de usuário indisponível.");
        }

        if (user.getRoles() == null) {
            List<Role> roles = new ArrayList<>();
            roles.add(new Role(1L)); //ROLE_USER
            roles.add(new Role(2L)); //ROLE_ADMIN
            user.setRoles(roles);
        }

        user.setPassword(passwordEncoder().encode(user.getPassword()));

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");
    }

    @Override
    public ResponseEntity<?> login(User user) {
        Optional<User>  existUser = userRepository.findByUsername(user.getUsername());
        if(existUser.isEmpty()) {
            System.out.println("Usuario nao existe!");
            throw new NullPointerException("Usuário não existe!");
        }
        if (passwordEncoder().matches(user.getPassword(), existUser.get().getPassword())) {
            System.out.println("Senhas iguais");
            return ResponseEntity.ok(existUser.get());
        } else {
            throw new BadCredentialsException("Usuário ou senha incorretos!");
        }
    }

    @Override
    public void delete(Long id) {
        Optional<User> existUser = userRepository.findById(id);
        if (existUser.isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("User with ID " + id + " not found");
        }
    }


}
