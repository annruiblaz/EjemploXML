//Igual que en app.js pero leyendo los datos en local.

const fs = require('fs');
const xml2js = require('xml2js');

function cargaDocXML() {
    let txt = '';

    //Leemos el archivo xml d forma asincrona dsd el file system
    fs.readFile('cd_catalog.xml', 'utf8', (err, data) => {
        if(err) {
            console.error('Error al leer el archivo XML: ', err);
            return;
        }

        //Creamos un parser de XML
        const parser = new xml2js.Parser();

        parser.parseString(data, (err, result) => {
            if (err) {
                console.error('Error al parsear el XML: ', err);
                return;
            }

            //Accedemos a la lista d artistas q esta bajo <CATALOG><CD><ARTIST>
            const artistas = result.CATALOG.CD.map(cd => cd.ARTIST[0]);

            artistas.forEach(artista => {
                txt += artista + '\n'; //Construimos el texto con el nombre d cada artista
            });

            console.log('Resultados artistas: ', txt);
        });
    });
}

cargaDocXML();