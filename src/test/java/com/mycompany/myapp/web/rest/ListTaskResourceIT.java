package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.StageApp;
import com.mycompany.myapp.domain.ListTask;
import com.mycompany.myapp.repository.ListTaskRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ListTaskResource} REST controller.
 */
@SpringBootTest(classes = StageApp.class)
public class ListTaskResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ListTaskRepository listTaskRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restListTaskMockMvc;

    private ListTask listTask;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListTaskResource listTaskResource = new ListTaskResource(listTaskRepository);
        this.restListTaskMockMvc = MockMvcBuilders.standaloneSetup(listTaskResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListTask createEntity() {
        ListTask listTask = new ListTask()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return listTask;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListTask createUpdatedEntity() {
        ListTask listTask = new ListTask()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return listTask;
    }

    @BeforeEach
    public void initTest() {
        listTaskRepository.deleteAll();
        listTask = createEntity();
    }

    @Test
    public void createListTask() throws Exception {
        int databaseSizeBeforeCreate = listTaskRepository.findAll().size();

        // Create the ListTask
        restListTaskMockMvc.perform(post("/api/list-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listTask)))
            .andExpect(status().isCreated());

        // Validate the ListTask in the database
        List<ListTask> listTaskList = listTaskRepository.findAll();
        assertThat(listTaskList).hasSize(databaseSizeBeforeCreate + 1);
        ListTask testListTask = listTaskList.get(listTaskList.size() - 1);
        assertThat(testListTask.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testListTask.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createListTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listTaskRepository.findAll().size();

        // Create the ListTask with an existing ID
        listTask.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restListTaskMockMvc.perform(post("/api/list-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listTask)))
            .andExpect(status().isBadRequest());

        // Validate the ListTask in the database
        List<ListTask> listTaskList = listTaskRepository.findAll();
        assertThat(listTaskList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllListTasks() throws Exception {
        // Initialize the database
        listTaskRepository.save(listTask);

        // Get all the listTaskList
        restListTaskMockMvc.perform(get("/api/list-tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listTask.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    public void getListTask() throws Exception {
        // Initialize the database
        listTaskRepository.save(listTask);

        // Get the listTask
        restListTaskMockMvc.perform(get("/api/list-tasks/{id}", listTask.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(listTask.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    public void getNonExistingListTask() throws Exception {
        // Get the listTask
        restListTaskMockMvc.perform(get("/api/list-tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateListTask() throws Exception {
        // Initialize the database
        listTaskRepository.save(listTask);

        int databaseSizeBeforeUpdate = listTaskRepository.findAll().size();

        // Update the listTask
        ListTask updatedListTask = listTaskRepository.findById(listTask.getId()).get();
        updatedListTask
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restListTaskMockMvc.perform(put("/api/list-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedListTask)))
            .andExpect(status().isOk());

        // Validate the ListTask in the database
        List<ListTask> listTaskList = listTaskRepository.findAll();
        assertThat(listTaskList).hasSize(databaseSizeBeforeUpdate);
        ListTask testListTask = listTaskList.get(listTaskList.size() - 1);
        assertThat(testListTask.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testListTask.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingListTask() throws Exception {
        int databaseSizeBeforeUpdate = listTaskRepository.findAll().size();

        // Create the ListTask

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListTaskMockMvc.perform(put("/api/list-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listTask)))
            .andExpect(status().isBadRequest());

        // Validate the ListTask in the database
        List<ListTask> listTaskList = listTaskRepository.findAll();
        assertThat(listTaskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteListTask() throws Exception {
        // Initialize the database
        listTaskRepository.save(listTask);

        int databaseSizeBeforeDelete = listTaskRepository.findAll().size();

        // Delete the listTask
        restListTaskMockMvc.perform(delete("/api/list-tasks/{id}", listTask.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ListTask> listTaskList = listTaskRepository.findAll();
        assertThat(listTaskList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListTask.class);
        ListTask listTask1 = new ListTask();
        listTask1.setId("id1");
        ListTask listTask2 = new ListTask();
        listTask2.setId(listTask1.getId());
        assertThat(listTask1).isEqualTo(listTask2);
        listTask2.setId("id2");
        assertThat(listTask1).isNotEqualTo(listTask2);
        listTask1.setId(null);
        assertThat(listTask1).isNotEqualTo(listTask2);
    }
}
