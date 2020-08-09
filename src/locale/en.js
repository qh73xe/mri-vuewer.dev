import en from "vuetify/src/locale/en.ts";
const pages = {
  home: "Home",
  meta: "Meta Data",
  demo: "Line Demo",
  setting: "Setting",
  about: "About"
};
const homeActions = {
  upload: {
    title: "Video Registration",
    hint: "Import your video file for annotation"
  },
  manage: {
    title: pages.meta,
    hint: "you can create meta data for video like speaker data"
  },
  demo: {
    title: pages.demo,
    hint: "Try the annotation function using a sample video"
  }
};
const home = {
  disc: `
    MRI Vuewer is an annotation tool for movied rtMRI data.
    </br>
    You can view the audio waveform and the video at the same time.
    </br>
    </br>
    All files are processed locally.
    </br>
    First of all, please register your own video file from <b>${homeActions.upload.title}</b>.
    `,
  ...homeActions
};

export default {
  ...en,
  io: {
    mVideoInput: {
      title: "Your movie",
      hint: "supported format is mp4"
    }
  },
  pages: pages,
  home: home,
  meta: {
    disc: `
    In this page, you can manages the meta information of registered video files.
    </br>
    You can set the content to be added as meta information by yourself.
    </br>
    The meta information is assumed to be the speaker of the video, the shooting date, the content of the utterance, etc.
    </br>
    Meta information is used when searching video files.
    `
  },
  demo: {
    disc: `In this page, you can check the functions of MRI Vuewer with sample videos.`
  },
  setting: {
    disc: `In this page, you can configure the MRI Vuewer.`
  }
};
