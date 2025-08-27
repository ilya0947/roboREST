import { defineStore } from 'pinia';

export const useGlobalState = defineStore('globalState', {
  state: () => ({
      w: 1024,
      showItemsPage: 10,
      currentPage: 1,
      totalPages: 1,
      balance:'Загрузка...',
      modeView:'preloader',
      transHistory:{},
      botCodeList:{},
      showItems:[],
      memberId: '',
      linkToInstuction: 'https://vkvideo.ru/playlist/-24162245_45684532',
      cozeUrl: 'https://www.coze.com/api/permission/oauth2/authorize?response_type=code&client_id=37543932253037586079121083629541.app.coze&redirect_uri=https://ai.app.ipgpromo.ru/coze-auth&state=',
  }),
  actions: {
    setTitle(title) {
      this.title =  title;
    },
    setBalance(token) {
      this.balance =  token ? new Intl.NumberFormat('ru-RU').format(token) : 0;
    },
    updateAsistentsAndBots(key, data = {}) {
      if (this.asistents[key]) {
        for (let k in data)
          this.asistents[key][k] = data[k];
      } else if (this.bots[key]) {
        for (let k in data)
          this.bots[key][k] = data[k];
      }
    },

    setAsistentsAndBots(asistentsAndBots) {
      // const bots = {};
      // const asistents = {};
      for (let k in asistentsAndBots) {
        if (asistentsAndBots[k].type === 'B') {
          this.bots[k] = asistentsAndBots[k];
        } else {
          this.asistents[k] = asistentsAndBots[k];
        }
      }
      // this.bots =  bots;
      // this.asistents =  asistents;
    },
    setTransHistory(tranzactions) {
      this.transHistory =  tranzactions;
    },
    setModeView(mode) {
      this.modeView =  mode;
    },
    setShowItemsPage(num) {
      localStorage.setItem('show_items_page', num),
      this.showItemsPage =  num;
    },
    setCurrentPage(num) {
      localStorage.setItem('current_page', num),
      this.currentPage =  num;
    },
    setTotalPages(num) {
      this.totalPages =  num;
    },
    setMemberId(memberId) {
      this.memberId =  memberId;
    },
    setBotCodeList(botCodeList) {
      this.botCodeList =  botCodeList;
    },
    setShowItems(items) {
      this.showItems =  items;
    },
    updateBotCodeList(key,value) {
      this.botCodeList[key] = value;
    },
  },
  getters: {
    getBotIdByCode: state => code => state.botCodeList[code],
    getStartSlice: state => (state.currentPage - 1) * state.showItemsPage,
  }
});