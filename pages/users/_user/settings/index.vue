<template>
  <article class="post">
    <section class="settings-content content-height settings">
      <div class="row flex-xl-nowrap align-items-start content-height">
        <div class="flex-xl-basis-9 profile-settings-content section-items content-height">
          <section class="post-settings">
            <h4 class="post-settings-title-h4">Settings</h4>
            <div class="post-settings-list">
              <div class="sub-title sub-title-6 bold-900">Account Information</div>
              <div class="settings-list">
                <div class="setting-item" :class="{active: settings.email}">
                  <div class="setting-content">
                    <input type="text" class="setting-item-input" v-model="$auth.user.email">
                  </div>
                  <div class="actions">
                    <div class="actions-btn edit-btn" @click="settings.email = true">

                    </div>
                    <div class="actions-btn close-btn" @click="settings.email = false">
                    </div>
                    <div class="actions-btn accept-btn" @click="submitUpdate('email')">
                    </div>
                  </div>
                </div>
                <div class="setting-item" :class="{active: settings.phone}">
                  <div class="setting-content">
                    <input type="text" class="setting-item-input" v-model="$auth.user.phone">
                  </div>
                  <div class="actions">
                    <div class="actions-btn edit-btn" @click="settings.phone = true">

                    </div>
                    <div class="actions-btn close-btn" @click="settings.phone = false">

                    </div>
                    <div class="actions-btn accept-btn"  @click="submitUpdate('phone')">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="flex-xl-basis-3 profile-settings-sidebar right-sidebar-banner section-items">
        </div>
      </div>
    </section>
  </article>
</template>

<script>
  export default {
    name: "UserProfileSettings",

    data() {
      return {
        settings: {
          email: false,
          phone: false
        }
      }
    },

    methods: {
      async submitUpdate(field) {
        try {
          await this.$axios.$post(`users/${this.$auth.user.route_key}`, { [field]: this.$auth.user[field] })

          this.settings[field] = false;
        }
        catch (e) {
          console.error(e)
        }
      }
    },

    async validate({ store, $auth }) {
      return store.state.users.model.id === $auth.user.id;
    }
  }
</script>

<style scoped>
  .settings-list {
    display: flex;
    flex-direction: column;
  }

  .settings-list .setting-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .settings-list .setting-item-input {
    border: 0;
    padding: 0;
    pointer-events: none;
    font-size: 14px;
  }

  .settings-list .setting-item .actions {
    display: flex;
  }

  .settings-list .setting-item .actions .actions-btn {
    margin-left: 10px;
    cursor: pointer;
  }

  .settings-list .setting-item .actions .actions-btn:first-child {
    margin-left: 0;
  }

  .settings-list .setting-item .actions .edit-btn {
    width: 28px;
    height: 28px;
    background: url("/img/icons/_publicProfile/ic-edit.svg") no-repeat center;
  }

  .settings-list .setting-item .actions .close-btn {
    width: 28px;
    height: 28px;
    background: url("/img/icons/_publicProfile/ic-cancel.svg") no-repeat center;
  }

  .settings-list .setting-item .actions .accept-btn {
    width: 28px;
    height: 28px;
    background: url("/img/icons/_publicProfile/ic-save.svg") no-repeat center;
  }

  .settings-list .setting-item .actions .close-btn,
  .settings-list .setting-item .actions .accept-btn {
    display: none;
  }

  /* active setting item */
  .settings-list .setting-item.active .setting-content {
    width: 100%;
  }

  .settings-list .setting-item.active .setting-item-input {
    width: 100%;
    height: 48px;
    display: block;
    padding: 13px 48px 13px 11px;
    box-shadow: none !important;
    outline: none !important;
    border: 1px solid #E1E4E8;
    border-radius: 4px;
    background-color: #fff;
    text-align: left;
    line-height: 20px;
    font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    font-weight: normal;
    font-size: 16px;
    color: #8A94A6;
    transition: all 0.15s ease-in-out;
    pointer-events: auto;
  }

  .settings-list .setting-item.active .actions .edit-btn {
    display: none;
  }

  .settings-list .setting-item.active .actions .close-btn,
  .settings-list .setting-item.active .actions .accept-btn {
    display: block;
  }
</style>
