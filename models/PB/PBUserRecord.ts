interface PBUserRecord {
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
    id: string;
    password: string;
    scope: string;
    updated: string;
    username: string;
}

export default PBUserRecord;