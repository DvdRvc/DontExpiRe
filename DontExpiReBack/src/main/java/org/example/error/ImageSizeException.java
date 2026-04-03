package org.example.error;

public class ImageSizeException extends RuntimeException {
    public ImageSizeException(String message) {
        super(message);
    }
}
