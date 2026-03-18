package org.example.error;

public class RemoveProductException extends RuntimeException {
    public RemoveProductException(String message) {
        super(message);
    }
}
