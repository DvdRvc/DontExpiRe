package org.example.error;

public class ImageEmptyException extends RuntimeException {
    public ImageEmptyException(String message) {
        super(message);
    }
}
