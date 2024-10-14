import AccountDitails from "@/models/json/AccountDitails";
import { checkAccount } from "@/utils/account";

export async function POST(req: Request, res: Response) {
    const { username, password }: AccountDitails = Object(await req.json());
    let [succsess, msg] = await checkAccount(username);
    if (succsess) {
        return Response.json({
            "status": 401,
            "message": "Username already exists"
        })
    }
}