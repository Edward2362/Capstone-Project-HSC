package com.nfq.teampascalcase.healthsymptomchecker.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotNull
        @Email
        String email,
        @NotNull
        @Size(min = 8, max = 64)
        String password,
        @NotNull
        @Size(min = 1, max = 64)
        String name
) {
}
