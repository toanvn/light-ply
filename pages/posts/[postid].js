import Link from 'next/link'
import { useRouter } from 'next/router'
import Container from '../../components/container'


function PostDetail(props) {
    const router = useRouter()
    const { postid } = router.query

    return <Container>
        <Link href='/'>Home</Link>
        <div>Welcome to POST detail.js!  {props.stars}</div>
        <p>Post: {postid}</p>
    </Container>
}

export default PostDetail