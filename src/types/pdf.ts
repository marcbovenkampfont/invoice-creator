import type { Client } from "./client";
import type { BankAccount } from "./bankAccount";

export interface PdfData {
    title: string;
    client: Client;
    bankAccount: BankAccount;
    date: string;
    amount: number;
    items?: Array<{
        description: string;
        quantity: number;
        unity: string;
        price: number;
    }>;
}