package com.nfq.teampascalcase.healthsymptomchecker.auth;

import com.nfq.teampascalcase.healthsymptomchecker.auth.dto.*;
import com.nfq.teampascalcase.healthsymptomchecker.token.Token;
import com.nfq.teampascalcase.healthsymptomchecker.token.TokenRepository;
import com.nfq.teampascalcase.healthsymptomchecker.token.TokenService;
import com.nfq.teampascalcase.healthsymptomchecker.user.User;
import com.nfq.teampascalcase.healthsymptomchecker.user.UserRepository;
import com.nfq.teampascalcase.healthsymptomchecker.user.UserService;
import com.nfq.teampascalcase.healthsymptomchecker.user.dto.UserResponse;
import com.nfq.teampascalcase.healthsymptomchecker.user.mapper.UserResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserResponseMapper userResponseMapper;

    private final int ACCESS_TOKEN_LIFETIME_MINUTES = 10;
    private final int REFRESH_TOKEN_LIFETIME_MINUTES = 60 * 24 * 30 * 6;

    public RegisterResponse register(RegisterRequest registerRequest) {
        User user = User.builder()
                .email(registerRequest.email())
                .password(passwordEncoder.encode(registerRequest.password()))
                .name(registerRequest.name())
                .build();

        userRepository.save(user);

        return new RegisterResponse("Registration successful.");
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
        );
        User user = (User) authentication.getPrincipal();

        UserResponse userResponse = userResponseMapper.apply(user);
        String refreshTokenValue = tokenService.generateJwtToken(authentication.getName(), REFRESH_TOKEN_LIFETIME_MINUTES);
        String accessTokenValue = tokenService.generateJwtToken(authentication.getName(), ACCESS_TOKEN_LIFETIME_MINUTES);

        LocalDateTime currentDateTime = LocalDateTime.now();
        Token refreshToken = Token.builder()
                .value(refreshTokenValue)
                .createdAt(currentDateTime)
                .expiresAt(currentDateTime.plusMinutes(REFRESH_TOKEN_LIFETIME_MINUTES))
                .revoked(false)
                .user(user)
                .build();
        tokenRepository.save(refreshToken);

        return new LoginResponse(userResponse, refreshTokenValue, accessTokenValue);
    }

    public ChangePasswordResponse changePassword(ChangePasswordRequest changePasswordRequest) {
        User user = userService.getUserFromSecurityContext();

        boolean isPasswordCorrect = passwordEncoder.matches(changePasswordRequest.oldPassword(), user.getPassword());
        if (!isPasswordCorrect) {
            throw new IllegalStateException();
        }

        user.setPassword(passwordEncoder.encode(changePasswordRequest.newPassword()));
        userRepository.save(user);

        return new ChangePasswordResponse("Password updated.");
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        Token oldRefreshToken = tokenRepository.findByValue(refreshTokenRequest.refreshToken())
                .orElseThrow(IllegalStateException::new);

        boolean isTokenExpired = oldRefreshToken.getExpiresAt().isBefore(LocalDateTime.now());
        if (isTokenExpired || oldRefreshToken.isRevoked()) {
            throw new IllegalStateException();
        }

        String accessTokenValue = tokenService.generateJwtToken(oldRefreshToken.getUser().getEmail(), ACCESS_TOKEN_LIFETIME_MINUTES);
        String refreshTokenValue = tokenService.generateJwtToken(oldRefreshToken.getUser().getEmail(), REFRESH_TOKEN_LIFETIME_MINUTES);

        oldRefreshToken.setRevoked(true);
        tokenRepository.save(oldRefreshToken);

        LocalDateTime currentDateTime = LocalDateTime.now();
        Token refreshToken = Token.builder()
                .value(refreshTokenValue)
                .createdAt(currentDateTime)
                .expiresAt(currentDateTime.plusMinutes(REFRESH_TOKEN_LIFETIME_MINUTES))
                .revoked(false)
                .user(oldRefreshToken.getUser())
                .build();
        tokenRepository.save(refreshToken);

        return new RefreshTokenResponse(refreshTokenValue, accessTokenValue);
    }

    public UserResponse getCurrentUser() {
        User user = userService.getUserFromSecurityContext();
        return userResponseMapper.apply(user);
    }
}
