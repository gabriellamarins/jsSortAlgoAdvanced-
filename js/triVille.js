let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);

        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(ville) {

    let lat1 = ville.latitude;
    let lon1 = ville.longitude;

    let lat2 = 45.166667;
    let lon2 = 5.716667;
    //
    // let y = lat2 - lat1;
    // let x = lon2 - lon1;
    //
    // return (x * x + y * y)


    const R = 6371e3; // metres
    const la = lat1 * Math.PI/180; // φ, λ in radians
    const la2 = lat2 * Math.PI/180;
    const cont_lat = (lat2-lat1) * Math.PI/180;
    const cont_long = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(cont_lat/2) * Math.sin(cont_lat/2) +
        Math.cos(la) * Math.cos(la2) *
        Math.sin(cont_long/2) * Math.sin(cont_long/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

    console.log('implement me !');
    return d;
}

/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(i, j) {
if (i.distanceFromGrenoble < j.distanceFromGrenoble) {
    return true;
     }

}
console.log('implement me !');
/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i 
 * @param {*} j 
 */
function swap(i, j) {
    // const temp = i;
    //
    // i = j;
    // j = temp;

    [listVille[i], listVille[j]] = [listVille[j], listVille[i]];
  //  nbPermutation ++;

    console.log('implement me !');
}
//
function sort(type) {
    switch (type) {
        case 'insert':
            insertsort(listVille);
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
    }
}

function insertsort(listVille) {
    for (let i = 1; i < listVille.length; i++) {
        let current = listVille[i];
        let j;

        for (j= i -1; j >= 0 && listVille[j] > current; j--) {
            listVille[j+1] = listVille[j]
        }
        listVille[j + 1] = current
    }
    return listVille;



    // for (let i =1; i < listVille.length; i ++) {
    //     let j = i -1
    //     let temp = listVille[i]
    //
    //     while(j >= 0 && listVille[j] > temp) {
    //         listVille[j +1] = listVille[j]
    //         j--
    //     }
    //     listVille[j+1] = temp
    // }
    // return listVille

}
console.log("insertsort - implement me !");




function selectionsort() {
    console.log("selectionsort - implement me !");
}

function bubblesort() {
    console.log("bubblesort - implement me !");
}

function shellsort() {
    console.log("shellsort - implement me !");
}

function mergesort() {
    console.log("mergesort - implement me !");
}


function heapsort() {
    console.log("heapsort - implement me !");
}

function quicksort() {
    console.log("quicksort - implement me !");
}

/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}


