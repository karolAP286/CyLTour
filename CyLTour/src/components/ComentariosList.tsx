import { useEffect, useState } from "react";
import { Card, Rate, Spin, Empty, Input, Button, Form, message } from "antd";
import { Comentario } from "../types/Comentario";
import {
    createComentario,
    createRespuesta,
    getComentariosPorMonumento,
} from "../services/apiService";
import { motion } from "framer-motion";
import { Respuesta } from "../types/Respuesta";

const { Meta } = Card;
const { TextArea } = Input;

type ComentariosListProps = {
    id: string;
};

const ComentariosList: React.FC<ComentariosListProps> = ({ id }) => {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [comentarioForm] = Form.useForm();
    const [respuestaForm] = Form.useForm();
    const [respondiendoA, setRespondiendoA] = useState<number | null>(null);
    const [respuestasVisibles, setRespuestasVisibles] = useState<{
        [comentarioId: number]: boolean;
    }>({});

    const usuarioId = parseInt(localStorage.getItem("usuario_id") || "0");

    const fetchComentarios = async () => {
        try {
            const data = await getComentariosPorMonumento(id);
            setComentarios(data);
        } catch (error) {
            console.error("Error fetching comentarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComentarios();
    }, []);

    const onFinishComentario = async (values: any) => {
        try {
            await createComentario({
                ...values,
                usuario_id: usuarioId,
                monumento_id: parseInt(id),
            });
            message.success("Comentario enviado");
            comentarioForm.resetFields();
            fetchComentarios();
        } catch (err) {
            message.error("Error al enviar comentario");
        }
    };

    const onFinishRespuesta = async (values: any) => {
        if (!usuarioId) {
            message.warning("Debes estar autenticado para responder.");
            return;
        }
        try {
            await createRespuesta({
                contenido: values.respuesta,
                comentario_id: respondiendoA!,
                usuario_id: usuarioId,
            });
            message.success("Respuesta enviada");
            respuestaForm.resetFields();
            setRespondiendoA(null);
            fetchComentarios();
        } catch (err) {
            message.error("Error al enviar respuesta");
        }
    };

    const toggleRespuestas = (comentarioId: number) => {
        setRespuestasVisibles((prev) => ({
            ...prev,
            [comentarioId]: !prev[comentarioId],
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4">
            <Form
                form={comentarioForm}
                onFinish={onFinishComentario}
                layout="vertical"
            >
                <Form.Item
                    name="contenido"
                    label="Deja un comentario"
                    rules={[{ required: true }]}
                >
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                    name="puntuacion"
                    label="Puntuación"
                    rules={[{ required: true }]}
                >
                    <Rate />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Enviar comentario
                </Button>
            </Form>
            <br></br>

            {comentarios.length === 0 ? (
                <Empty description="No hay comentarios disponibles" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {comentarios.map((comentario) => (
                        <motion.div
                            key={comentario.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card
                                hoverable
                                className="rounded-2xl shadow-md"
                                cover={
                                    comentario.url_imagen && (
                                        <img
                                            alt="Imagen del comentario"
                                            src={comentario.url_imagen}
                                            className="object-cover h-48 w-full"
                                        />
                                    )
                                }
                            >
                                <Meta
                                    title={
                                        <div className="flex items-center justify-between">
                                            <span>
                                                {comentario.usuario?.nombre ??
                                                    "Usuario"}
                                            </span>
                                            <Rate
                                                disabled
                                                value={comentario.puntuacion}
                                            />
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <p>{comentario.contenido}</p>
                                            <div className="flex gap-2 mt-2">
                                                <Button
                                                    size="small"
                                                    type="link"
                                                    onClick={() =>
                                                        toggleRespuestas(
                                                            comentario.id
                                                        )
                                                    }
                                                >
                                                    {respuestasVisibles[
                                                        comentario.id
                                                    ]
                                                        ? "Ocultar respuestas"
                                                        : "Ver respuestas"}
                                                </Button>
                                                <Button
                                                    size="small"
                                                    type="link"
                                                    onClick={() =>
                                                        setRespondiendoA(
                                                            comentario.id
                                                        )
                                                    }
                                                >
                                                    Responder
                                                </Button>
                                            </div>

                                            {respuestasVisibles[
                                                comentario.id
                                            ] &&
                                                comentario.respuestas?.map(
                                                    (r: Respuesta) => (
                                                        <div
                                                            key={r.created_at}
                                                            className="mt-2 ml-4 p-2 bg-gray-100 rounded"
                                                        >
                                                            <b>
                                                                {r.usuario
                                                                    ?.nombre ??
                                                                    "Usuario"}
                                                                :
                                                            </b>{" "}
                                                            {r.contenido}
                                                        </div>
                                                    )
                                                )}

                                            {respondiendoA ===
                                                comentario.id && (
                                                <Form
                                                    form={respuestaForm}
                                                    onFinish={onFinishRespuesta}
                                                    layout="vertical"
                                                >
                                                    <Form.Item
                                                        name="respuesta"
                                                        rules={[
                                                            { required: true },
                                                        ]}
                                                    >
                                                        <TextArea
                                                            rows={2}
                                                            placeholder="Escribe tu respuesta"
                                                        />
                                                    </Form.Item>
                                                    <Button
                                                        htmlType="submit"
                                                        type="primary"
                                                        size="small"
                                                    >
                                                        Enviar respuesta
                                                    </Button>
                                                </Form>
                                            )}
                                        </div>
                                    }
                                />
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComentariosList;
