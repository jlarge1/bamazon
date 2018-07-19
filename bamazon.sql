drop database if exists bamazon;
create database bamazon;

use bamazon;

create table products (
	item_id int auto_increment,
    product_name varchar(50) null,
    department_name varchar(50) null,
    price int not null,
    stock_quantity int not null,
    primary key (item_id)
);

use bamazon;

insert into products(product_name, department_name, price, stock_quantity)
values ("table", "furniture", 200, 100);
insert into products(product_name, department_name, price, stock_quantity)
values ("chair", "furniture", 50, 600);
insert into products(product_name, department_name, price, stock_quantity)
values ("couch", "furniture", 800, 25);
insert into products(product_name, department_name, price, stock_quantity)
values ("hammer", "tools", 25, 300);
insert into products(product_name, department_name, price, stock_quantity)
values ("drill", "tools", 400, 50);
insert into products(product_name, department_name, price, stock_quantity)
values ("laptop", "electronics", 1500, 100);
insert into products(product_name, department_name, price, stock_quantity)
values ("tv", "electronics", 200, 800);
insert into products(product_name, department_name, price, stock_quantity)
values ("socks", "clothing", 10, 1000);
insert into products(product_name, department_name, price, stock_quantity)
values ("pants", "clothing", 40, 500);
insert into products(product_name, department_name, price, stock_quantity)
values ("shirt", "clothing", 150, 50);

select * from products;