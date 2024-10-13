interface PBSessionRecord {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: PBRecordItem[];
}

interface PBRecordItem {
    collectionId: string;
    collectionName: string;
    created: string;
    expires: string;
    fields: object;
    id: string;
    token: string;
    updated: string;
    username: string;
}

export default PBSessionRecord;