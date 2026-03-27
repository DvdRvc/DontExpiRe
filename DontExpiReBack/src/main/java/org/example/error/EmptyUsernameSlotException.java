package org.example.error;

public class EmptyUsernameSlotException extends RuntimeException {
    public EmptyUsernameSlotException(String message) {
        super(message);
    }
}
