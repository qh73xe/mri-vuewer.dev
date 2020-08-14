import ffmpeg from "ffmpeg.js/ffmpeg-mp4.js";
const version = callback => {
  let stdout = "";
  let stderr = "";
  // Print FFmpeg's version.
  const result = ffmpeg({
    arguments: ["-version"],
    print: function(data) {
      stdout += data + "\n";
    },
    printErr: function(data) {
      stderr += data + "\n";
    },
    onExit: function(code) {
      if (code == 0) {
        callback(code, stdout);
      } else {
        throw new Error(stderr);
      }
    }
  });
  return result;
};

const info = (buff, callback) => {
  const video = new Uint8Array(buff);
  let stdout = "";
  const result = ffmpeg({
    MEMFS: [{ name: "data.mp4", data: video }],
    arguments: ["-i", "data.mp4"],
    print: function(data) {
      stdout += data + "\n";
    },
    printErr: function(data) {
      stdout += data + "\n";
    },
    onExit: function() {
      let item = {};
      if (stdout) {
        for (const line of stdout.split("\n")) {
          if (~line.indexOf("Duration")) {
            const timeInfo = line
              .split(",")[0]
              .split(": ")[1]
              .split(":")
              .map(val => {
                return Number(val);
              });
            item.duration =
              timeInfo[0] * 60 * 60 + timeInfo[1] * 60 + timeInfo[2];
          }

          if (~line.indexOf("Stream")) {
            const info = line.split(": ");
            if (info.length == 3) {
              const detail = info[2].split(", ");
              if (info[1] == "Video") {
                item.videoStream = {};
                const sizeText = detail.filter(x =>
                  x.match(/^([1-9]\d*|0)(\.\d+)?x([1-9]\d*|0)(\.\d+)?/)
                )[0];
                if (sizeText) {
                  const size = sizeText.split(" ")[0].split("x");
                  item.size = {
                    width: Number(size[0]),
                    height: Number(size[1])
                  };
                }
                item.videoStream.codec_name = detail[0];
                item.videoStream.pix_fmt = detail[1];
                item.videoStream.bitrate = Number(
                  detail.filter(x => x.match(/kb\/s/))[0].split(" ")[0]
                );
                item.videoStream.fps = Number(
                  detail.filter(x => x.match(/fps/))[0].split(" ")[0]
                );
                item.videoStream.tbr = Number(
                  detail.filter(x => x.match(/tbr/))[0].split(" ")[0]
                );
                item.videoStream.tbn = Number(
                  detail.filter(x => x.match(/tbn/))[0].split(" ")[0]
                );
                item.videoStream.tbc = Number(
                  detail.filter(x => x.match(/tbc/))[0].split(" ")[0]
                );
              } else {
                item.audioStream = {};
                item.audioStream.codec_name = detail[0];
                item.audioStream.sample_rate = Number(detail[1].split(" ")[0]);
                item.audioStream.channel_layout = detail[2];
                item.audioStream.sample_fmt = detail[3];
                item.audioStream.bitrate = Number(detail[4].split(" ")[0]);
              }
            }
          }
        }
        callback(item);
      }
    }
  });
  return result;
};

export default {
  version: version,
  info: info
};
