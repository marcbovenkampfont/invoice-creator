import type { Client } from "@/domains/clients/types/client";
import type { BankAccount } from "@/domains/bankAccounts/types/bankAccount";
import type { BusinessInfo } from "@/domains/settings/types/business";

export interface PdfData {
    title: string;
    client: Client;
    bankAccount: BankAccount;
    businessInfo: BusinessInfo;
    date: string;
    amount: number;
    items?: Array<{
        description: string;
        quantity: number;
        unity: string;
        price: number;
    }>;
}