package org.example.error;

public class OldPasswordRequiredException extends RuntimeException {
    public OldPasswordRequiredException(String message) {
        super(message);
    }
}
