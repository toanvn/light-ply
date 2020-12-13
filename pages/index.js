import Link from "next/link"
import Head from "next/head"
import Container from "../components/container"
import Router from "next/router"

function HomePage(props) {
    return <Container>
        <Head>
            <title>Welcome!</title>
        </Head>
        <ul>
            <li><Link href='/embed/player'>Play video</Link></li>
        </ul>
    </Container>
}

export default HomePage