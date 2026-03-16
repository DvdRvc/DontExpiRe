package org.example.error;

public class InvadlidEmailForm extends RuntimeException {
    public InvadlidEmailForm(String message) {
        super(message);
    }
}
