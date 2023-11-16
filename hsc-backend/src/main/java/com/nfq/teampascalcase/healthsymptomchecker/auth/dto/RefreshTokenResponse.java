package com.nfq.teampascalcase.healthsymptomchecker.auth.dto;

public record RefreshTokenResponse(
        String refreshToken,
        String accessToken
) {
}
