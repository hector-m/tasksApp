import * as SQLite from "expo-sqlite";
import moment from "moment";

const database = SQLite.openDatabase("TasksApp.db");

database.transaction(tx => {
  tx.executeSql(
    "create table if not exists tasks (id integer primary key not null, title text not null, start_time int, end_date int, project int, reminder int);"
  );
});

export const addTask = (title, start_time, end_date, project, reminder) => {
  database.transaction(
    tx => {
      tx.executeSql(
        `insert into tasks (title, start_time, end_date, project, reminder) values (?,?,?,?,?)`,
        [
          title,
          start_time.valueOf(),
          end_date ? end_date.valueOf() : null,
          project,
          reminder
        ],
        null,
        null
      );
    },
    error => {
      console.log("error", error);
    },
    null
  );
};

export const deleteTask = id => {
  database.transaction(
    tx => {
      tx.executeSql(`DELETE FROM tasks WHERE id = ?;`, [id], null, null);
    },
    error => {
      console.log("error", error);
    },
    null
  );
};

const formatTasks = data => {
  let responseMap = new Map();
  data.forEach(task => {
    let time = moment(task.start_time).calendar({
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "MMMM Do"
    });
    responseMap.has(time)
      ? responseMap.get(time).push(task)
      : responseMap.set(time, [task]);
  });

  let response = [];
  responseMap.forEach((value, key) => {
    response.push({ day: key, data: value });
  });
  return response;
};
export const getAllTasks = dispatchSuccess => {
  database.transaction(
    tx => {
      tx.executeSql(
        `select * from tasks ORDER BY start_time`,
        [],
        (_, { rows: { _array } }) => {
          let formated = formatTasks(_array);
          dispatchSuccess(formated);
        },
        null
      );
    },
    error => {
      console.log("error", error);
    },
    null
  );
};
