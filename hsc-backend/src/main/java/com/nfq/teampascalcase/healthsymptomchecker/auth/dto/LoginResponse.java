package com.nfq.teampascalcase.healthsymptomchecker.auth.dto;

import com.nfq.teampascalcase.healthsymptomchecker.user.dto.UserResponse;

public record LoginResponse(
        UserResponse user,
        String refreshToken,
        String accessToken
) {
}
