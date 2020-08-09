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
    disc: `このページでは MRI Vuewer の設定を行うことができます.`
  }
};
//# sourceMappingURL=ja.js.map
