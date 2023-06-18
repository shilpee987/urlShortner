import React from "react";
import "./home.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  function copy() {
    toast("Copied Sucessful");
  }

  const shorten = () => {
    // if(!!url){}else{
    //   toast('Please Enter an URL');
    //   return;
    // }

    if(url===""){
      toast('Please Enter an URL');
      return;
    }

    fetch("http://localhost:8080/meraServer/chotaKaro", {
      method: "POST",
      body: JSON.stringify({
        origUrl: url,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if(!!data.shortUrl){
          setSUrl(data.shortUrl);
          toast('Your URL has been Shortened.')
        }else if(data== 'Invalid Original Url'){
          toast('Invalid URL Entered');
        }else if (data == 'Server Error'){
          toast('Something wrong with the server.')
        }
        // if (sUrl) {
        //   toast(" Url Shorten !");
        // } 
        // else {
        //   toast(" Empty !");
        // }
      })
      .catch((err) => {
        console.log(err.message);
      });

   


  };
  const [url, setUrl] = useState("");
  const [sUrl, setSUrl] = useState("");
  //   const [Value, setValue] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const copytext = () => {
    setCopied(sUrl);
    if (sUrl) {
      toast(" Url copied successfully !");
    } else {
      toast("Nothing to Copy.");
    }
  };

  return (
    <div>
      <div className="box ">
        <h1>Shorten a long URL</h1>
        <div className="box-item">
          <input type="text" onChange={handleChange} placeholder="Paste Here" className="input-part" />
      
        </div>

        <div className="box-item">
          <input type="text" value={sUrl} placeholder="Copy Here " />{" "}
          <CopyToClipboard text={sUrl} onClick={copy} onCopy={copytext}>
            <span>
              <button className="btn btn-outline-dark">Copy</button>
            </span>
          </CopyToClipboard>
        </div>

        <ToastContainer />
        <span>
        <button type="button" onClick={shorten} className="btn btn-info btn-part">
          Shorten
        </button>
      </span>
      </div>
    </div>
  );
}

export default Home;
