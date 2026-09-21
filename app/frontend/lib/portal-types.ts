export type User = { id: string; name: string; email: string; role: 'admin' | 'client'; account_type: 'buyer' | 'seller'; kyc_status: string; kyc_id_number?: string; kyc_phone?: string; kyc_address?: string; kyc_document_uploaded?: number; created_at: string };
export type Property = { id: string; title: string; location: string; type: string; description: string; price: number; image: string; status: string; owner_user_id?: string; approval_status: string; owner_name?: string };
export type Payment = { id: string; title: string; amount: number; currency: string; status: string; customer?: string; email?: string; checkout_url?: string; created_at: string };
export type Dashboard = { user: User; users: User[]; properties: Property[]; myListings: Property[]; payments: Payment[]; saved: string[]; paymentsConfigured: boolean };
export type ApiResult = { user: User; properties: Property[]; url: string; status: string; success: boolean };
