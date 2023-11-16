package com.nfq.teampascalcase.healthsymptomchecker.auth.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RefreshTokenRequest(
        @NotNull
        @NotEmpty
        String refreshToken
) {
}
