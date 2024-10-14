import { randomBytes } from "crypto";
import { cookies } from "next/headers";

import PBSessionRecord from "@/models/PB/PBSessionRecord";
import AccountDitails from "@/models/json/AccountDitails";
import { checkAccount } from "@/utils/account";


const saveSession = async (token: string, username: string) => {
    let res = await fetch(process.env.DB_URL + `/collections/sessions/records?filter=(username='${username}')`);
    let record: PBSessionRecord = await res.json();

    if (record.items.length === 1) {
        res = await fetch(process.env.DB_URL + `/collections/sessions/records/${record.items[0].id}`, {
            method: "PATCH",
            body: JSON.stringify(
                {
                    "token": token,
                }
            ),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } else {
        res = await fetch(process.env.DB_URL + `/collections/sessions/records`, {
            method: "POST",
            body: JSON.stringify(
                {
                    "token": token,
                    "username": username
                }
            ),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }   

    if (res.status !== 200) {
        console.log(res.status, res.statusText);
        return [false, "Failed to save session"];
    }
    return [true, ""];
}

export async function POST(req: Request, res: Response) {
    const { username, password }: AccountDitails = Object(await req.json());
    let [succsess, msg] = await checkAccount(username, password);
    if (!succsess) {
        return Response.json({
            "status": 401,
            "message": msg
        })
    }

    const token = randomBytes(16).toString('hex');
    [succsess, msg ] = await saveSession(token, username);
    if (!succsess) {
        return Response.json({
            "status": 500,
            "message": msg
        })
    }
    cookies().set("token", token);

    return Response.json({
        "status": 300,
        "redirect": "/",
        "token": token
    })
}