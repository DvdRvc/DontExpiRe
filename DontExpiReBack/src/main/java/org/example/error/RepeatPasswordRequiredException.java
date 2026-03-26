package org.example.error;

public class RepeatPasswordRequiredException extends RuntimeException {
    public RepeatPasswordRequiredException(String message) {
        super(message);
    }
}
