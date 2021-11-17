export const PROTOCOL = 'http://';
export const BASE_URL = 'localhost:8080/';
export const API_VERSION = 'api/v1/';

// API End-points
export const LOGIN = '/user/login/';
export const SIGNUP = '/user/signup/';

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
    'graph1': 'Levels of Pollutants in a state over a 5-year period',
    'graph2': 'Compare Days of the weeks (Mondays through Sundays) based on the levels of pollutants within the selected state (single) over a 5-year period (2016-2020)',
    'graph3': 'Compare Hours of the day that has the maximum level of pollutants for a selected (single) state and pollutant over a period of 5 years (2016-2020)',
    'graph4': 'Compare 2 (up to 4) states of choice based on the levels of a selected (single) pollutant within these states over a 5-year period (2016-2020)',
    'graph5': 'Number of days (in a month) when the level of pollutant in a state is greater than the recommended safe value of the pollutant',
}