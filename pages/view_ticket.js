import Head from 'next/head'
import { useEffect, useState } from 'react'

function ShowContent({content}) {
    return <iframe
        srcDoc={content.replace("</head>", "<base href=\"https://interpunct.info/\"></head>")}
        style={{
            "border": "none",
            "position": "absolute",
            "top": "0",
            "left": "0",
            "bottom": "0",
            "right": "0",
            "width": "100%",
            "height": "100%",
        }}
    />;
}

// we can fetch this serverside if we want to have a static site with no js

export default function ViewTicket() {
    const [content, setContent] = useState(undefined);

    useEffect(() => {
        fetch("/api/fetch_ticket_messages"+location.search).then(r => r.json()).then(r => {
            setContent(r);
        }).catch(e => {
            setContent({kind: "error", emsg: "fetch failed; "+e.toString()});
        });
    }, []);
    return <div>
        <Head>
            <title>inter·punct ticket viewer</title>
        </Head>
        <div>
            {content ? <>
                {content.kind === "error" ? "Error; "+content.emsg : <>
                    <ShowContent content={content.content} />
                </>}
            </> : "Loading…"}
        </div>
    </div>
}