INSERT INTO roles (title, salary, department_id)
VALUES ("General Manager", 231200, 001),    
       ("Sales Manager", 154000, 002), 
       ("Sales Associate", 70367, 002), 
       ("Secretary", 50605, 003), 
       ("General Counsel", 130500, 004)
       ("Intern", 32506, 003),  
     

INSERT INTO departments (id, department_name)
VALUES  (001, "Coorporate"),
        (002, "Sales"),
        (003, "Administration"),
        (004, "Legal"),
   
        

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES ("Britney", "Spears", null, 001),
       ("Michael", "Jackson", 001, 002),
       ("Madonna", "Ciccone", 001, 002),
       ("Elvis", "Presley", 001, 003),
       ("Jeon", "Jungkook", 001, 004),
       ("Norma", "Jeane", 001, 003),
  
