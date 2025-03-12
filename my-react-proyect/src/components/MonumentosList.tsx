import { useEffect, useState } from "react"

function MonumentosList() {
    const [monumentos, setMonumentos] = useState([]);
    const HTMLmonumentos = monumentos.map((monumento:any) => {
        return (
            <li key={monumento.identificador}>
                <h2>{monumento.nombre}</h2>
                <h3>{monumento.tipomonumento} - {monumento.clasificacion} - {monumento.tipoconstruccion}</h3>
                <div dangerouslySetInnerHTML= {{__html: monumento.descripcion }} />
                <h4>{monumento.poblacion_localidad} - {monumento.poblacion_municipio} - {monumento.poblacion_provincia} - {monumento.codigopostal}</h4>
           </li>
        )
    })
    useEffect(() => {
        fetch("https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/relacion-monumentos/records?limit=100")
        .then((response)=>response.json())
        .then((data) => {
            setMonumentos(data.results);
            console.log(data.results)
        })
    }, []);

    return <ul className="monumentosList">
        {HTMLmonumentos}
    </ul>;
}

export default MonumentosList