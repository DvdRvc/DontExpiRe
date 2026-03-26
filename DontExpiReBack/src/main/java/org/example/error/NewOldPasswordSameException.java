package org.example.error;

public class NewOldPasswordSameException extends RuntimeException {
    public NewOldPasswordSameException(String message) {
        super(message);
    }
}
