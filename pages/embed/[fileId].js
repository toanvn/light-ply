import Link from "next/link"
import Head from "next/head"
import Container from "../../components/container"
import Router, { useRouter } from "next/router"
import Plyr from '../../components/Plyr'
import 'plyr-react/dist/plyr.css'
import { useEffect, useRef } from "react"

function PlayerPage({links}) {
    const ref = useRef()
    const router = useRouter()
    let {fileId} = router.query  
    const thumbnail = `https://media.safechat.com/v3/media/getfile/${fileId}?format=thumbnail`
    const cfgData = {
        url: links.hls,
        preload: false
    }

    return <Container>
        <Plyr ref={ref} hlsData={cfgData} playsInline data-poster={thumbnail} />
    </Container>
}

PlayerPage.getInitialProps = async ({query}) => {
    const { fileId } = query
    const apiLink = `https://media.safechat.com/v3/media/getfile/${fileId}?link=1`
    const res = await fetch(apiLink)
    const json = await res.json()
    return {links: json}
  }

export default PlayerPage