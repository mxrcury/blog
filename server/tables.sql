create table posts(
 id SERIAL PRIMARY KEY,
 title TEXT NOT NULL,
 content TEXT NOT NULL,
--  CHECK TYPE FOR ARRAY IN POSTGRESQL
 likes INT [],
 created_at VARCHAR(255) NOT NULL,
 created_by VARCHAR(255) NOT NULL,
 FOREIGN KEY (created_by) references users (username),
--  ADDING IMAGE IN POST FOR FUTURE FEATURE
 image VARCHAR(255),
-- add field comments and try to make some logic with it
);
create table posts(
 id SERIAL PRIMARY KEY,
 title TEXT NOT NULL,
 content TEXT NOT NULL,
 likes INT [],
 created_at VARCHAR(255) NOT NULL,
 created_by VARCHAR(255) NOT NULL,
 FOREIGN KEY (created_by) references users (username)
);
create table post_comments(
 id SERIAL PRIMARY KEY,
 post_id INT NOT NULL,
 created_at VARCHAR(255) NOT NULL,
 created_by VARCHAR(255) NOT NULL,
 text TEXT NOT NULL,
 FOREIGN KEY (created_by) references users (username),
 FOREIGN KEY (post_id) references posts (id)
);
-- Add replies field for future app upgrade
create table user_comments(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  FOREIGN KEY (user_id) references users (id),
  FOREIGN KEY (created_by) references users (username)
)
