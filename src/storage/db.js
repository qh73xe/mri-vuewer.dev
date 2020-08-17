import Dexie from "dexie";
import io from "@/io";
const db = new Dexie("mri_vuewer");
db.version(1).stores({
  files:
    "++id,name,source,fps,duration,originSize,videoStream,audioStream,meta,frames,textgrid"
});

const dump = function() {
  return new Promise((resolve, reject) => {
    db.files
      .toArray()
      .then(items => {
        const json = JSON.stringify(items);
        const blob = new Blob([json], { type: "application/json" });
        io.file.download(blob, "corpora.json");
        resolve(true);
      })
      .catch(error => reject(error));
  });
};

const load = function(json) {
  return new Promise((resolve, reject) => {
    try {
      const obj = JSON.parse(json);
      db.files
        .clear()
        .then(() => {
          db.files
            .bulkPut(obj)
            .then(() => {
              db.files
                .toArray()
                .then(items => {
                  resolve(items);
                })
                .catch(error => reject(error));
            })
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  files: db.files,
  dump: dump,
  load: load
};
