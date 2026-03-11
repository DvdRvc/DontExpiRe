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

    @Override
    default void flush() {

    }

    default User findByUsername(String username){
        return null;
    }


    @Override
    default <S extends User> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    default <S extends User> List<S> saveAllAndFlush(Iterable<S> entities) {
        return List.of();
    }


    @Override
    default void deleteAllInBatch(Iterable<User> entities) {

    }

    @Override
    default void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    default void deleteAllInBatch() {

    }

    @Override
    default User getOne(Long aLong) {
        return null;
    }

    @Override
    default User getById(Long aLong) {
        return null;
    }

    @Override
    default User getReferenceById(Long aLong) {
        return null;
    }

    @Override
    default <S extends User> List<S> findAll(Example<S> example) {
        return List.of();
    }

    @Override
    default <S extends User> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }

    @Override
    default <S extends User> List<S> saveAll(Iterable<S> entities) {
        return List.of();
    }

    @Override
    default List<User> findAll() {
        return List.of();
    }

    @Override
    default List<User> findAllById(Iterable<Long> longs) {
        return List.of();
    }

    @Override
    default <S extends User> S save(S entity) {
        return null;
    }

    @Override
    default Optional<User> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    default boolean existsById(Long aLong) {
        return false;
    }

    @Override
    default long count() {
        return 0;
    }

    @Override
    default void deleteById(Long aLong) {

    }

    @Override
    default void delete(User entity) {

    }

    @Override
    default void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    default void deleteAll(Iterable<? extends User> entities) {

    }

    @Override
    default void deleteAll() {

    }

    @Override
    default List<User> findAll(Sort sort) {
        return List.of();
    }

    @Override
    default Page<User> findAll(Pageable pageable) {
        return null;
    }

    @Override
    default <S extends User> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    default <S extends User> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    default <S extends User> long count(Example<S> example) {
        return 0;
    }

    @Override
    default <S extends User> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    default <S extends User, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }
}
