const axios = require('axios');
const xml2js = require('xml2js'); //Para parsear el código html

function cargaDocXML() {
    let txt = '';

    //Hacemos una solicitud http para obtener el archivo xml
    axios.get('http://localhost/ajax/cd_catalog.xml')
        .then(response => {
            //Una vez obtenemos la respuesta la parseamos como xml
            const parser = new xml2js.Parser();

            parser.parseString(response.data, function (err, result) {
                if (err) {
                    console.error('Error al parsear el XML: ', err);
                    return;
                }

                //El xml parseado ahora esta en el obj result
                //Accedemos a la lista d artistas q esta bajo <CATALOG><CD><ARTIST>
                const artistas = result.CATALOG.CD.map(cd => cd.ARTIST[0]);

                artistas.forEach(artista => {
                    txt += artista + '\n'; //Construimos el texto con el nombre d cada artista
                });

                console.log('Resultados artistas: ', txt);
            });
        }).catch( err => {
            console.error('Error al hacer la solicitud http: ', err);
        });
}

cargaDocXML();