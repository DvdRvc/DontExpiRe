package org.example.error;

public class ToLongUsernameException extends RuntimeException {
    public ToLongUsernameException(String message) {
        super(message);
    }
}
