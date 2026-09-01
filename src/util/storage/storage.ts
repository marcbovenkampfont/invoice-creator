// Storage utilities para manejar localStorage

const STORAGE_KEYS = {
  CLIENTS: 'invoice_creator_clients',
  BANK_ACCOUNTS: 'invoice_creator_bank_accounts',
  BUSINEESS_INFO: 'invoice_creator_business_info',
} as const;

// Generic storage functions
export const storageService = {
  // Get data from localStorage
  getData<T>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return [];
    }
  },

  // Save data to localStorage
  setData<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  },

  // Add item to storage
  addItem<T extends { id: string }>(key: string, item: T): void {
    const items = this.getData<T>(key);
    items.push(item);
    this.setData(key, items);
  },

  // Update item in storage
  updateItem<T extends { id: string }>(key: string, id: string, updatedItem: T): void {
    const items = this.getData<T>(key);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = updatedItem;
      this.setData(key, items);
    }
  },

  // Delete item from storage
  deleteItem<T extends { id: string }>(key: string, id: string): void {
    const items = this.getData<T>(key);
    const filtered = items.filter(item => item.id !== id);
    this.setData(key, filtered);
  },

  // Clear all data for a key
  clearData(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing localStorage (${key}):`, error);
    }
  }
};

// Client-specific functions
export const clientStorage = {
  getAll: () => storageService.getData(STORAGE_KEYS.CLIENTS),
  add: (client: any) => storageService.addItem(STORAGE_KEYS.CLIENTS, client),
  update: (id: string, client: any) => storageService.updateItem(STORAGE_KEYS.CLIENTS, id, client),
  delete: (id: string) => storageService.deleteItem(STORAGE_KEYS.CLIENTS, id),
  clear: () => storageService.clearData(STORAGE_KEYS.CLIENTS)
};

// Bank account-specific functions
export const bankAccountStorage = {
  getAll: () => storageService.getData(STORAGE_KEYS.BANK_ACCOUNTS),
  add: (account: any) => storageService.addItem(STORAGE_KEYS.BANK_ACCOUNTS, account),
  update: (id: string, account: any) => storageService.updateItem(STORAGE_KEYS.BANK_ACCOUNTS, id, account),
  delete: (id: string) => storageService.deleteItem(STORAGE_KEYS.BANK_ACCOUNTS, id),
  clear: () => storageService.clearData(STORAGE_KEYS.BANK_ACCOUNTS)
};

// Business info-specific functions (maneja un objeto único, no un array)
export const businessInfoStorage = {
  get: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUSINEESS_INFO);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading business info from localStorage:', error);
      return null;
    }
  },
  set: (info: any) => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUSINEESS_INFO, JSON.stringify(info));
    } catch (error) {
      console.error('Error writing business info to localStorage:', error);
    }
  },
  clear: () => storageService.clearData(STORAGE_KEYS.BUSINEESS_INFO)
};