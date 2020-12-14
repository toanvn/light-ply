import Link from "next/link"
import Head from "next/head"
import Container from "../../components/container"
import Router from "next/router"
import Plyr from '../../components/Plyr'
import 'plyr-react/dist/plyr.css'
import { useEffect, useRef } from "react"

function PlayerPage(props) {
    const ref = useRef()
    const cfgData = {
        url: 'https://vs.ntd.tv/2020/1211/92441e4c-476d-41d9-ad03-faf2833f615a/playlist.m3u8',
        preload: false
    }

    return <Container>
        <Plyr ref={ref} hlsData={cfgData} playsInline data-poster="https://vs.youmaker.com/assets/2020/1211/dd005457-da65-4259-9993-069c53d46428/thumbnail_d.jpg" />
        {/* <Plyr ref={ref2} hlsData={cfgData} crossOrigin playsInline poster="https://vs.youmaker.com/assets/2020/1211/dd005457-da65-4259-9993-069c53d46428/thumbnail_d.jpg" /> */}
    </Container>
}

export default PlayerPage