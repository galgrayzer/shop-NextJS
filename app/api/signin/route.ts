import PBRecord from "@/models/PB/PBRecord";

interface AccountDitails {
    username: string;
    password: string;
}

const checkAccount = async (username: string, password: string) => {
    const res = await fetch(process.env.DB_URL + `/collections/users/records?filter=(username='${username}')`)
    const record: PBRecord = await res.json();
    if (record.items.length !== 1) {
        return [false, "Username not found"];
    }
    if (record.items[0].password !== password) {
        return [false, "Password is incorrect"];
    }
    return [true, ""];
}

export async function POST(req: Request, res: Response) {
    const { username, password }: AccountDitails = Object(await req.json());
    const [succsess, msg] = await checkAccount(username, password);
    if (!succsess) {
        return Response.json({
            "status": 401,
            "message": msg
        })
    }
    
    return Response.json({
        "status": 300,
        "redirect": "/"
    })
}