import React from "react";

type MapaEmbedProps = {
    lat: number;
    lon: number;
    zoom?: number;
};

const MapaEmbed: React.FC<MapaEmbedProps> = ({ lat, lon }) => {
    const delta = 0.01;
    const bbox = `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${
        lat + delta
    }`;
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;

    return (
        <div style={{ width: "100%", height: "400px", marginTop: "1rem" }}>
            <iframe
                title="Ubicación del Monumento"
                width="100%"
                height="100%"
                src={src}
                style={{ border: 0 }}
            />
        </div>
    );
};

export default MapaEmbed;
