import { useEffect } from "react";

function RespuestaApi() {
    useEffect(() => {
        fetch("http://127.0.0.1:8000/provincias") 
        .then((response)=>response.json())
        .then((data) => console.log(data))
    }, []);

    return <ul className="respuestaList"></ul>;
}

export default RespuestaApi;
