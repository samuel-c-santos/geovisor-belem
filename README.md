<h1 align="center">🗺️ Visualizador Interativo de Mapas com Leaflet</h1>

<p align="center">
  <strong>Aplicação web leve e responsiva para visualização de camadas geográficas em Belém/PA</strong><br>
  Desenvolvido por <a href="https://www.linkedin.com/in/samuelsantos-amb/" target="_blank">Samuel Santos</a>
</p>

<p align="center">
  <a href="https://samuel-c-santos.github.io/app_mapas/" target="_blank">
    <img src="https://img.shields.io/badge/demo-online-green?style=for-the-badge" alt="Ver demonstração">
  </a>
  <a href="https://samuel-c-santos.github.io/" target="_blank">
    <img src="https://img.shields.io/badge/portf%C3%B3lio-samuel--c--santos-blue?style=for-the-badge" alt="Portfólio Samuel">
  </a>
</p>

---

## 🔎 Sobre o projeto

Este projeto consiste em uma aplicação web baseada em [Leaflet.js](https://leafletjs.com/) que permite:

- Visualizar camadas GeoJSON de bairros e logradouros de Belém/PA.
- Pesquisar endereços usando a API do OpenStreetMap (Nominatim).
- Fazer upload de arquivos `.geojson` para visualização temporária.
- Baixar os dados visíveis no mapa como GeoJSON.
- Alternar a exibição de camadas com controle interativo.

---

## 🚀 Funcionalidades

<ul>
  <li>🔍 <strong>Busca por endereço</strong> com geocodificação (via Nominatim)</li>
  <li>📚 <strong>Camadas GeoJSON</strong> de bairros (ativa por padrão) e logradouros (desativada)</li>
  <li>🧭 <strong>Controle de camadas</strong> com ativação/desativação dinâmica</li>
  <li>📂 <strong>Upload local</strong> de GeoJSON para visualização no navegador</li>
  <li>⬇️ <strong>Exportação</strong> dos dados visíveis para arquivo GeoJSON</li>
  <li>📱 <strong>Design responsivo</strong> para uso em dispositivos móveis</li>
</ul>

---

## 🧱 Estrutura do projeto

```plaintext
app_mapas/
├── index.html         # Interface principal com campos e mapa
├── style.css          # Estilos personalizados
├── script.js          # Lógica JS: camadas, busca, upload, download
├── data/
│   ├── bairros.geojson
│   └── logradouros.geojson
````

---

## 🧪 Executando localmente

Você pode usar o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code:

```bash
# Ou abra o index.html com Live Server
```

Ou acesse diretamente a versão hospedada:

➡️ <a href="https://samuel-c-santos.github.io/app_mapas/" target="_blank"><strong>samuel-c-santos.github.io/app\_mapas</strong></a>

---

## 👤 Autor

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/samuelsantos-amb/">
        <img src="https://avatars.githubusercontent.com/u/10778356?v=4" width="100px;" alt="Samuel Santos"/>
        <br/>
        <sub><b>Samuel Santos</b></sub>
      </a>
    </td>
  </tr>
</table>

Engenheiro Florestal, Coordenador de Geotecnologias no IDEFLOR-Bio, especialista em geoprocessamento, ciência de dados ambientais e automações em Python, R e Google Earth Engine.

🌐 Portfólio: [samuel-c-santos.github.io](https://samuel-c-santos.github.io/)

📫 Contato: [LinkedIn](https://www.linkedin.com/in/samuelsantos-amb/)

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT.