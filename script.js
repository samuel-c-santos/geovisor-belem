document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('mapid').setView([-1.4558, -48.5039], 13); // Belém, PA

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    let bairrosLayer, logradourosLayer, uploadLayer;

    // ======= Logradouros (inicialmente oculto) =======
    fetch('data/logradouros.geojson')
        .then(res => res.json())
        .then(data => {
            logradourosLayer = L.geoJson(data, {
                style: {
                    color: "#FF5733",
                    weight: 1.5,  // mais leve visualmente
                    opacity: 0.7
                },
                onEachFeature: (feature, layer) => {
                    let popup = '';
                    if (feature.properties?.nome) popup += `<b>Logradouro:</b> ${feature.properties.nome}<br>`;
                    if (feature.properties?.tipo) popup += `<b>Tipo:</b> ${feature.properties.tipo}<br>`;
                    if (popup) layer.bindPopup(popup);

                    layer.on({
                        mouseover: e => e.target.setStyle({ weight: 3, color: '#3388ff' }),
                        mouseout: e => logradourosLayer.resetStyle(e.target)
                    });
                }
            }); // ainda não adiciona ao mapa
        });

    // ======= Controle de camadas =======
    const overlayLayers = {};
    const layerControl = L.control.layers(null, overlayLayers).addTo(map);

    // camada bairros entra automaticamente no mapa
    fetch('data/bairros.geojson')
        .then(res => res.json())
        .then(data => {
            bairrosLayer = L.geoJson(data, {
                style: {
                    color: "#007bff",
                    weight: 2,
                    fillColor: "#007bff",
                    fillOpacity: 0.2
                },
                onEachFeature: (feature, layer) => {
                    let popup = "<b>Informações do Bairro</b><br>";
                    for (const [key, value] of Object.entries(feature.properties)) {
                        popup += `<b>${key}:</b> ${value}<br>`;
                    }
                    layer.bindPopup(popup);

                    layer.on({
                        mouseover: e => e.target.setStyle({ weight: 3, fillOpacity: 0.5 }),
                        mouseout: e => bairrosLayer.resetStyle(e.target),
                        click: function (e) {
                            map.fitBounds(e.target.getBounds());
                            this.openPopup();
                        }
                    });
                    layer.on({
                        mouseover: e => e.target.setStyle({ weight: 3, fillOpacity: 0.5 }),
                        mouseout: e => bairrosLayer.resetStyle(e.target),
                        click: function (e) {
                            map.fitBounds(e.target.getBounds());
                            this.openPopup();
                        }
                    });
                }
            }).addTo(map);

            layerControl.addOverlay(bairrosLayer, "Bairros");
        });

    // logradouros começa desativado
    fetch('data/logradouros.geojson')
        .then(res => res.json())
        .then(data => {
            logradourosLayer = L.geoJson(data, {
                style: {
                    color: "#FF5733",
                    weight: 1.5,
                    opacity: 0.7
                },
                onEachFeature: (feature, layer) => {
                    let popup = "<b>Informações do Logradouro</b><br>";
                    for (const [key, value] of Object.entries(feature.properties)) {
                        popup += `<b>${key}:</b> ${value}<br>`;
                    }
                    layer.bindPopup(popup);

                    layer.on({
                        mouseover: e => e.target.setStyle({ weight: 3, color: '#3388ff' }),
                        mouseout: e => logradourosLayer.resetStyle(e.target),
                        click: function () {
                            this.openPopup();
                        }
                    });
                }
            }); // não adiciona ainda

            layerControl.addOverlay(logradourosLayer, "Logradouros");
        });

    // ======= Pesquisa por endereço (Nominatim) =======
    const addressInput = document.getElementById('address-input');
    const searchButton = document.getElementById('search-button');
    let searchMarker = null;

    function performSearch() {
        const address = addressInput.value.trim();
        if (!address) return alert("Digite um endereço.");

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1&countrycodes=br`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (!data.length) return alert("Endereço não encontrado.");
                const { lat, lon, display_name } = data[0];

                if (searchMarker) map.removeLayer(searchMarker);
                searchMarker = L.marker([lat, lon]).addTo(map)
                    .bindPopup(`<b>Endereço:</b><br>${display_name}`).openPopup();
                map.setView([lat, lon], 16);
            })
            .catch(() => alert("Erro na busca de endereço."));
    }

    searchButton.addEventListener('click', performSearch);
    addressInput.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });

    // ======= Upload de GeoJSON =======
    const uploadInput = document.getElementById('upload-geojson');
    uploadInput.addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            const data = JSON.parse(e.target.result);
            if (uploadLayer) map.removeLayer(uploadLayer);
            uploadLayer = L.geoJson(data, {
                style: { color: "#28a745", weight: 2, fillOpacity: 0.3 }
            }).addTo(map);
            map.fitBounds(uploadLayer.getBounds());

            layerControl.addOverlay(uploadLayer, "Camada enviada");
        };
        reader.readAsText(file);
    });

    // ======= Download de dados do mapa =======
    document.getElementById('download-button').addEventListener('click', function () {
        const allLayers = [bairrosLayer, logradourosLayer, uploadLayer];
        const features = [];

        allLayers.forEach(layerGroup => {
            if (!layerGroup || !map.hasLayer(layerGroup)) return;
            layerGroup.eachLayer(layer => {
                if (layer.feature) features.push(layer.feature);
            });
        });

        if (!features.length) return alert("Nenhuma camada visível para exportar.");

        const geojson = {
            type: "FeatureCollection",
            features: features
        };

        const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = "dados_visiveis.geojson";
        a.click();
        URL.revokeObjectURL(url);
    });

});
