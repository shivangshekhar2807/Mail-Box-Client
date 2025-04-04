import { useSelector } from "react-redux";


function Home() {
    const email = useSelector((state) => state.Auth.email);
    return <div>
        welcome to Email box {email}
    </div>
}

export default Home;