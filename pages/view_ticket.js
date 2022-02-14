import Head from 'next/head'
import { useEffect, useState } from 'react'

function ShowContent({content}) {
    useEffect(() => {
        // might be xss vulnerable
        // if you open a bad link it might be able to install a serviceworker
        // that takes over other parts of the site
        // not sure about that though.
        document.open();
        document.write(content);
        return () => {
            console.log("TODO hide content");
        };
    }, []);

    return <></>;
}

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