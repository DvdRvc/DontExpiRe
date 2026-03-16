package org.example.error;

public class InvalidPasswordLength extends RuntimeException {
    public InvalidPasswordLength(String message) {
        super(message);
    }
}
