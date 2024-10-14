
import PBUserRecord from "@/models/PB/PBUserRecord";

export const checkAccount = async (username: string, password: string="") => {
    const res = await fetch(process.env.DB_URL + `/collections/users/records?filter=(username='${username}')`)
    const record: PBUserRecord = await res.json();
    if (record.items.length !== 1) {
        return [false, "Username not found"];
    }
    if (password !== "" && record.items[0].password !== password) {
        return [false, "Password is incorrect"];
    }
    return [true, ""];
}

export const checkId = async (id: string) => {
    const res = await fetch(process.env.DB_URL + `/collections/sessions/records?filter=(id='${id}')`)
    const record: PBUserRecord = await res.json();
        
    if (record.items.length !== 1) {
        return false
    }
    return true
}