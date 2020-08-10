import storage from "@/storage/localStorage.js";
const S = storage.wavesurfer;

const DEFAULTSTATE = {
  minPxPerSec: 100,
  freqRate: 0.25,
  targetChannel: 0,
  spectrogramHeight: 256,
  showTimeLine: true,
  showSpectrogram: true,
  showFreqLabel: false,
  cursorColor: "#333",
  waveColor: "#333",
  progressColor: "#555"
};
const DS = DEFAULTSTATE;

export default {
  namespaced: true,
  state: () => ({
    minPxPerSec: S.get("minPxPerSec") || DS.minPxPerSec,
    freqRate: S.get("freqRate") || DS.freqRate,
    targetChannel: S.get("targetChannel") || DS.targetChannel,
    spectrogramHeight: S.get("spectrogramHeight") || DS.spectrogramHeight,
    showTimeLine:
      S.get("showTimeLine") == null ? DS.showTimeLine : S.get("showTimeLine"),
    showSpectrogram:
      S.get("showSpectrogram") == null
        ? DS.showSpectrogram
        : S.get("showSpectrogram"),
    showFreqLabel:
      S.get("showFreqLabel") == null
        ? DS.showSpectrogram
        : S.get("showFreqLabel"),
    cursorColor: S.get("cursorColor") || DS.cursorColor,
    waveColor: S.get("waveColor") || DS.waveColor,
    progressColor: S.get("progressColor") || DS.progressColor
  }),
  mutations: {
    setMinPxPerSec(state, payload) {
      state.minPxPerSec = Number(payload);
      S.set("minPxPerSec", Number(payload));
    },
    setFreqRate(state, payload) {
      state.freqRate = Number(payload);
      S.set("freqRate", Number(payload));
    },
    setTargetChannel(state, payload) {
      state.targetChannel = Number(payload);
      S.set("targetChannel", Number(payload));
    },
    setSpectrogramHeight(state, payload) {
      state.spectrogramHeight = Number(payload);
      S.set("spectrogramHeight", Number(payload));
    },
    setShowTimeLine(state, payload) {
      state.showTimeLine = payload;
      S.set("showTimeLine", payload);
    },
    setShowSpectrogram(state, payload) {
      state.showSpectrogram = payload;
      S.set("showSpectrogram", payload);
    },
    setShowFreqLabel(state, payload) {
      state.showFreqLabel = payload;
      S.set("showFreqLabel", payload);
    },
    setCursorColor(state, payload) {
      state.cursorColor = payload;
      S.set("cursorColor", payload);
    },
    setWaveColor(state, payload) {
      state.waveColor = payload;
      S.set("waveColor", payload);
    },
    setProgressColor(state, payload) {
      state.progressColor = payload;
      S.set("progressColor", payload);
    }
  },
  actions: {
    setDefault(context) {
      context.commit("setMinPxPerSec", DS.minPxPerSec);
      context.commit("setFreqRate", DS.freqRate);
      context.commit("setTargetChannel", DS.targetChannel);
      context.commit("setSpectrogramHeight", DS.spectrogramHeight);
      context.commit("setShowTimeLine", DS.showTimeLine);
      context.commit("setShowSpectrogram", DS.showSpectrogram);
      context.commit("setShowFreqLabel", DS.showFreqLabel);
      context.commit("setCursorColor", DS.cursorColor);
      context.commit("setWaveColor", DS.waveColor);
      context.commit("setProgressColor", DS.progressColor);
    }
  }
};
