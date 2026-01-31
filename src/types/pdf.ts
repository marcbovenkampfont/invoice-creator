import type { Client } from "./client";

export interface PdfData {
    title: string;
    client: Client;
    date: string;
    amount: number;
    items?: Array<{
        description: string;
        quantity: number;
        unity: string;
        price: number;
    }>;
}