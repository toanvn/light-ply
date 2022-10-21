import Link from "next/link"
import Head from "next/head"
import Container from "../../components/container"
import Router, { useRouter } from "next/router"
import Plyr from '../../components/Plyr'
import 'plyr-react/dist/plyr.css'
import { useEffect, useRef } from "react"
import fetchJsonp from "fetch-jsonp"

function PlayerPage({links}) {
    const ref = useRef()
    const router = useRouter()
    let {fileId} = router.query  
    const thumbnail = `https://media.safechat.com/v3/media/getfile/${fileId}?format=thumbnail`
    const cfgData = {
        url: links.hls,
        preload: false
    }

    async function getJsonp() {
        const apiLink = `http://localhost:8888/jsonp`
        const res = await fetchJsonp(apiLink, {
            jsonpCallback: 'callback'
        })
        const json = await res.json()
        console.log(json)
        return json
    }

    getJsonp()

    return <Container>
        <Plyr ref={ref} hlsData={cfgData} playsInline data-poster={thumbnail} />
    </Container>
}


PlayerPage.getInitialProps = async ({query}) => {
    // const { fileId } = query
    // const apiLink = `http://localhost:8888/jsonp`
    // const res = await window.fetchJsonp(apiLink, {
    //     jsonpCallbackFunction: func
    //   })
    // const json = await res.json()
    return {links: {hls: ''}}
  }

export default PlayerPage