// Service para combinar datos locales con datos del storage
import type { Client } from '@/domains/clients/types/client';
import type { BankAccount } from '@/domains/bankAccounts/types/bankAccount';
import type { BusinessInfo } from '@/domains/settings/types/business';
import { clients as localClients } from '@/util/constants/clients';
import { bankAccounts as localBankAccounts } from '@/util/constants/bankAccounts';
import { businessInfo as localBusinessInfo } from '@/util/constants/business';
import { clientStorage, bankAccountStorage, businessInfoStorage } from './storage';

// Combinar clientes locales con los del storage
export const getAllClients = (): Client[] => {
  const storageClients = clientStorage.getAll() as Client[];
  
  // Crear un mapa para evitar duplicados por ID
  const clientMap = new Map<string, Client>();
  
  // Añadir clientes locales primero
  localClients.forEach(client => {
    clientMap.set(client.id, client);
  });

  console.log('Local Clients:', localClients);
  
  // Añadir clientes del storage (pueden sobrescribir si hay mismo ID)
  storageClients.forEach(client => {
      clientMap.set(client.id, client);
    });
    
  console.log('Storage Clients:', storageClients);
   
  return Array.from(clientMap.values());
};

// Combinar cuentas bancarias locales con las del storage
export const getAllBankAccounts = (): BankAccount[] => {
  const storageBankAccounts = bankAccountStorage.getAll() as BankAccount[];
  
  // Crear un mapa para evitar duplicados por ID
  const accountMap = new Map<string, BankAccount>();
  
  // Añadir cuentas locales primero
  localBankAccounts.forEach(account => {
    accountMap.set(account.id, account);
  });
  
  // Añadir cuentas del storage (pueden sobrescribir si hay mismo ID)
  storageBankAccounts.forEach(account => {
    accountMap.set(account.id, account);
  });
  
  return Array.from(accountMap.values());
};

// Obtener información del negocio (prioriza storage sobre local)
export const getBusinessInfo = (): BusinessInfo | null => {
  const storageInfo = businessInfoStorage.get();
  
  console.log("Storage Business Info:", storageInfo);
  
  // Priorizar storage si existe, sino usar el local
  if (storageInfo) {
    return storageInfo as BusinessInfo;
  }
  
  // Si existe información local, devolverla (el primer elemento del array)
  if (localBusinessInfo && localBusinessInfo.length > 0) {
    return localBusinessInfo[0];
  }
  
  return null;
};

// Guardar información del negocio
export const saveBusinessInfo = (info: BusinessInfo): void => {
  businessInfoStorage.set(info);
  console.log("Business Info saved:", info);
};

// Helper para generar IDs únicos
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
