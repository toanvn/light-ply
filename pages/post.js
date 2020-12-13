import Link from 'next/link'
import Container from '../components/container'
function Post(props) {
    return <Container>
        <Link href='/'>Home</Link>
        <Link href='/posts/1232'>AAA</Link>
        <Link href='/posts/3333333'>AAA</Link>
        <div>Welcome to POST.js!  {props.stars}</div>
    </Container>
}

export async function getStaticProps() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return {
        props: { stars: json.stargazers_count }
    }
}

export default Post