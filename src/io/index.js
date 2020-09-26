import video from "@/io/video.js";
import xlsx from "@/io/xlsx.js";
import file from "@/io/file.js";
import json from "@/io/json.js";
import zip from "@/io/zip.js";
import ver1 from "@/io/ver1.js";
import ver2 from "@/io/ver2.js";

const obj = { ver1, ver2 };
const download = file.download;
export default { video, file, json, zip, obj, xlsx, download };
