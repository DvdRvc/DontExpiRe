package org.example.repository;

import org.example.model.User;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public interface UserRepository extends JpaRepository<User, Long> {


    default User findByUsername(String username){
        return null;
    }


    Optional<User> findByUserEMail(String userEMail);

    boolean existsByUserEMail(String userEMail);
}
