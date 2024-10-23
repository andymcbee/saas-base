CREATE TABLE option_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL -- e.g., 'task_status', 'task_category', 'task_priority'
);


CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    type_id INT NOT NULL,
    value VARCHAR(50) NOT NULL,
    FOREIGN KEY (type_id) REFERENCES option_types(id),
    CONSTRAINT unique_option UNIQUE (type_id, value) -- Ensure type + value uniqueness
);

-- we'll need to fetch option_types from the ui by text value so index it

CREATE INDEX idx_option_types_name ON option_types (name);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,            -- Task description is required
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Auto-set timestamp on creation
    status_id INT NOT NULL,                -- Status is required (e.g., 'in-progress', 'completed')
    category_id INT,                       -- Category is optional, can be NULL
    priority_id INT,                       -- Priority is optional, can be NULL
    FOREIGN KEY (status_id) REFERENCES options(id),
    FOREIGN KEY (category_id) REFERENCES options(id),
    FOREIGN KEY (priority_id) REFERENCES options(id)
);


