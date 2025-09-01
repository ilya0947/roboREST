import { defineStore } from 'pinia';

export const useGlobalState = defineStore('globalState', {
  state: () => ({
      modeView:'preloader',
      items: [
        {
          id: 1,
          type: '',
          title: 'Отправка уведомлений',
          inParams: {},
          outParams: {}
        },
        {
          id: 2,
          type: '',
          title: 'Обработка заявок',
          inParams: {},
          outParams: {}
        },
        {
          id: 3,
          type: '',
          title: 'Синхронизация данных',
          inParams: {},
          outParams: {}
        },
      ]
  }),
  actions: {
    setModeView(mode) {
      this.modeView =  mode;
    },
    addNewItem() {
      const id = this.items.length ? (this.items[(this.items.length-1)].id+1) : 1;
      this.items.push({
        id,
        type: '',
        title: 'Новый элемент',
        inParams: {},
        outParams: {}
      });
      return id;
    },
    updateItem(id,data) {
      const index = this.items.findIndex(item => item.id === id);
      if (index || index === 0) this.items[index] = data;
    },
    deleteItem(id) {
      this.items = this.items.filter(ob=>ob.id !== id);
    }
  },
  getters: {
    getItemById: state => id => state.items.filter(item=>item.id === id)[0],
  }
});