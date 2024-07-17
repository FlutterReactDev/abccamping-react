export interface Split {
    id: number;
    name: string;
    created_at: Date;
    leads_count: number;
}

export interface SplitDetail {
    id: number;
    split_id: number;
    qr_url: string;
    name: string;
    redirect: string;
    size: number;
    admin_total: number;
    admin_uniq: number;
    user_total: number;
    user_uniq: number;
}

export interface CreateSplitRequest {
    name: string;
}
