const SRC = `${CMWN.MEDIA.VIDEO}waste-busters.mp4`;

export default function (props, ref, key) {
    return (
        <skoash.Screen
            {...props}
            ref={ref}
            key={key}
            id="video"
        >
            <skoash.Image src={`${CMWN.MEDIA.IMAGE}frame.intro.video.png`} />
            <skoash.Video src={SRC} />
        </skoash.Screen>
    );
}
