package com.locuspark.api.controller;

import com.locuspark.api.dto.response.UserProfileResponse;
import com.locuspark.api.entity.User;
import com.locuspark.api.exception.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile(@AuthenticationPrincipal User user) {

        if (user == null) {
            throw new UserNotFoundException("Usuário não encontrado no sistema.");
        }
        UserProfileResponse profile = new UserProfileResponse(
                user.getId(),
                user.getUsername(),
                user.getRole()
        );

        return ResponseEntity.ok(profile);
    }
}