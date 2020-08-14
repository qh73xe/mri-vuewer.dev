import Dexie from "dexie";
const db = new Dexie("mri_vuewer");
db.version(1).stores({
  files:
    "++id,name,source,fps,duration,originSize,videoStream,audioStream,meta,frames,textgrid"
});
export default {
  files: db.files
};
