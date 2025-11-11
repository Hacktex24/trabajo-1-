document.addEventListener('DOMContentLoaded', function() {
    // Gráfica de Impacto (Sección 1)
    const ctx = document.getElementById('impactoChart').getContext('2d');
    
    // <<<<<< ESTAS SON LAS LÍNEAS QUE DEBES AJUSTAR >>>>
    const totalBloqueado = 39870; 
    const retrabajoRealizado = 20050;
    const retrabajoNoAceptado = 2160;
    const returnMNSP = 6460;
    const pendienteBloqueado = 11200;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                // Etiqueta con valor exacto y emoji para claridad ejecutiva
                '✅ Retrabajo realizado (' + retrabajoRealizado.toFixed(2) + ' t)', 
                '⛔ Retrabajo NO aceptado (' + retrabajoNoAceptado.toFixed(2) + ' t)', 
                '🔄 Return MNSP (' + returnMNSP.toFixed(2) + ' t)', 
                '⏳ Pendiente / Bloqueado (' + pendienteBloqueado.toFixed(2) + ' t)'
            ],
            datasets: [{
                data: [retrabajoRealizado, retrabajoNoAceptado, returnMNSP, pendienteBloqueado],
                // Colores: Verde (OK/Retrabajo), Rojo (No Aceptado), Azul (Return), Naranja (Pendiente/Bloqueado)
                backgroundColor: ['#008000', '#cc0000', '#004d99', '#ffaa00'], 
                hoverBackgroundColor: ['#006600', '#aa0000', '#003366', '#ff9900']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Material Bloqueado Total: ' + totalBloqueado.toFixed(2) + ' toneladas',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.raw;
                            let percentage = ((value / totalBloqueado) * 100).toFixed(1);

                            // Limpia la etiqueta para mostrar solo el nombre
                            if (label) {
                                label = label.substring(0, label.indexOf('(')).trim() + ': '; 
                            }
                            // Formato con 2 decimales y el símbolo 't'
                            label += value.toFixed(2) + ' t (' + percentage + '%)';
                            return label;
                        }
                    }
                }
            }
        }
    });
});