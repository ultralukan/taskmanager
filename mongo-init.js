db.createUser({
    user: "root",
    pwd: "password",
    roles: [{ role: "root", db: "admin" }]
  });
  
  db = db.getSiblingDB("taskmanager");
  db.createCollection("tasks");
  