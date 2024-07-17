const Recents = require('../models/recents.schema');

const polygonSurabaya = [
    [113.46372, -8.57821],
    [114.11191, -6.33431],
    [112.16184, -6.30702],
    [112.42002, -7.31062],
    [112.81003, -8.58364]
];

const polygonSemarang = [
    [111.02609, -5.93530],
    [109.79145, -5.87682],
    [109.66700, -7.06954],
    [110.33720, -7.09898],
    [110.82967, -6.97055]
];

const polygonBatam = [
    [104.66073, 2.52012],
    [103.05265, 1.41766],
    [103.59645, 0.67978],
    [104.47429, 0.64094],
    [105.35213, 1.41766]
]

const getSurabaya = async (req, res) => {
    try {
        const dataSurabaya = await Recents.find({
            location: {
                $geoWithin: {
                    $polygon: polygonSurabaya
                }
            }
        });
        res.status(200).json(dataSurabaya);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const getSemarang = async (req, res) => {
    try {
        const dataSemarang = await Recents.find({
            location: {
                $geoWithin: {
                    $polygon: polygonSemarang
                }
            }
        });
        res.status(200).json(dataSemarang);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const getBatam = async (req, res) => {
    try {
        const dataBatam = await Recents.find({
            location: {
                $geoWithin: {
                    $polygon: polygonBatam
                }
            }
        });
        res.status(200).json(dataBatam);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = { getSurabaya, getSemarang, getBatam };