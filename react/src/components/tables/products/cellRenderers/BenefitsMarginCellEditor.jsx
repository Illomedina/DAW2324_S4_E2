export const BenefitsMarginCellEditor = (props) => {
    const token = localStorage.getItem('token');
    const { value, context, data } = props;
    const [inputValue, setInputValue] = useState(value.replace(' %', ''));

    const handleBlur = async () => {
        // Convertir el valor del input a un número flotante
        const newValue = parseFloat(inputValue);
        // Verificar si el valor ha cambiado y es un número válido
        if (!isNaN(newValue) && newValue !== value) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/` + data.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ benefits_margin: newValue }),
                });

                if (!response.ok) {
                    throw new Error('Error al actualizar el margen de beneficio');
                }
                console.log('Margen de beneficio actualizado con éxito', await response.json());
            } catch (error) {
                console.error('Error al actualizar el margen de beneficio', error);
                // Restaurar el valor anterior si la actualización falla
                setInputValue(value.replace(' %', ''));
            }
        }
    };

    return (
        <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            disabled={!context.isEditable}
            style={{ width: "100%" }}
        />
    );
};
