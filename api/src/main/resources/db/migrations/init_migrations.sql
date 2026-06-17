CREATE TABLE clients
(
    id         BLOB         NOT NULL,
    cpf        VARCHAR(11)  NOT NULL,
    name       VARCHAR(255) NOT NULL,
    phone      VARCHAR(255) NOT NULL,
    type       ENUM         NOT NULL,
    company_id BLOB         NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (id)
);

CREATE TABLE companies
(
    id          BLOB         NOT NULL,
    cnpj        VARCHAR(14)  NOT NULL,
    created_at  datetime NULL,
    name        VARCHAR(255) NOT NULL,
    status      ENUM         NOT NULL,
    total_spots INT          NOT NULL,
    updated_at  datetime NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (id)
);

CREATE TABLE users
(
    id         BLOB         NOT NULL,
    password   VARCHAR(255) NOT NULL,
    `role`     ENUM         NOT NULL,
    username   VARCHAR(255) NOT NULL,
    company_id BLOB NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (id)
);

ALTER TABLE companies
    ADD CONSTRAINT UK1phmrrhw2946lhdeh2yjis697 UNIQUE (cnpj);

ALTER TABLE users
    ADD CONSTRAINT UKr43af9ap4edm43mmtq01oddj6 UNIQUE (username);

CREATE INDEX FKin8gn4o1hpiwe6qe4ey7ykwq7 ON users (company_id);

CREATE INDEX FKs3vg3lr3eadee5luiq6c78t1i ON clients (company_id);