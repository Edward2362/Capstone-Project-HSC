package com.nfq.teampascalcase.healthsymptomchecker.user.mapper;

import com.nfq.teampascalcase.healthsymptomchecker.user.User;
import com.nfq.teampascalcase.healthsymptomchecker.user.dto.UserResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserResponseMapper implements Function<User, UserResponse> {
    @Override
    public UserResponse apply(User user) {
        return new UserResponse(
                user.getEmail(),
                user.getName()
        );
    }
}
