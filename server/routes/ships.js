import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

const mockShips = {
  'MAERSK ALABAMA': {
    name: 'MAERSK ALABAMA',
    imo: '9164263',
    mmsi: '366982000',
    callSign: 'WMDH',
    flag: 'United States',
    vesselType: 'Container Ship',
    grossTonnage: 14120,
    deadweight: 16700,
    length: 155,
    beam: 25,
    yearBuilt: 1998,
    status: 'Active',
    lastPort: 'Mombasa, Kenya',
    destination: 'Djibouti',
    eta: '2023-11-20T08:30:00Z',
    owner: 'Maersk Line Ltd.',
    manager: 'Maersk Line Ltd.',
    classification: 'American Bureau of Shipping',
    insurers: ['UK P&I Club', 'Swedish Club']
  },
  'EVER GIVEN': {
    name: 'EVER GIVEN',
    imo: '9811000',
    mmsi: '353136000',
    callSign: '3EYY7',
    flag: 'Panama',
    vesselType: 'Container Ship',
    grossTonnage: 220940,
    deadweight: 199629,
    length: 400,
    beam: 59,
    yearBuilt: 2018,
    status: 'Active',
    lastPort: 'Yantian, China',
    destination: 'Rotterdam, Netherlands',
    eta: '2023-11-28T16:00:00Z',
    owner: 'Shoei Kisen Kaisha',
    manager: 'Evergreen Marine Corp',
    classification: 'American Bureau of Shipping',
    insurers: ['UK P&I Club']
  },
  'QUEEN MARY 2': {
    name: 'QUEEN MARY 2',
    imo: '9241061',
    mmsi: '310627000',
    callSign: 'ZCEF6',
    flag: 'Bermuda',
    vesselType: 'Passenger Ship',
    grossTonnage: 149215,
    deadweight: 19189,
    length: 345,
    beam: 49,
    yearBuilt: 2003,
    status: 'Active',
    lastPort: 'Southampton, UK',
    destination: 'New York, USA',
    eta: '2023-11-22T07:00:00Z',
    owner: 'Carnival Corporation & plc',
    manager: 'Cunard Line',
    classification: 'Lloyd\'s Register',
    insurers: ['North P&I Club', 'Standard Club']
  }
};

router.get('/:name', auth, (req, res) => {
  try {
    const shipName = req.params.name.toUpperCase();
    
    if (mockShips[shipName]) {
      return res.json(mockShips[shipName]);
    }
    
    const shipData = {
      name: shipName,
      imo: `98${Math.floor(10000 + Math.random() * 90000)}`,
      mmsi: `${Math.floor(200000000 + Math.random() * 799999999)}`,
      callSign: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`,
      flag: ['Panama', 'Liberia', 'Marshall Islands', 'Hong Kong', 'Singapore'][Math.floor(Math.random() * 5)],
      vesselType: ['Container Ship', 'Bulk Carrier', 'Tanker', 'Passenger Ship', 'Cargo Ship'][Math.floor(Math.random() * 5)],
      grossTonnage: Math.floor(10000 + Math.random() * 190000),
      deadweight: Math.floor(10000 + Math.random() * 190000),
      length: Math.floor(100 + Math.random() * 300),
      beam: Math.floor(15 + Math.random() * 45),
      yearBuilt: Math.floor(1990 + Math.random() * 33),
      status: Math.random() > 0.2 ? 'Active' : 'Inactive',
      lastPort: ['Singapore', 'Rotterdam, Netherlands', 'Shanghai, China', 'Busan, South Korea', 'Los Angeles, USA'][Math.floor(Math.random() * 5)],
      destination: ['Singapore', 'Rotterdam, Netherlands', 'Shanghai, China', 'Busan, South Korea', 'Los Angeles, USA'][Math.floor(Math.random() * 5)],
      eta: new Date(Date.now() + Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString(),
      owner: ['Maersk Line', 'MSC', 'CMA CGM', 'COSCO Shipping', 'Hapag-Lloyd'][Math.floor(Math.random() * 5)],
      manager: ['Maersk Line', 'MSC', 'CMA CGM', 'COSCO Shipping', 'Hapag-Lloyd'][Math.floor(Math.random() * 5)],
      classification: ['Lloyd\'s Register', 'DNV GL', 'American Bureau of Shipping', 'Bureau Veritas', 'ClassNK'][Math.floor(Math.random() * 5)],
      insurers: [
        ['UK P&I Club', 'North P&I Club'],
        ['Gard P&I Club', 'Skuld'],
        ['West of England P&I Club', 'Standard Club'],
        ['Japan P&I Club', 'London P&I Club'],
        ['American Club', 'Britannia P&I Club']
      ][Math.floor(Math.random() * 5)]
    };
    
    return res.json(shipData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, (req, res) => {
  try {
    const shipNames = Object.keys(mockShips).map(name => ({
      name,
      type: mockShips[name].vesselType
    }));
    
    res.json(shipNames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;