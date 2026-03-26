package org.example.error;

public class NewPasswordRequiredException extends RuntimeException {
    public NewPasswordRequiredException(String message) {
        super(message);
    }
}
