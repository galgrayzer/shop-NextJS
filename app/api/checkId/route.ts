import { checkId } from "@/utils/account";

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const idSuccsess = await checkId(id ? id : "");
    if (idSuccsess) {
        return Response.json({
            "exist": true
        })
    } else {
        return Response.json({
            "exist": false
        })
    }
}