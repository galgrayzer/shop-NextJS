interface AccountDitails {
    username: string;
    password: string;
}

export async function POST(req: Request, res: Response) {
    const { username, password }: AccountDitails = Object(await req.json());
    console.log(username, password);
    return Response.json({
        "status": 300,
        "redirect": "/"
    })
}