package org.example.error;

public class InvalidUserNameLength extends RuntimeException {
    public InvalidUserNameLength(String message) {
        super(message);
    }
}
