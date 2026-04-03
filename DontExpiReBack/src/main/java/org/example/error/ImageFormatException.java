package org.example.error;

public class ImageFormatException extends RuntimeException {
    public ImageFormatException(String message) {
        super(message);
    }
}
