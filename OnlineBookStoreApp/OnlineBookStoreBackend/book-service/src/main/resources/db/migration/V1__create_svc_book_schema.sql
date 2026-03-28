CREATE SCHEMA IF NOT EXISTS svc_book;

SET search_path TO svc_book;

CREATE TABLE books (
                       id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       keycloak_id     VARCHAR(255) NOT NULL,
                       branch_id       UUID NOT NULL,
                       store_id        UUID NOT NULL,
                       title           VARCHAR(255) NOT NULL,
                       author          VARCHAR(255) NOT NULL,
                       description     TEXT,
                       category        VARCHAR(100) NOT NULL,
                       price           DECIMAL(10, 2) NOT NULL CHECK (price > 0),
                       condition       VARCHAR(10) NOT NULL
                           CHECK (condition IN ('NEW', 'GOOD', 'FAIR', 'POOR')),
                       image_url       VARCHAR(500),
                       approved        BOOLEAN NOT NULL DEFAULT false,
                       created_at      TIMESTAMP NOT NULL DEFAULT now(),
                       updated_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_books_branch_id  ON books(branch_id);
CREATE INDEX idx_books_store_id   ON books(store_id);
CREATE INDEX idx_books_approved   ON books(approved);
CREATE INDEX idx_books_category   ON books(category);
CREATE INDEX idx_books_keycloak_id ON books(keycloak_id);