package com.cysan.springApp.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Override
    public User create(User user) {
        User existUser = userRepository.findByUsername(user.getUsername());
        if(existUser!=null) {
            throw new Error("User already exists!");
        }

        user.setPassword(passwordEncoder().encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public User login(User user) {
        User existUser = userRepository.findByUsername(user.getUsername());
        if(existUser==null) {
            throw new NullPointerException("Usuário não existe!");
        }

        if(passwordEncoder().matches(user.getPassword(), existUser.getPassword())) {
            System.out.println("Senhas iguais");
            return existUser;
        } else {
            throw new BadCredentialsException("Usuário ou senha incorretos!");
        }
    }

}
