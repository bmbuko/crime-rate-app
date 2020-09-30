module.exports = function crimeScene() {

    const crimeList = {};




    function setcrimeTypes(type) {
        if (crimeList[type] === undefined) {
            crimeList[type] = 0;
        }
        crimeList[type]++

    }

    function counter() {
        return Object.keys(crimeList).length;
    }

    function getcrimeNames() {
        return crimeList
    }

    function crime(type) {
        if (type === "") {
            return "This is not appropriate crime"

        } else if (type === "Rape") {
            return "Rape"
            
        } else if (type === "Human traficking") {
            return "Human traficking"
        }

    }
    return {
        crime,
        setcrimeTypes,
        getcrimeNames,
        counter
    }
}

