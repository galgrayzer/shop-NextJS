import SigninPage from "../(componnent)/SigninPage";

const dynamicPage = ({ params }: { params: { id: string }}) => {
    return (
        <SigninPage params={ params } />
    );
}

export default dynamicPage;