const enviarRegistro = async () => {
  const formulario = document.getElementById('formProductos');
  const formData = new FormData(formulario);

  try {
    const response = await axios.post('/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 201) {
      console.log('Registro exitoso');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};