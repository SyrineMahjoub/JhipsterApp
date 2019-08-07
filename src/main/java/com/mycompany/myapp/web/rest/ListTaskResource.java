package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ListTask;
import com.mycompany.myapp.repository.ListTaskRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ListTask}.
 */
@RestController
@RequestMapping("/api")
public class ListTaskResource {

    private final Logger log = LoggerFactory.getLogger(ListTaskResource.class);

    private static final String ENTITY_NAME = "listTask";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ListTaskRepository listTaskRepository;

    public ListTaskResource(ListTaskRepository listTaskRepository) {
        this.listTaskRepository = listTaskRepository;
    }

    /**
     * {@code POST  /list-tasks} : Create a new listTask.
     *
     * @param listTask the listTask to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new listTask, or with status {@code 400 (Bad Request)} if the listTask has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/list-tasks")
    public ResponseEntity<ListTask> createListTask(@RequestBody ListTask listTask) throws URISyntaxException {
        log.debug("REST request to save ListTask : {}", listTask);
        if (listTask.getId() != null) {
            throw new BadRequestAlertException("A new listTask cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListTask result = listTaskRepository.save(listTask);
        return ResponseEntity.created(new URI("/api/list-tasks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /list-tasks} : Updates an existing listTask.
     *
     * @param listTask the listTask to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated listTask,
     * or with status {@code 400 (Bad Request)} if the listTask is not valid,
     * or with status {@code 500 (Internal Server Error)} if the listTask couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/list-tasks")
    public ResponseEntity<ListTask> updateListTask(@RequestBody ListTask listTask) throws URISyntaxException {
        log.debug("REST request to update ListTask : {}", listTask);
        if (listTask.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ListTask result = listTaskRepository.save(listTask);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, listTask.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /list-tasks} : get all the listTasks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of listTasks in body.
     */
    @GetMapping("/list-tasks")
    public List<ListTask> getAllListTasks() {
        log.debug("REST request to get all ListTasks");
        return listTaskRepository.findAll();
    }

    /**
     * {@code GET  /list-tasks/:id} : get the "id" listTask.
     *
     * @param id the id of the listTask to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the listTask, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/list-tasks/{id}")
    public ResponseEntity<ListTask> getListTask(@PathVariable String id) {
        log.debug("REST request to get ListTask : {}", id);
        Optional<ListTask> listTask = listTaskRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(listTask);
    }

    /**
     * {@code DELETE  /list-tasks/:id} : delete the "id" listTask.
     *
     * @param id the id of the listTask to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/list-tasks/{id}")
    public ResponseEntity<Void> deleteListTask(@PathVariable String id) {
        log.debug("REST request to delete ListTask : {}", id);
        listTaskRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
