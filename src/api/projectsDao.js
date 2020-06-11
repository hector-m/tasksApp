import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("TasksApp.db");

database.transaction(tx => {
  tx.executeSql(
    "create table if not exists projects (id integer primary key not null, title text not null, color text not null, icon text not null);"
  );
});

export const addProject = (title, color, icon) => {
  database.transaction(
    tx => {
      tx.executeSql(
        `insert into projects (title, color, icon) values (?,?,?)`,
        [title, color, icon],
        null,
        null
      );
    },
    error => {
      console.log("error:", error);
    },
    null
  );
};

export const deleteProject = id => {
  database.transaction(
    tx => {
      tx.executeSql(`DELETE FROM projects WHERE id = ?;`, [id], null, null);
    },
    error => {
      console.log("error:", error);
    },
    null
  );
};

export const getAllProjects = dispatchSuccess => {
  database.transaction(
    tx => {
      tx.executeSql(
        `select * from projects`,
        [],
        (_, { rows: { _array } }) => {
          dispatchSuccess(_array);
        },
        null
      );
    },
    error => {
      console.log("error:", error);
    },
    null
  );
};
