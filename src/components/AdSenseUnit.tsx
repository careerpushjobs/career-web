import Script from 'next/script'

type Props = {
    client: string
    slot: string
    format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
    responsive?: boolean
    style?: React.CSSProperties
}

export default function AdSenseUnit({
    client,
    slot,
    format = 'auto',
    responsive = true,
    style = { display: 'block' }
}: Props) {
    return (
        <div className="adsense-container text-center overflow-hidden my-4">
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
            <Script id={`adsense-push-${slot}`} strategy="afterInteractive">
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
        </div>
    )
}
