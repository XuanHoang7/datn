import './Home.css';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
function Home() {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [resultMessage, setResultMessage] = useState(null);
    const [filePath, setFilePath] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state;;
    const [firstHalfImages, setFirstHalfImages] = useState([]);
    const [secondHalfImages, setSecondHalfImages] = useState([]);

    // console.log("start: " + firstHalfImages.length);

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setFilePath(e.target.files[0]);

    }

    const handleLogOut = () => {
        navigate("/")
    }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const formData = new FormData();
                formData.append("username", username);

                // console.log("username receive: " + username);

                const response = await fetch("http://localhost:8090/api/v1/picture/home", {
                    method: "POST",
                    body: formData,
                });
                const result = await response.json();
                // console.log("list image: ", result);
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                setImages(result);
                if (result.length >= 2) {
  
                    const halfIndex = Math.ceil(result.length / 2);
                    setFirstHalfImages(result.slice(0, halfIndex));
                    setSecondHalfImages(result.slice(halfIndex));
                    console.log("list image: ", firstHalfImages);
                }
                if (result.length === 1) {
                    setFirstHalfImages(result);
                }
                
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("image", filePath);
            formData.append("username", username);

            console.log("username receive: " + username);

            const response = await fetch("http://localhost:8090/api/v1/picture/upload", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            setResultMessage({ type: "success", message: result });
            console.log(result);
            setFile("https://drive.google.com/thumbnail?id=" + result.url + "&sz=w1500");
        } catch (error) {
            console.error("Error uploading image:", error.message);
            setResultMessage({ type: "error", message: error.message });
        }
        setTimeout(() => setResultMessage(null), 5000);
    };


    return (
        <div className="w3-black">
            <nav className="w3-sidebar w3-bar-block w3-small w3-hide-small w3-center">
                <img src="/img.png" style={{ width: "100%" }} alt="view" />
                <a href="#" className="w3-bar-item w3-button w3-padding-large w3-black">
                    <i className="fa fa-home w3-xxlarge"></i>
                    <p>HOME</p>
                </a>
                <a href="#photos" className="w3-bar-item w3-button w3-padding-large w3-hover-black">
                    <i className="fa fa-eye w3-xxlarge"></i>
                    <p>PHOTOS</p>
                </a>
                <a onClick={handleLogOut} className="w3-bar-item w3-button w3-padding-large w3-hover-black">
                    <i className="fa fa-sign-out w3-xxlarge"></i>
                    <p>LOG OUT</p>
                </a>
            </nav>
            <div className="w3-top w3-hide-large w3-hide-medium" id="myNavbar">
                <div className="w3-bar w3-black w3-opacity w3-hover-opacity-off w3-center w3-small">
                    {/*<a href="#" className="w3-bar-item w3-button" style="width:25% !important">HOME</a>*/}
                    {/*<a href="#about" className="w3-bar-item w3-button" style="width:25% !important">ABOUT</a>*/}
                    {/*<a href="#photos" className="w3-bar-item w3-button" style="width:25% !important">PHOTOS</a>*/}
                    {/*<a href="#contact" className="w3-bar-item w3-button" style="width:25% !important">CONTACT</a>*/}
                </div>
            </div>
            <div className="w3-padding-large" id="main">
                <header className="w3-container w3-padding-32 w3-center w3-black" id="home">
                    <h1 className="w3-jumbo"><span className="w3-hide-small">I am</span> HNQ.</h1>

                    {resultMessage && (
                        <div>
                            <PacmanLoader color="#ffffff" />
                            {resultMessage.message.status === 200
                                ? `Success: ${resultMessage.message.message}`
                                : `Error: ${resultMessage.message.message}`}
                        </div>
                    )}
                    <p>Choose a photo you want to convert to black and white.</p>
                    <input type="file" accept="image/*" onChange={handleChange} className="w3-image" />
                    <button onClick={handleUpload} disabled={!file}>Upload</button>
                    <img src={file} className="w3-image" />

                </header>
                <div className="w3-padding-64 w3-content" id="photos">
                    <h2 className="w3-text-light-grey">My Photos</h2>
                    <hr style={{ width: "200px" }} className="w3-opacity"></hr>
                    <div className="w3-row-padding" style={{ margin: "0 -16px" }}>

                        <div className="w3-half">
                            {/*    <*/}
                            {/*    %*/}
                            {/*    int chia2 = list.size() / 2;*/}
                            {/*    for (int i = 0; i < chia2; i++) {*/}
                            {/*    %>*/}
                            {/* <img src="/chef.jpg" style={{ width: "100%" }}></img>
                            <img src="/man_smoke.jpg" style={{ width: "100%" }}></img> */}
                            {firstHalfImages.length === 0 ? (
                                <p>Loading...</p>
                            ) : (
                                <img src={"https://drive.google.com/thumbnail?id=" + firstHalfImages[0].path + "&sz=w1500"} style={{ width: "100%" }}></img>
                            )}
                            {/*<%*/}
                            {/*}*/}
                            {/*    %>*/}
                        </div>

                        <div className="w3-half">
                            {/*    <*/}
                            {/*    %*/}
                            {/*    for (int i = chia2; i < list.size(); i++) {*/}
                            {/*    %>*/}
                            {/*    <img src="uploads/uploaded/<%=list.get(i).getName()%>" style="width:100%">*/}
                            {/*    <%*/}
                            {/*}*/}
                            {/*    %>*/}
                            {secondHalfImages.length == 0 ? (
                                <p>Loading...</p>
                            ) : (
                                <img src="/underwater.jpg" style={{ width: "100%" }}></img>
                            )}
                            
                            {/* <img src="/wedding.jpg" style={{ width: "100%" }}></img> */}
                        </div>
                    </div>
                </div>
            </div>

            <footer className="w3-content w3-padding-64 w3-text-grey w3-xlarge">
                <i className="fa fa-facebook-official w3-hover-opacity"></i>
                <i className="fa fa-instagram w3-hover-opacity"></i>
                <i className="fa fa-snapchat w3-hover-opacity"></i>
                <i className="fa fa-pinterest-p w3-hover-opacity"></i>
                <i className="fa fa-twitter w3-hover-opacity"></i>
                <i className="fa fa-linkedin w3-hover-opacity"></i>
                <p className="w3-medium">Powered by <a href="https://www.w3schools.com/w3css/default.asp"
                    target="_blank"
                    className="w3-hover-text-green">w3.css</a></p>
            </footer>
        </div>
    );
}

export default Home;