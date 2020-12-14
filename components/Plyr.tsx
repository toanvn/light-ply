/* eslint-disable react/self-closing-comp */
import React, {
  HTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import PlyrJS, { Options, SourceInfo, PlyrEvent as PlyrJSEvent } from 'plyr'
import Hls from 'hls.js'

interface HlsCfg {
  url: string,
  preload: boolean
}

export type PlyrInstance = PlyrJS
export type PlyrEvent = PlyrJSEvent
export type PlyrCallback = (this: PlyrJS, event: PlyrEvent) => void

export type PlyrProps = HTMLAttributes<HTMLVideoElement> & {
  source?: SourceInfo
  options?: Options,
  hlsData?: HlsCfg
}
export type HTMLPlyrVideoElement = HTMLVideoElement & { plyr?: PlyrInstance }

export const Plyr = React.forwardRef<HTMLPlyrVideoElement, PlyrProps>(
  (props, ref) => {
    const { options = null, source, hlsData, ...rest } = props
    const innerRef = useRef<HTMLPlyrVideoElement>()

    const hlsCfg = {
      autoStartLoad: hlsData.preload? true: false,
      startPosition: -1,
      maxBufferLength: 30,
      maxMaxBufferLength: 30,
      maxBufferSize: 6 * 1000 * 1000
    }

    useEffect(() => {
      if (!innerRef.current) return

      if (typeof ref === 'function') {
        if (innerRef.current) ref(innerRef.current)
      } else {
        if (ref && innerRef.current) ref.current = innerRef.current
      }

      if (innerRef.current) {
        if (!Hls.isSupported() && source) {
          if (!innerRef.current?.plyr) {
            innerRef.current.plyr = new PlyrJS(innerRef.current ,  {...options , "iconUrl":"../images/plyr.svg"})
          }
          innerRef.current.plyr.source = source
        } else if (hlsData && hlsData.url) {
          const hls = new Hls(hlsCfg);
          hls.loadSource(hlsData.url);

          hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            // Transform available levels into an array of integers (height values).
            const availableQualities = data.levels.map((l) => l.height)
      
            // Add new qualities to option
            let first = true;
            const quality  = {
              default: availableQualities[0],
              options: availableQualities,
              // this ensures Plyr to use Hls to update quality level
              forced: true,        
              onChange: (e) => {
                first = false;
                if(!first) {
                  hls.nextLoadLevel = data.levels.findIndex( l => l.height === e)
                }
              },
            }

            if (!innerRef.current?.plyr) {
              const cfgOptions = {...options, "quality": quality , "iconUrl":"../images/plyr.svg"}
              innerRef.current.plyr = new PlyrJS(innerRef.current , cfgOptions )
              let count = 0;
              innerRef.current.plyr.on('timeupdate', () => {
                if(count === 10) {
                  innerRef.current.plyr.quality = data.levels[hls.loadLevel].height
                  count = 0
                }
                count++
              })
              if(!hlsData.preload) {
                innerRef.current.plyr.once('play', () => {
                  hls.startLoad();
                })
              }
            }
          });

          hls.attachMedia(innerRef.current);
          // window.hls = hls;
        }
      }
    }, [ref, options, source])

    return (
      <video
        ref={(innerRef as unknown) as MutableRefObject<HTMLVideoElement>}
        className="plyr-react plyr"
        {...rest}
      />
    )
  }
)

Plyr.displayName = 'Plyr'

Plyr.defaultProps = {
  options: {
    controls: [
      'play-large',
      //'rewind',
      'play',
      //'fast-forward',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'settings',
      'fullscreen',
    ],
    //settings: ['captions', 'quality', 'speed', 'loop'],
    i18n: {
      restart: 'Restart',
      rewind: 'Rewind {seektime}s',
      play: 'Play',
      pause: 'Pause',
      fastForward: 'Forward {seektime}s',
      seek: 'Seek',
      seekLabel: '{currentTime} of {duration}',
      played: 'Played',
      buffered: 'Buffered',
      currentTime: 'Current time',
      duration: 'Duration',
      volume: 'Volume',
      mute: 'Mute',
      unmute: 'Unmute',
      enableCaptions: 'Enable captions',
      disableCaptions: 'Disable captions',
      download: 'Download',
      enterFullscreen: 'Enter fullscreen',
      exitFullscreen: 'Exit fullscreen',
      frameTitle: 'Player for {title}',
      captions: 'Captions',
      settings: 'Settings',
      menuBack: 'Go back to previous menu',
      speed: 'Speed',
      normal: 'Normal',
      quality: 'Quality',
      loop: 'Loop',
    },
  },
  source: {
    type: 'video',
    sources: [
      {
        src:
          'https://rawcdn.githack.com/chintan9/Big-Buck-Bunny/e577fdbb23064bdd8ac4cecf13db86eef5720565/BigBuckBunny720p30s.mp4',
        type: 'video/mp4',
        size: 720,
      },
      {
        src:
          'https://rawcdn.githack.com/chintan9/Big-Buck-Bunny/e577fdbb23064bdd8ac4cecf13db86eef5720565/BigBuckBunny1080p30s.mp4',
        type: 'video/mp4',
        size: 1080,
      },
    ],
  },
}

Plyr.propTypes = {
  options: PropTypes.object,
  source: PropTypes.any,
}

export default Plyr