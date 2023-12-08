-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'test@user.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'test@admin.com',
        TRUE),
        ('anonuser',
         '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
         'anonymous',
         'User',
         'test@user.com',
         FALSE);

INSERT INTO recipes (api_uri, title, url, ingredients, instructions, username)
VALUES (null,
       'Chocolate Bar Brownies',
       null,
       '1 cup butter, 4 oz unsweetened chocolate, 2 cups sugar, 4 eggs, 2 tsp vanilla, 1 1/2 cups all-purpose flour',
       'Put butter and chocolate in top of double boiler, heat until butter and chocolate are melted.' ||
       ' Mix sugar and butter chocolate mixture, adding in unbeaten eggs one at a time.' ||
       ' Sift flour into mixture and mix well. Spread into a prepped pan and bake 25 to 30 minutes at 375 Fahrenheit or 190 Celsius.',
       'testuser'
       ),
       ('http://www.edamam.com/ontologies/edamam.owl#recipe_b5382cf0075003de1b6672d216cc60ac',
        'Sparkling Cranberries recipes',
        'http://www.101cookbooks.com/archives/sparkling-cranberries-recipe.html',
        '2 cups cranberries, picked over, 2 cups water, 2 cups sugar (see head notes)',
        NULL,
        NULL);

INSERT INTO favorites (username, recipe_id)
VALUES ('testadmin', 1);

