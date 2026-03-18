package org.example.error;

public class TypeDoesntExistYetException extends RuntimeException {
    public TypeDoesntExistYetException(String message) {
        super(message);
    }
}
