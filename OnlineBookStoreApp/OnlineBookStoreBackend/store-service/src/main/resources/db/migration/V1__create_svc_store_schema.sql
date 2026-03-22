CREATE SCHEMA IF NOT EXISTS svc_store;

SET search_path TO svc_store;

CREATE TABLE stores (
                        id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        store_name              VARCHAR(255) NOT NULL,
                        business_reg_number     VARCHAR(255) NOT NULL UNIQUE,
                        tin                     VARCHAR(255) NOT NULL UNIQUE,
                        owner_id_url            VARCHAR(500),
                        business_license_url    VARCHAR(500),
                        bank_name               VARCHAR(255),
                        bank_account            VARCHAR(255),
                        region                  VARCHAR(255) NOT NULL,
                        city                    VARCHAR(255) NOT NULL,
                        address                 TEXT NOT NULL,
                        email                   VARCHAR(255) NOT NULL UNIQUE,
                        phone                   VARCHAR(20),
                        plan                    VARCHAR(10) NOT NULL DEFAULT 'FREE'
                            CHECK (plan IN ('FREE', 'PREMIUM')),
                        verification_status     VARCHAR(10) NOT NULL DEFAULT 'PENDING'
                            CHECK (verification_status IN ('PENDING', 'APPROVED', 'REJECTED')),
                        rejection_reason        TEXT,
                        created_at              TIMESTAMP NOT NULL DEFAULT now(),
                        updated_at              TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_stores_verification_status ON stores(verification_status);
CREATE INDEX idx_stores_email ON stores(email);

CREATE TABLE store_owners (
                              id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                              keycloak_id     VARCHAR(255) NOT NULL UNIQUE,
                              store_id        UUID NOT NULL REFERENCES stores(id),
                              name            VARCHAR(255) NOT NULL,
                              email           VARCHAR(255) NOT NULL UNIQUE,
                              phone           VARCHAR(20),
                              created_at      TIMESTAMP NOT NULL DEFAULT now(),
                              updated_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_store_owners_keycloak_id ON store_owners(keycloak_id);
CREATE INDEX idx_store_owners_store_id ON store_owners(store_id);

CREATE TABLE branches (
                          id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          store_id        UUID NOT NULL REFERENCES stores(id),
                          branch_name     VARCHAR(255) NOT NULL,
                          region          VARCHAR(255) NOT NULL,
                          city            VARCHAR(255) NOT NULL,
                          address         TEXT NOT NULL,
                          phone           VARCHAR(20),
                          created_at      TIMESTAMP NOT NULL DEFAULT now(),
                          updated_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_branches_store_id ON branches(store_id);

CREATE TABLE employees (
                           id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           keycloak_id     VARCHAR(255) NOT NULL UNIQUE,
                           store_id        UUID NOT NULL REFERENCES stores(id),
                           branch_id       UUID NOT NULL REFERENCES branches(id),
                           name            VARCHAR(255) NOT NULL,
                           email           VARCHAR(255) NOT NULL UNIQUE,
                           role            VARCHAR(10) NOT NULL
                               CHECK (role IN ('MANAGER', 'STAFF')),
                           created_at      TIMESTAMP NOT NULL DEFAULT now(),
                           updated_at      TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_employees_keycloak_id ON employees(keycloak_id);
CREATE INDEX idx_employees_branch_id ON employees(branch_id);
CREATE INDEX idx_employees_store_id ON employees(store_id);