package org.example.service;

import io.jsonwebtoken.io.IOException;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.example.dto.*;
import org.example.enums.UserGender;
import org.example.enums.UserType;
import org.example.error.*;
import org.example.model.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.repository.UserRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final PasswordEncoder passwordEncoder;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Long id){
        return userRepository.findById(id).orElse(null);
    }

    public void register(RegisterRequest request) {

        if(userRepository.existsByUserEMail(request.getUserEMail())){
            throw new UserExistsException("User exists with this E-mail!");
        }

        if(request.getUserName().length() <= 5){
            throw new InvalidUserNameLength("Name must have at least 5 characters!");
        }

        if(!request.getUserEMail().contains("@gmail.com") || !request.getUserEMail().contains("@")){
            throw new InvadlidEmailForm("The E-mail form is not valid.");
        }

        if(request.getUserPassword().length() < 8){
            throw new InvalidPasswordLength("Password must have at least 8 characters!");
        }

        User user = new User();

        user.setUserName(request.getUserName());
        user.setUserEMail(request.getUserEMail());
        user.setUserType(UserType.USER);


        user.setUserPassword(
                bCryptPasswordEncoder.encode(request.getUserPassword())
        );

        userRepository.save(user);
    }

    public void login(LoginRequest request){
        String userEmail = request.getUserEMail();
        User user;

        user = userRepository.findByUserEMail(userEmail).orElseThrow(()-> new InvalidCredentialsException("Wrong E-mail or password"));
        //lambda function tells us that exception are only made when necessary

        if (!passwordEncoder.matches(request.getUserPassword(), user.getUserPassword())) {
            throw new InvalidCredentialsException("Wrong E-mail or password");
        }

    }

    public UserProfileResponse getProfile(String token) {
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByUserEMail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found."));

        return new UserProfileResponse(
                user.getUserName(),
                user.getUserGender() != null ? user.getUserGender().name() : null,
                user.getProfilePicture()
        );
    }



    public LoginResponse verify(LoginRequest loginRequest) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUserEMail(),
                                loginRequest.getUserPassword()
                        )
                );

        if (!authentication.isAuthenticated()) {
            throw new InvalidAuthenticationJWT("Authentication failed!");
        }

        User user = userRepository.findByUserEMail(loginRequest.getUserEMail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = jwtService.generateToken(
                user.getUserEMail(),
                user.getUserType().name()
        );

        return new LoginResponse(token, user.getUserType().name());
    }


    public void removeUser(User user){
        userRepository.delete(user);
    }

    public void updatePassword(UpdatePasswordRequest updatePasswordRequest){

        System.out.println("USAO U SERVICE");
        System.out.println("TOKEN: " + updatePasswordRequest.getToken());
        System.out.println("OLD PASSWORD: " + updatePasswordRequest.getOldPassword());
        System.out.println("NEW PASSWORD: " + updatePasswordRequest.getNewPassword());
        System.out.println("NEW PASSWORD AGAIN: " + updatePasswordRequest.getNewPasswordAgain());

        if (updatePasswordRequest.getToken() == null || updatePasswordRequest.getToken().isBlank()) {
            throw new RuntimeException("Token is missing.");
        }

        if (updatePasswordRequest.getOldPassword() == null || updatePasswordRequest.getOldPassword().isBlank()) {
            throw new OldPasswordRequiredException("Old password is required.");
        }

        if (updatePasswordRequest.getNewPassword() == null || updatePasswordRequest.getNewPassword().isBlank()) {
            throw new NewPasswordRequiredException("New password is required.");
        }

        if (updatePasswordRequest.getNewPasswordAgain() == null || updatePasswordRequest.getNewPasswordAgain().isBlank()) {
            throw new RepeatPasswordRequiredException("Please repeat the new password.");
        }

        if (!updatePasswordRequest.getNewPassword().equals(updatePasswordRequest.getNewPasswordAgain())) {
            throw new PasswordNotMatchException("New passwords do not match.");
        }

        if (updatePasswordRequest.getNewPassword().length() < 8) {
            throw new InvalidPasswordLength("New password must have at least 8 characters.");
        }

        String email = jwtService.extractEmail(updatePasswordRequest.getToken());

        User user = userRepository.findByUserEMail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found."));

        if (!passwordEncoder.matches(updatePasswordRequest.getOldPassword(), user.getUserPassword())) {
            throw new WrongPasswordException("Old password is incorrect.");
        }

        if (passwordEncoder.matches(updatePasswordRequest.getNewPassword(), user.getUserPassword())) {
            throw new NewOldPasswordSameException("New password cannot be the same as the old password.");
        }

        user.setUserPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);
    }

    public void updateProfile(UpdateProfileRequest updateProfileRequest, String authHeader){

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByUserEMail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found."));


        if (updateProfileRequest.getUserName() == null || updateProfileRequest.getUserName().trim().isEmpty()) {
            throw new EmptyUsernameSlotException("Username cannot be empty.");
        }

        String newUserName = updateProfileRequest.getUserName().trim();

        if (newUserName.length() < 5) {
            throw new InvalidUserNameLength("Username must have at least 5 characters.");
        }

        if (newUserName.length() > 15) {
            throw new ToLongUsernameException("Username cannot have more than 15 characters.");
        }

        UserGender gender;
        try {
            gender = UserGender.valueOf(updateProfileRequest.getUserGender().trim().toUpperCase());
        } catch (Exception e) {
            throw new GenderFormException("Invalid gender value. Allowed values are: MALE, FEMALE.");
        }


        user.setUserName(updateProfileRequest.getUserName());
        user.setUserGender(gender);

        userRepository.save(user);

    }


    @SneakyThrows
    public String updateProfilePicture(String token, MultipartFile image) throws IOException {
        if (image == null || image.isEmpty()) {
            throw new ImageEmptyException("Image is empty.");
        }

        String contentType = image.getContentType();
        if (contentType == null ||
                (!contentType.equals("image/jpeg") &&
                        !contentType.equals("image/png") &&
                        !contentType.equals("image/jpg") &&
                        !contentType.equals("image/webp"))) {
            throw new ImageFormatException("Only JPG, PNG and WEBP images are allowed.");
        }

        if (image.getSize() > 5 * 1024 * 1024) {
            throw new ImageSizeException("Image must be smaller than 5MB.");
        }

        String email = jwtService.extractEmail(token);
        User user = userRepository.findByUserEMail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found."));

        Path uploadPath = Paths.get(System.getProperty("user.dir"), "uploads", "profile-pictures");
        Files.createDirectories(uploadPath);

        String originalFileName = image.getOriginalFilename();
        String extension = "";

        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        String fileName = UUID.randomUUID() + extension;
        Path filePath = uploadPath.resolve(fileName);

        image.transferTo(filePath.toFile());

        String dbPath = "/uploads/profile-pictures/" + fileName;
        user.setProfilePicture(dbPath);
        userRepository.save(user);

        return dbPath;
    }
}
