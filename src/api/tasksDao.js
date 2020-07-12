import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("TasksApp.db");

database.transaction(tx => {
  tx.executeSql(
    "create table if not exists tasks (id integer primary key not null, title text not null, start_time int, end_date int, project int, reminder int, complete int);"
  );
});

export const addTask = (title, start_time, end_date, project, reminder) => {
  database.transaction(
    tx => {
      tx.executeSql(
        `insert into tasks (title, start_time, end_date, project, reminder, complete) values (?,?,?,?,?,?)`,
        [
          title,
          start_time ? start_time.valueOf() : null,
          end_date ? end_date.valueOf() : null,
          project,
          reminder,
          0
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

export const updateTask = (
  id,
  title,
  start_time,
  end_date,
  project,
  reminder
) => {
  database.transaction(
    tx => {
      tx.executeSql(
        `update tasks set title=?, start_time=?, end_date=?, project=?, reminder=? where id = ?`,
        [
          title,
          start_time.valueOf(),
          end_date ? end_date.valueOf() : null,
          project,
          reminder,
          id
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

export const getAllTasks = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql(
          `select * from tasks WHERE complete = 0 ORDER BY start_time`,
          [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          null
        );
      },
      (_, error) => {
        reject(error);
      },
      null
    );
  });
  return promise;
};

export const getTasksInProject = projectId => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql(
          `select * from tasks WHERE project = ? AND complete = 0 ORDER BY start_time`,
          [projectId],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          null
        );
      },
      (_, error) => {
        reject(error);
      },
      null
    );
  });
  return promise;
};

export const getTaskCountForProjects = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql(
          `select project, count(*) as count from tasks WHERE complete = 0 GROUP BY project`,
          [],
          (_, { rows: { _array } }) => {
            let resp = new Map();
            _array.forEach(obj => {
              resp.set(obj.project, obj.count);
            });
            resolve(resp);
          },
          null
        );
      },
      (_, error) => {
        reject(error);
      },
      null
    );
  });
  return promise;
};

export const getCompletedTasks = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql(
          `select * from tasks WHERE complete = 1 ORDER BY start_time`,
          [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          null
        );
      },
      (_, error) => {
        reject(error);
      },
      null
    );
  });
  return promise;
};

export function setReminderForTask(id, isReminder) {
  database.transaction(
    tx => {
      tx.executeSql(
        `UPDATE tasks SET reminder = ? WHERE id = ?;`,
        [isReminder, id],
        null,
        null
      );
    },
    error => {
      console.log("error", error);
    },
    null
  );
}

export function setCompleteForTask(id, isComplete) {
  database.transaction(
    tx => {
      tx.executeSql(
        `UPDATE tasks SET complete = ? WHERE id = ?;`,
        [isComplete, id],
        null,
        null
      );
    },
    error => {
      console.log("error", error);
    },
    null
  );
}
