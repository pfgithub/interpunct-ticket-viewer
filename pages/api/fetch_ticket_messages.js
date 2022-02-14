// TODO: make a v2 that uses json message data rather than
// html message data.

import fetch from "node-fetch";
import {minify} from "html-minifier";

export default function handler(req, res) {
    const {id1, id2} = req.query;
    if(id1 == null || !id1.match(/^[0-9]+$/)
    || id2 == null || !id2.match(/^[0-9]+$/)) {
        return res.status(400).json({kind: "error", emsg: "error; bad"});
    }
    fetch("https://cdn.discordapp.com/attachments/"+id1+"/"+id2+"/log.html").then(r => r.text()).then(r => {
        return res.status(200).json({kind: "success", content: minify(r, {
            collapseWhitespace: true,
        })});
    }).catch(e => {
        return res.status(500).json({kind: "error", emsg: "internal server error; "+e.toString()});
    });
  }
  