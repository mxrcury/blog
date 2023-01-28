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
alter table posts drop CONSTRAINT created_by
-- 
alter table posts add foreign KEY(created_by) REFERENCES users (username) ON DELETE SET NULL ON UPDATE CASCADE

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

alter table post_comments drop CONSTRAINT post_comments_created_by_fkey
-- 
alter table post_comments add foreign KEY(created_by) REFERENCES users (username) ON DELETE SET NULL ON UPDATE CASCADE;


create table user_comments(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  FOREIGN KEY (user_id) references users (id),
  FOREIGN KEY (created_by) references users (username)
)


alter table user_comments drop CONSTRAINT user_comments_created_by_fkey
-- 
alter table user_comments add foreign KEY(created_by) REFERENCES users (username) ON DELETE SET NULL ON UPDATE CASCADE


-- table users additional columns:
alter table users add job_position VARCHAR(255);
alter table users add skills VARCHAR(255);
alter table users add company_name VARCHAR(255);
alter table users add age INT;

--


create table messages(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  text TEXT NOT NULL,
  created_at VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) references users (id)
)

