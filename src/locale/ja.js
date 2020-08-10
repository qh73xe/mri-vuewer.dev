import ja from "vuetify/src/locale/ja.ts";
const pages = {
  home: "ホーム",
  meta: "メタデータ管理",
  demo: "ライブデモ",
  setting: "設定",
  about: "このアプリについて"
};
const homeActions = {
  upload: {
    title: "ビデオ登録",
    hint: "アノテーション用の動画ファイルをインポートします"
  },
  manage: {
    title: pages.meta,
    hint: "インポートした動画のメタデータを管理します"
  },
  demo: {
    title: pages.demo,
    hint: "サンプルデータを取り込みライブデモを行います"
  }
};
const home = {
  disc: `
    MRI Vuewer は動画化された rtMRI データのアノテーションツールです.
    </br>
    音声波形と動画を同時に閲覧することが可能です.
    </br>
    </br>
    全てのファイルはローカルで処理をされます.
    </br>
    まずは <b>${homeActions.upload.title}</b> より御自身の動画ファイルを登録してみてください.
    `,
  ...homeActions
};

export default {
  ...ja,
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
    このページでは登録された動画ファイルのメタ情報を管理します.
    </br>
    メタ情報として付与する内容は自身で設定することが可能です.
    </br>
    メタ情報は動画の発話者, 撮影日, 発話内容等が想定されます.
    </br>
    メタ情報は動画ファイル検索時に使用されます.
    `
  },
  demo: {
    disc: `
    このページではサンプル動画を使って MRI Vuewer の機能を確認することができます.
    `
  },
  setting: {
    disc: `このページでは MRI Vuewer の設定を行うことができます.`,
    form: {
      wavesurfer: {
        waveform: {
          label: "波形表示設定",
          minPxPerSec: {
            label: "pixels per sec",
            hint:
              "1 sec を何ピクセルで表示するか? 大まかに時刻方向の拡大比率になります"
          },
          cursorColor: {
            label: "カーソル色"
          },
          waveColor: {
            label: "未再生波形色"
          },
          progressColor: {
            label: "再生済み波形色"
          },
          showTimeLine: {
            label: "時間軸を表示する"
          },
          showSpectrogram: {
            label: "スペクトログラムを表示する"
          }
        },
        spectrogram: {
          label: "スペクトログラム表示設定",
          targetChannel: {
            label: "対象チャンネル"
          },
          freqRate: {
            label: "表示周波数率",
            hint:
              "周波数表示比率. fft の解析結果を低域何パーセントまで表示するかです. 0.25 - 1 までの値にしてください"
          },
          showFreqLabel: {
            label: "周波数軸ラベルを表示する"
          }
        }
      }
    }
  }
};
//# sourceMappingURL=ja.js.map
