export const PROTOCOL = 'http://';
export const BASE_URL = 'localhost:8080/';
export const API_VERSION = 'api/v1/';

// API End-points
export const LOGIN = '/user/login/';
export const SIGNUP = '/user/signup/';
export const QUERY1 = 'query1/getData';
export const QUERY2 = 'query2/getData';
export const QUERY3 = 'query3/getData';
export const QUERY4 = 'query4/getData';
export const QUERY5 = 'query5/getData';
export const QUERY6 = 'query6/getData';
export const QUERY7 = 'query7/getData';

// EPA Link
export const EPA_LINK = 'https://epa.gov';

// States
export const STATES = [{
    label: "Alabama",
    value: 1
}, {
    label: "Alaska",
    value: 2
}, {
    label: "Arizona",
    value: 4
}, {
    label: "Arkansas",
    value: 5
}, {
    label: "California",
    value: 6
}, {
    label: "Colorado",
    value: 8
}, {
    label: "Connecticut",
    value: 9
}, {
    label: "Delaware",
    value: 10
}, {
    label: "District Of Columbia",
    value: 11
}, {
    label: "Florida",
    value: 12
}, {
    label: "Georgia",
    value: 13
}, {
    label: "Hawaii",
    value: 15
}, {
    label: "Idaho",
    value: 16
}, {
    label: "Illinois",
    value: 17
}, {
    label: "Indiana",
    value: 18
}, {
    label: "Iowa",
    value: 19
}, {
    label: "Kansas",
    value: 20
}, {
    label: "Kentucky",
    value: 21
}, {
    label: "Louisiana",
    value: 22
}, {
    label: "Maine",
    value: 23
}, {
    label: "Maryland",
    value: 24
}, {
    label: "Massachusetts",
    value: 25
}, {
    label: "Michigan",
    value: 26
}, {
    label: "Minnesota",
    value: 27
}, {
    label: "Mississippi",
    value: 28
}, {
    label: "Missouri",
    value: 29
}, {
    label: "Montana",
    value: 30
}, {
    label: "Nebraska",
    value: 31
}, {
    label: "Nevada",
    value: 32
}, {
    label: "New Hampshire",
    value: 33
}, {
    label: "New Jersey",
    value: 34
}, {
    label: "New Mexico",
    value: 35
}, {
    label: "New York",
    value: 36
}, {
    label: "North Carolina",
    value: 37
}, {
    label: "North Dakota",
    value: 38
}, {
    label: "Ohio",
    value: 39
}, {
    label: "Oklahoma",
    value: 40
}, {
    label: "Oregon",
    value: 41
}, {
    label: "Pennsylvania",
    value: 42
}, {
    label: "Rhode Island",
    value: 44
}, {
    label: "South Carolina",
    value: 45
}, {
    label: "South Dakota",
    value: 46
}, {
    label: "Tennessee",
    value: 47
}, {
    label: "Texas",
    value: 48
}, {
    label: "Utah",
    value: 49
}, {
    label: "Vermont",
    value: 50
}, {
    label: "Virginia",
    value: 51
}, {
    label: "Washington",
    value: 53
}, {
    label: "West Virginia",
    value: 54
}, {
    label: "Wisconsin",
    value: 55
}, {
    label: "Wyoming",
    value: 56
}];

// Graph Titles
export const GRAPH_ID_TITLE_MAP = {
    'graph1': 'Seasonal pollutant trends',
    'graph2': 'Day of the week pollution trends',
    'graph3': 'Hourly Maximum pollution trends',
    'graph4': 'Compare state pollution levels',
    'graph5': 'Recommended AQI levels',
    'graph7': 'Population vs pollution trends'
};

// Graph Descriptions
export const GRAPH_ID_DESC_MAP = {
    'graph1': 'Study how the levels of pollutants has varied over the seasons (Spring, Summer, Fall, Winter) over a given time period.',
    'graph2': 'Study the trend: how average pollutant levels over different days of the week, have changed over the last 5 year period.',
    // add that what are these (wrt sites in the state)
    'graph3': 'Study the trend: which hour of the day, on an avergage, had the highest level of the pollutant over a selected time period',
    'graph4': 'Compare levels of a single pollutant between between multiple (upto 4) states over a given time period.',
    'graph5': 'Study the number of days, in a state, where the AQI level was higher than its recommended safe value.',
    'graph7': 'Study the trend: Has the change in population of a state, resulted in consequent changes in the pollution levels for that state.'
};

export const POLLUTANTS = [{
    label: 'Sulfur Dioxide (SO2)',
    value: 'SO2'
}, {
    label: 'Ozone (O3)',
    value: 'Ozone'
}, {
    label: 'Nitrogen Dioxide (NO2)',
    value: 'NO2'
}, {
    label: 'Carbon Monoxide (CO)',
    value: 'CO'
}]

export const POLLUTANT_COLOR_MAP = {
    'CO': 'red',
    'SO2': 'brown',
    'Ozone': 'blue',
    'NO2': 'orange',
};

export const DAY_COLOR_MAP = {
    'MONDAY': 'red',
    'TUESDAY': 'brown',
    'WEDNESDAY': 'blue',
    'THURSDAY': 'black',
    'FRIDAY': 'orange',
    'SATURDAY': 'violet',
    'SUNDAY': 'green',
};

export const DEFAULT_MIN_DATE = '01/Jan/19';
export const DEFAULT_MIN_DATE_LIMIT = '01/Jan/2016';
export const DEFAULT_MAX_DATE = '31/Dec/2020';

export const STATE_ABBREV_MAP = {
    "Alaska": "AK",
    "Hawaii": "HI",
    "Alabama": "AL",
    "Arkansas": "AR",
    "Arizona": "AZ",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Iowa": "IA",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Massachusetts": "MA",
    "Maryland": "MD",
    "Maine": "ME",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Missouri": "MO",
    "Mississippi": "MS",
    "Montana": "MT",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Nebraska": "NE",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "Nevada": "NV",
    "New York": "NY",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Virginia": "VA",
    "Vermont": "VT",
    "Washington": "WA",
    "Wisconsin": "WI",
    "West Virginia": "WV",
    "Wyoming": "WY",
};

export const HEATMAP = [
    'rgb(0,255,0)',
    'rgb(5,250,0)',
    'rgb(10,245,0)',
    'rgb(15,240,0)',
    'rgb(20,235,0)',
    'rgb(25,230,0)',
    'rgb(30,225,0)',
    'rgb(35,220,0)',
    'rgb(40,215,0)',
    'rgb(45,210,0)',
    'rgb(50,205,0)',
    'rgb(55,200,0)',
    'rgb(60,195,0)',
    'rgb(65,190,0)',
    'rgb(70,185,0)',
    'rgb(75,180,0)',
    'rgb(80,175,0)',
    'rgb(85,170,0)',
    'rgb(90,165,0)',
    'rgb(95,160,0)',
    'rgb(100,155,0)',
    'rgb(105,150,0)',
    'rgb(110,145,0)',
    'rgb(115,140,0)',
    'rgb(120,135,0)',
    'rgb(125,130,0)',
    'rgb(130,125,0)',
    'rgb(135,120,0)',
    'rgb(140,115,0)',
    'rgb(145,110,0)',
    'rgb(150,105,0)',
    'rgb(155,100,0)',
    'rgb(160,95,0)',
    'rgb(165,90,0)',
    'rgb(170,85,0)',
    'rgb(175,80,0)',
    'rgb(180,75,0)',
    'rgb(185,70,0)',
    'rgb(190,65,0)',
    'rgb(195,60,0)',
    'rgb(200,55,0)',
    'rgb(205,50,0)',
    'rgb(210,45,0)',
    'rgb(215,40,0)',
    'rgb(220,35,0)',
    'rgb(225,30,0)',
    'rgb(230,25,0)',
    'rgb(235,20,0)',
    'rgb(240,15,0)',
    'rgb(245,10,0)',
    'rgb(250,5,0)',
    'rgb(252,2,0)',
    'rgb(255,0,0)',
];