package org.example.error;

public class InvalidAuthenticationJWT extends RuntimeException {
    public InvalidAuthenticationJWT(String message) {
        super(message);
    }
}
