import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("TasksApp.db");

database.transaction(tx => {
  tx.executeSql(
    "create table if not exists projects (id integer primary key not null, title text not null, color text not null, icon text not null);"
  );
});

database.transaction(tx => {
  tx.executeSql(
    "INSERT INTO projects (title, color, icon) SELECT 'Personal', '#FFD506', 'user' where NOT EXISTS (SELECT * FROM projects) UNION ALL SELECT 'Work', '#5DE61A', 'briefcase' where NOT EXISTS (SELECT * FROM projects) UNION ALL SELECT 'Other', '#D10263', 'desktop' where NOT EXISTS (SELECT * FROM projects)"
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
