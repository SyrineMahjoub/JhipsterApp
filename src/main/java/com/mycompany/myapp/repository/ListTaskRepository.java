package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ListTask;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the ListTask entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListTaskRepository extends MongoRepository<ListTask, String> {

}
