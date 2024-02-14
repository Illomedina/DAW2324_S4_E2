export const ProductIsActiveCellRenderer = props => {
    const { value, context, data } = props;

    const handleChange = async (e) => {
        const checked = e.target.checked;
        try {
            const response = await fetch('http://localhost:8000/api/products/' + data.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ is_active: checked }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            console.log('Producto actualizado con éxito', await response.json());
        } catch (error) {
            console.error('Error al actualizar el producto', error);
        }
    };

    return (
        <input
            type="checkbox"
            checked={value}
            onChange={handleChange}
            disabled={!context.isEditable}
        />
    );
};