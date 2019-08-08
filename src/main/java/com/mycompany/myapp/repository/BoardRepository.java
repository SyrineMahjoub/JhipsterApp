package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Board;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Board entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BoardRepository extends MongoRepository<Board, String> {

}
