export function Counter(coll) {
    constructor()
    {
        return getCountedSorted(getCounted(coll))
    }

    function getCounted(coll) {
        let counter = {}
        for (let i = 0; i < coll.length; i++) {
            if (typeof counter[coll[i]] === "undefined") {
                counter[coll[i]] = 1
            } else {
                counter[coll[i]]++
            }
        }

        return counter
    }

    function getCountedSorted(obj) {
        let keys = Object.keys(obj);
        let items = keys.map(function (key) {
            return [key, obj[key]];
        });
        items.sort(function (first, second) {
            return first[1] - second[1]; // "return first[1] - second[1]" will make it descending
        });
        let countedSorted = {}
        for (let i = 0; i < items.length; i++) {
            countedSorted[items[i][0]] = items[i][1]
        }

        return countedSorted
    }
}