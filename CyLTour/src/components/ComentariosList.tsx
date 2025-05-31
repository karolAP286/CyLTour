import { useEffect, useState } from "react";
import {
    Card,
    Rate,
    Spin,
    Empty,
    Input,
    Button,
    Form,
    message,
    Alert,
    Typography,
} from "antd";
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
const { Title } = Typography;

type ComentariosListProps = {
    id: string;
};

const ComentariosList: React.FC<ComentariosListProps> = ({ id }) => {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [comentarioForm] = Form.useForm();
    const [respuestaForm] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [respondiendoA, setRespondiendoA] = useState<number | null>(null);
    const [respuestasVisibles, setRespuestasVisibles] = useState<{
        [comentarioId: number]: boolean;
    }>({});
    const decodedUser = atob(localStorage.getItem("user_id") || "0");
    const usuarioId = parseInt(decodedUser);

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
        if (!usuarioId) {
            setErrorMessage("Debes estar autenticado para comentar.");
            return;
        }
        const dataToSend = {
            ...values,
            usuario_id: usuarioId,
            monumento_id: parseInt(id),
            url_imagen: null,
        };
        try {
            await createComentario(dataToSend);
            setSuccessMessage("Comentario enviado, esperando aprobación");
            comentarioForm.resetFields();
            fetchComentarios();
        } catch (err) {
            setErrorMessage("Error al enviar comentario");
        }
    };

    const onFinishRespuesta = async (values: any) => {
        if (!usuarioId) {
            setErrorMessage("Debes estar autenticado para responder.");
            return;
        }
        try {
            await createRespuesta({
                contenido: values.respuesta,
                comentario_id: respondiendoA!,
                usuario_id: usuarioId,
            });
            setSuccessMessage("Respuesta enviada");
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
            {errorMessage && (
                <Alert
                    message={errorMessage}
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}
            {successMessage && (
                <Alert
                    message={successMessage}
                    type="success"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}
            {comentarios.length === 0 ? (
                <Empty description="No hay comentarios disponibles" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Title level={5}>Comentarios:</Title>
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
                                                style={{ marginLeft: "10px" }}
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
                                                            (prev) =>
                                                                prev ===
                                                                comentario.id
                                                                    ? null
                                                                    : comentario.id
                                                        )
                                                    }
                                                >
                                                    {respondiendoA ===
                                                    comentario.id
                                                        ? "Cancelar"
                                                        : "Responder"}
                                                </Button>
                                            </div>

                                            {respuestasVisibles[
                                                comentario.id
                                            ] &&
                                                comentario.respuestas?.map(
                                                    (r: Respuesta) => (
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    "8px",
                                                            }}
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
                                                    style={{ marginTop: "8px" }}
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
            <Form
                style={{ marginTop: "24px" }}
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
        </div>
    );
};

export default ComentariosList;
