const baseKeyName = "mri-vuewer";
const wavesurfer = {
  get: function(key) {
    const keyName = `${baseKeyName}-wavesurfer-${key}`;
    const res = localStorage.getItem(keyName);
    if (res == "true") return true;
    if (res == "false") return false;
    return res;
  },
  set: function(key, val) {
    const keyName = `${baseKeyName}-wavesurfer-${key}`;
    localStorage.setItem(keyName, val);
  }
};

export default {
  wavesurfer: wavesurfer
};
