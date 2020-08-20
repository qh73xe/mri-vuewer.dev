import ja from "vuetify/src/locale/ja.ts";
import store from "@/store/index.js";
const pages = {
  home: "ホーム",
  meta: "メタデータ管理",
  demo: "ライブデモ",
  setting: "設定",
  about: "このアプリについて",
  db: {
    clear: "データベースの削除",
    dump: "データベースのエクスポート",
    load: "データベースのインポート (JSON)",
    add: "ビデオ登録"
  },
  on: {
    destroy: "{0} のデータは削除されました.",
    dump: "データベースはエクスポートされました.",
    load: "データベースは更新されました",
    clear: "すべてのデータを削除しました"
  }
};
const homeActions = {
  upload: {
    title: pages.db.add,
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
  prev: "戻る",
  validations: {
    required: "この項目は必須項目です!",
    positiveInteger: "この項目は正の整数です!",
    positiveIntegerOrError: "この項目は正の整数または -1 です",
    positiveFloat: "この項目は正の数値です!",
    maxVideoSize: `登録可能な動画ファイルサイズは ${store.state.setting.maxVideoSize} MB までです!`,
    hasArrayBuffer: "想定外の動画ファイルです [No Array buffer]!",
    less: "この値は {0} 文字以下です.",
    alreadyExists: "この値は既に存在しています.",
    notExist: "この値は存在しません"
  },
  forms: {
    db: {
      title: "データベースインポートフォーム",
      warning:
        "この処理を実行すると既存のデータは失われます.処理を実行しますか?",
      messages: {
        stop: "データベースのインポートを停止しました",
        success: "データベースのインポートに成功しました",
        outofmemory: "データベースのインポートに失敗しました [out of memory]"
      }
    },
    video: {
      title: "動画登録フォーム",
      messages: {
        stop: "動画の登録が中止されました",
        success: "動画が登録されました",
        outofmemory: "動画の登録に失敗しました [out of memory]"
      },
      finish: "動画の登録に成功しました",
      restart: "別の動画を登録する",
      steps: {
        select: "ファイル選択",
        confirmation: "コーディック確認",
        meta: "メタデータの追記"
      },
      desc: {
        confirmation:
          "以下の情報を確認し問題がなければ <kbd>OK</kbd> をクリックしてください.",
        meta: `
      動画メタデータの登録を行います.
      </br>
      例えば発話者情報を登録する場合,
      <code>key field</code> に "speaker",
      <code>value field</code> に 発話者名 を入力します.
      <br />
      その後, <kbd>+</kbd> ボタンをクリックしてください.
      <br />
      <br />
      最後に <kbd>OK</kbd> ボタンをクリックすると登録が終了します.`
      }
    },
    tier: {
      title: "新規アノテーション階層フォーム"
    },
    tierEdit: {
      title: "アノテーション階層編集フォーム",
      warning:
        "この処理を実施するとこの階層のアノテーション情報は初期化されます.処理を実行しますか?"
    },
    tierDelete: {
      title: "アノテーション階層削除フォーム"
    },
    detail: {
      title: "動画詳細情報"
    },
    ruler: {
      title: "フレーム計測ダイアログ"
    },
    imageEdit: {
      title: "フレーム編集モード"
    }
  },
  wVideo: {
    videoPre: {
      label: "前画像"
    },
    video: {
      label: "現画像"
    },
    videoPos: {
      label: "後画像"
    }
  },
  io: {
    db: {
      json: {
        title: "DB データを選択してください (json)"
      }
    },
    mVideoInput: {
      title: "動画ファイルを選択",
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
      app: {
        label: "システム設定",
        timeout: {
          label: "メッセージタイムアウト",
          hint:
            "システムメッセージのタイムアウト時間を設定します.この項目が -1 の場合, メッセージの自動非表示処理が抑制されます."
        }
      },
      loading: {
        label: "ファイル登録設定",
        maxVideoSize: {
          label: "ファイル最大容量.",
          hint:
            "この項目が大きい場合, 登録可能なファイル数が減ります. 登録可能なファイル数は使用端末のスペックに依存します."
        },
        shouldGetVideoInfo: {
          label: "ファイル登録時にビデオコーディックを確認する.",
          hint:
            "この項目が false の場合, 動画の時間, fps, 縦横サイズ等を手動で入力することになります."
        },
        shouldGetFrameInfo: {
          label: "ファイル登録時に全てのフレーム画像を取得する.",
          hint:
            "この項目が true の場合, 登録処理に多少の時間がかかります. 一方で解析時には正確なフレーム提示を行います."
        }
      },
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
};
//# sourceMappingURL=ja.js.map
