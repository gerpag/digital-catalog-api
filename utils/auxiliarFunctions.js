 function intervaloDeFechas(fechaInicial, fechaFinal) {
    // Parsea las cadenas de fecha a objetos Date
    const fechaInicialObj = new Date(fechaInicial);
    const fechaFinalObj = new Date(fechaFinal);

    // Crea un array para almacenar las fechas intermedias
    const fechasIntermedias = [];

    // Itera sobre las fechas intermedias y las agrega al array
    for (let fecha = fechaInicialObj; fecha <= fechaFinalObj; fecha.setDate(fecha.getDate() + 1)) {
        fechasIntermedias.push(new Date(fecha).toISOString().split('T')[0]);
    }

    return fechasIntermedias;
}

module.exports={intervaloDeFechas}