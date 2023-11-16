package com.nfq.teampascalcase.healthsymptomchecker.auth.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotNull
        @Size(min = 8, max = 64)
        String oldPassword,
        @NotNull
        @Size(min = 8, max = 64)
        String newPassword
) {
}
