import React, { useState } from "react";
import { generatePdf } from "../../pdf/pdfGenerator";
import type { PdfData } from "../../types/pdf";
import { clients } from "../../util/constants/clients";
import { bankAccounts } from "../../util/constants/bankAccounts";
import Input from "../Input/Input";
import "./PdfForm.scss";
import type { Client } from "../../types/client";
import type { BankAccount } from "../../types/bankAccount";
import type { Item } from "../../types/items";

// Función para formatear números con formato europeo (1.234,56)
const formatEuropeanNumber = (num: number): string => {
	return num.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, '$&.')  // Añade punto cada 3 dígitos
		.replace(/\.(\d{2})$/, ',$1');         // Reemplaza el último punto por coma
};

// Función para parsear números en formato europeo a número
const parseEuropeanNumber = (str: string): number => {
	const cleaned = str.replace(/\./g, '').replace(/,/g, '.');
	const num = parseFloat(cleaned);
	return isNaN(num) ? 0 : num;
};

// Función para formatear input mientras se escribe
const formatInputNumber = (value: string): string => {
	// Convertir puntos a comas
	let cleaned = value.replace(/\./g, ',');
	// Permitir solo números y una coma
	cleaned = cleaned.replace(/[^0-9,]/g, '');
	// Asegurar solo una coma
	const parts = cleaned.split(',');
	if (parts.length > 2) {
		cleaned = parts[0] + ',' + parts.slice(1).join('');
	}
	return cleaned;
};

const PdfForm: React.FC = () => {
	const [selectedClient, setSelectedClient] = useState<Client | null>(null);
	const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccount>(bankAccounts[0]); // Por defecto la primera cuenta
	const [title, setTitle] = useState("");

	const [items, setItems] = useState<Item[]>([
		{ description: "", quantity: 1, unity: "", price: 0, amount: 0 }
	]);

	// Estados para los valores de texto de los inputs
	const [inputValues, setInputValues] = useState<{[key: string]: {quantity: string, price: string}}>({
		'0': { quantity: '1', price: '0' }
	});

	const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
		const newItems = [...items];
		newItems[index] = { ...newItems[index], [field]: value };
		
		// Calcular amount automáticamente
		if (field === 'quantity' || field === 'price') {
			newItems[index].amount = newItems[index].quantity * newItems[index].price;
		}
		
		setItems(newItems);
	};

	const handleNumberInputChange = (index: number, field: 'quantity' | 'price', value: string) => {
		const formatted = formatInputNumber(value);
		
		// Actualizar el valor del input
		setInputValues(prev => ({
			...prev,
			[index]: {
				...prev[index],
				[field]: formatted
			}
		}));

		// Convertir a número y actualizar el item
		const numValue = formatted === '' ? 0 : parseEuropeanNumber(formatted);
		handleItemChange(index, field, numValue);
	};

	const addItem = () => {
		const newIndex = items.length;
		setItems([...items, { description: "", quantity: 1, unity: "", price: 0, amount: 0 }]);
		setInputValues(prev => ({
			...prev,
			[newIndex]: { quantity: '1', price: '0' }
		}));
	};

	const removeItem = (index: number) => {
		if (items.length > 1) {
			setItems(items.filter((_, i) => i !== index));
			// Reorganizar los inputValues
			const newInputValues: {[key: string]: {quantity: string, price: string}} = {};
			Object.keys(inputValues).forEach((key) => {
				const numKey = parseInt(key);
				if (numKey < index) {
					newInputValues[key] = inputValues[key];
				} else if (numKey > index) {
					newInputValues[(numKey - 1).toString()] = inputValues[key];
				}
			});
			setInputValues(newInputValues);
		}
	};

	const getTotalAmount = () => {
		return items.reduce((sum, item) => sum + (item.amount ?? 0), 0);
	};

	const handleCreatePdf = () => {
		if (!selectedClient) {
			alert("Por favor, selecciona un cliente");
			return;
		}

		console.log("Selected Client:", selectedClient);
		console.log("Selected Bank Account:", selectedBankAccount);

		const data: PdfData = {
			title,
			client: selectedClient,
			bankAccount: selectedBankAccount,
			date: new Date().toLocaleDateString(),
			amount: getTotalAmount(),
			items: items,
		};

		generatePdf(data);
	};

	return (
		<div className="pdf-form">
			<div className="form-section">
				<h2 className="section-title">
					<span className="section-icon">👥</span>
					Selecciona un Cliente
				</h2>
				<div className="clients-grid">
					{clients.map((client) => (
						<div
							key={client.id}
							className={`client-card ${selectedClient?.id === client.id ? "selected" : ""}`}
							onClick={() => setSelectedClient(client)}
						>
							<div className="client-card-header">
							<h3 className="client-name">{client.name}</h3>
							{client.taxId && (
								<span className="client-tax-id">{client.taxId}</span>
							)}
							</div>
							<div className="client-details">
								{client.email && (
									<div className="detail-item">
										<span className="detail-icon">📧</span>
										<span className="detail-text">{client.email}</span>
									</div>
								)}
								<div className="detail-item">
									<span className="detail-icon">📍</span>
									<span className="detail-text">{client.address}, {client.cp} {client.city}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="form-section">
				<h2 className="section-title">
					<span className="section-icon">🏦</span>
					Selecciona una Cuenta Bancaria
				</h2>
				<div className="clients-grid">
					{bankAccounts.map((account) => (
						<div
							key={account.id}
							className={`client-card ${selectedBankAccount?.id === account.id ? "selected" : ""}`}
							onClick={() => setSelectedBankAccount(account)}
						>
							<div className="client-card-header">
								<h3 className="client-name">{account.name}</h3>
								<span className="client-tax-id">{account.accountHolder}</span>
							</div>
							<div className="client-details">
								<div className="detail-item">
									<span className="detail-icon">🏦</span>
									<span className="detail-text">{account.iban}</span>
								</div>
								<div className="detail-item">
									<span className="detail-icon">💳</span>
									<span className="detail-text">SWIFT: {account.swift}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleCreatePdf();
				}}
				className="invoice-form"
			>
				<div className="form-section">
					<h2 className="section-title">
						<span className="section-icon">📝</span>
						Datos de la Factura
					</h2>
					<div className="form-inputs">
						<Input
							label="Número de la factura"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Ej: INV000001"
							required
						/>
					</div>

					<div className="items-section">
						<h3 className="items-title">
							<span>📋 Items de la Factura</span>
							<button type="button" onClick={addItem} className="add-item-button">
								+ Añadir Item
							</button>
						</h3>
						
						<div className="items-table-container">
							<table className="items-table">
								<thead>
									<tr>
										<th>Descripción</th>
										<th>Cantidad</th>
										<th>Unidad</th>
										<th>Precio/Unidad</th>
										<th>Total</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{items.map((item, index) => (
										<tr key={index}>
											<td>
												<input
													type="text"
													value={item.description}
													onChange={(e) => handleItemChange(index, 'description', e.target.value)}
													placeholder="Descripción del servicio/producto"
													className="table-input"
													required
												/>
											</td>
											<td>
												<input
													type="text"
													value={inputValues[index]?.quantity || ''}
													onChange={(e) => handleNumberInputChange(index, 'quantity', e.target.value)}
													placeholder="0"
													className="table-input number-input"
													required
												/>
											</td>
											<td>
												<input
													type="text"
													value={item.unity}
													onChange={(e) => handleItemChange(index, 'unity', e.target.value)}
													placeholder="ej: hrs, uds"
													className="table-input small-input"
													required
												/>
											</td>
											<td>
												<input
													type="text"
													value={inputValues[index]?.price || ''}
													onChange={(e) => handleNumberInputChange(index, 'price', e.target.value)}
													placeholder="0,00"
													className="table-input number-input"
													required
												/>
											</td>
											<td className="amount-cell">
												<span className="amount-value">
												{formatEuropeanNumber(item.amount || 0)} €
												</span>
											</td>
											<td>
												<button
													type="button"
													onClick={() => removeItem(index)}
													className="remove-item-button"
													disabled={items.length === 1}
													title="Eliminar item"
												>
													🗑️
												</button>
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr>
										<td colSpan={4} className="total-label">Total:</td>
										<td className="total-amount" colSpan={2}>
											{formatEuropeanNumber(getTotalAmount())} €
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>

				<div className="form-actions">
					<button type="submit" className="submit-button" disabled={!selectedClient}>
						<span className="button-icon">📄</span>
						Generar PDF
					</button>
					{!selectedClient && (
						<p className="form-hint">⚠️ Selecciona un cliente para continuar</p>
					)}
				</div>
			</form>
		</div>
	);
};

export default PdfForm;
