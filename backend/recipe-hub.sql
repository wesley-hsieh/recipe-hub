\echo 'Delete and recreate recipe_hub db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE recipe_hub;
CREATE DATABASE recipe_hub;
\connect recipe_hub

\i recipe-schema.sql
\i recipe-seed.sql

\echo 'Delete and recreate recipe_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE recipe_test;
CREATE DATABASE recipe_test;
\connect recipe_test

\i recipe-schema.sql
