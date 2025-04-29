import { useEffect, useState } from 'react';
import { Card, Rate, Spin, Empty } from 'antd';
import { Comentario } from '../types/Comentario';
import { getComentarios } from '../services/apiService';
import { motion } from 'framer-motion';

const { Meta } = Card;

const ComentariosList = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const data = await getComentarios();
        setComentarios(data);
      } catch (error) {
        console.error('Error fetching comentarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComentarios();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;
  }

  if (comentarios.length === 0) {
    return <Empty description="No hay comentarios disponibles" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
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
              comentario.url_imagen ? (
                <img
                  alt="Imagen del comentario"
                  src={comentario.url_imagen}
                  className="object-cover h-48 w-full"
                />
              ) : undefined
            }
          >
            <Meta
              title={
                <div className="flex items-center justify-between">
                  <span>{comentario.usuario?.nombre ?? 'Usuario desconocido'}</span>
                  <Rate disabled value={comentario.puntuacion} />
                </div>
              }
              description={comentario.contenido}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ComentariosList;
