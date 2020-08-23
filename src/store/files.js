import db from "@/storage/db";

export default {
  namespaced: true,
  state: () => ({
    files: [],
    isLoading: false,
    count: 0
  }),
  mutations: {
    push: function(state, obj) {
      state.files.push(obj);
      state.count = state.count + 1;
    },
    update: function(state, obj) {
      const idx = state.files.findIndex(x => x.id == obj.id);
      if (idx > -1) {
        state.files[idx] = obj;
      }
    },
    destroy: function(state, id) {
      const i = state.files.findIndex(x => x.id == id);
      if (i > -1) {
        state.files.splice(i, 1);
        state.count = state.count - 1;
      }
    },
    isLoading: function(state, payload) {
      state.isLoading = payload;
    },
    count: function(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    // ファイルストア初期化
    init: function(context) {
      return new Promise((resolve, reject) => {
        context.commit("isLoading", true);
        db.files
          .count()
          .then(x => {
            context.commit("count", x);
            db.files
              .toArray()
              .then(items => {
                for (const x of items) {
                  context.commit("push", x);
                }
                context.commit("isLoading", false);
                resolve(true);
              })
              .catch(error => {
                context.commit("isLoading", false);
                reject(error);
              });
          })
          .catch(error => {
            context.commit("isLoading", false);
            reject(error);
          });
      });
    },
    // ファイル一覧の取得
    load: function(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit("isLoading", true);
        db.load(payload)
          .then(items => {
            context.state.files = items;
            context.commit("count", items.length);
            resolve(true);
          })
          .catch(error => reject(error))
          .finally(() => context.commit("isLoading", false));
      });
    },
    // ファイル一覧を JSON 形式で出力
    dump: function(context) {
      return new Promise((resolve, reject) => {
        context.commit("isLoading", true);
        db.dump()
          .then(() => resolve(true))
          .catch(error => reject(error))
          .finally(() => context.commit("isLoading", false));
      });
    },
    // ファイルDB をクリア
    clear: function(context) {
      return new Promise((resolve, reject) => {
        context.commit("isLoading", true);
        db.files
          .clear()
          .then(() => {
            context.state.files = [];
            resolve(true);
          })
          .catch(error => reject(error))
          .finally(() => context.commit("isLoading", false));
      });
    },
    // 一つのファイルを追加
    push: function(context, obj) {
      return new Promise((resolve, reject) => {
        context.commit("isLoading", true);
        db.files
          .put(obj)
          .then(id => {
            context.commit("push", obj);
            resolve(id);
          })
          .catch(error => reject(error))
          .finally(() => context.commit("isLoading", false));
      });
    },
    // 一つのファイルを削除
    destroy: function(context, id) {
      return new Promise((resolve, reject) => {
        context.commit("isLoading", true);
        db.files
          .delete(id)
          .then(() => {
            context.commit("destroy", id);
            resolve(id);
          })
          .catch(error => reject(error))
          .finally(() => context.commit("isLoading", false));
      });
    }
  }
};
