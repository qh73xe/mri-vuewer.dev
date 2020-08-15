import en from "vuetify/src/locale/en.ts";
import store from "@/store/index.js";
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
  prev: "Previous",
  validations: {
    required: "This field is required!",
    positiveInteger: "This is a positive integer field!",
    positiveFloat: "This is a positive float field!",
    maxVideoSize: `Video size should be less than ${store.state.setting.maxVideoSize} MB!`,
    hasArrayBuffer: "This is an unexpected video file [No Array buffer]!",
    less: "this field must be less than {0} characters"
  },
  wVideo: {
    videoPre: {
      label: "Previous Image"
    },
    video: {
      label: "Current Image"
    },
    videoPos: {
      label: "Next Image"
    }
  },
  videoResistForm: {
    finish: "Video registration is complete.",
    restart: "Add Video.",
    steps: {
      select: "File Selection",
      confirmation: "Codec Confirmation",
      meta: "Addtion of Meta Data"
    },
    desc: {
      confirmation:
        "Check the following information and press <kbd>OK</kbd> botton if everything is OK.",
      meta: `
      To register a speaker, enter 'speaker' in <code>key field</code> and the speaker name in <code>value field</code>, then, press the <kbd>+</kbd> button.
      <br />
      Finally, click the <kbd>OK</kbd> button to register.`
    }
  },
  io: {
    mVideoInput: {
      title: "Select your video file (mp4)",
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
    disc: `In this page, you can configure the MRI Vuewer.`,
    form: {
      loading: {
        label: "File upload settings",
        maxVideoSize: {
          label: "Max Video Size",
          hint:
            "Registerable video size. If this value is large, the number of data that can be registered will decrease."
        },
        shouldGetVideoInfo: {
          label: "Get video codec at file upload.",
          hint:
            "If this check box is false, you need to manually input fps, image size, etc."
        },
        shouldGetFrameInfo: {
          label: "Get all frame images at file upload.",
          hint:
            "If this check box is true, the file upload will take longer, but an accurate image display will be performed during video analysis."
        }
      },
      waveform: {
        label: "Wave form settings",
        minPxPerSec: {
          label: "pixels per sec",
          hint:
            "How many pixels do you want to display 1 sec? It is roughly the enlargement ratio in the time direction."
        },
        cursorColor: {
          label: "Cursor Color"
        },
        waveColor: {
          label: "Wave Color"
        },
        progressColor: {
          label: "Progress Color"
        },
        showTimeLine: {
          label: "Display Time Axis"
        },
        showSpectrogram: {
          label: "Display spectrogram"
        }
      },
      spectrogram: {
        label: "Spectrogram Settings",
        targetChannel: {
          label: "Target Channel"
        },
        freqRate: {
          label: "Frequency Rate",
          hint:
            "Frequency display ratio. What percentage of the fft analysis result is displayed.Set a value between 0.25 and 1."
        },
        showFreqLabel: {
          label: "Display Frequency Axis Label"
        }
      }
    }
  }
};
