use bonsai;
drop table if exists entries;
drop table if exists users;
drop table if exists user_entries;

create table if not exists users (
	id bigint(20) not null auto_increment,
    username varchar(20) not null,
    email varchar(75) not null,
    password varchar(75) not null,
    passwordChangedAt datetime default now(),
    primary key (id, email)
);

create table if not exists entries (
	id bigint(20) not null auto_increment,
    title varchar(75) not null,
    author varchar(20) not null,
    img varchar(75) not null,
    link varchar(75) not null,
    summary tinytext,
    content text,
    tags text,
    user_id bigint(20) not null,
    primary key (id),
    foreign key (user_id) references users(id)
);

create table if not exists user_entries (
    user_id bigint(20) not null,
    entry_id bigint(20) not null,
    primary key (user_id, entry_id),
    foreign key (user_id) references users(id),
    foreign key (entry_id) references entries(id)
);