/* Replace with your SQL commands */
CREATE SEQUENCE user_id_sequence INCREMENT 1 START 1;
CREATE TABLE "user"
(
  id bigint NOT NULL DEFAULT nextval('user_id_sequence'),
  email text NOT NULL,
  name text NOT NULL,
  password text NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (id),
  CONSTRAINT user_unique_email UNIQUE(email)

);

CREATE SEQUENCE project_id_sequence INCREMENT 1 START 1;
CREATE TABLE "project"
(
  id bigint NOT NULL DEFAULT nextval('project_id_sequence'),
  name text NOT NULL,
  description text,
  CONSTRAINT project_pkey PRIMARY KEY (id)
);

CREATE TABLE "user_project"
(
  user_id bigint NOT NULL,
  project_id bigint NOT NULL,
  role text,
  CONSTRAINT "user_project-pkey" PRIMARY KEY (user_id, project_id),
  CONSTRAINT "user_project-user"    FOREIGN KEY (user_id)    REFERENCES "user"  (id) MATCH SIMPLE,
  CONSTRAINT "user_project-project" FOREIGN KEY (project_id) REFERENCES project (id) MATCH SIMPLE
);

CREATE SEQUENCE link_id_sequence INCREMENT 1 START 1;
CREATE TABLE "link"
(
  id bigint NOT NULL DEFAULT nextval('link_id_sequence'),
  href text NOT NULL,
  description text,

  project_id bigint,
  image text,

  role text,
  CONSTRAINT link_pkey PRIMARY KEY (id),
  CONSTRAINT "link-project" FOREIGN KEY (project_id) REFERENCES project (id) MATCH SIMPLE
);
