import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";

const { Meta } = Card;

const CardStyle: React.CSSProperties = {
    width: "100%",
    minWidth: 300,
    maxWidth: 400,
};

interface provinciasProps {
    title: string;
}

const CardsProvinciaComponent: React.FC<provinciasProps> = (props: provinciasProps) => {
    const { title } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/provincia/${encodeURIComponent(title)}`);
    };

    return (
        <>
            <Card
                hoverable
                onClick={handleClick}
                style={CardStyle}
                cover={
                    <img
                        alt="example"
                        src={"../img/" + title + ".jpg"}
                        height={200}
                    />
                }
            >
                <Meta title={title} description="Lugares de interes" />
            </Card>
        </>
    );
};

export default CardsProvinciaComponent;
