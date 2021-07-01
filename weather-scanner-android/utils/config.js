export const DEFAULT_STORAGE = '@WeatherScanner';
export const WEATHER_API_STEM = 'http://api.openweathermap.org/data/2.5/weather?';
export const FORECAST_API_STEM  = 'http://api.openweathermap.org/data/2.5/forecast?';
//this is for accuweather api
//export const API_KEY = '0460650bb2524f84baecaa9381d79efc';
//export const WEATHER_API_STEM = 'http://api.accuweather.com/'
export const WEATHER_API_KEY = 'llnkkLEXKxJaYqgNaXYLm1cH4Gm0gXjU';
export const SUWON = 223670;
export const WEATHER_CURRENT_API = 'http://dataservice.accuweather.com/currentconditions/v1/' + SUWON + '?';
export const WEATHER_FORECAST_API = 'http://dataservice.accuweather.com/forecasts/v1/daily/10day/' + SUWON + '?';
export const WEATHER_FINDCITY_API = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?';

export const demoCurrentResponse = [
    {
        "LocalObservationDateTime": "2017-06-13T00:10:00+09:00",
        "EpochTime": 1497280200,
        "WeatherText": "대체로 흐림",
        "WeatherIcon": 38,
        "IsDayTime": false,
        "Temperature": {
            "Metric": {
                "Value": 19.5,
                "Unit": "C",
                "UnitType": 17
            },
            "Imperial": {
                "Value": 67,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/current-weather/223670?lang=ko-kr",
        "Link": "http://www.accuweather.com/ko/kr/suwon/223670/current-weather/223670?lang=ko-kr"
    }
];

export const demoForecastResponse = {
	"Headline": {
		"EffectiveDate": "2017-06-13T07:00:00+09:00",
		"EffectiveEpochDate": 1497304800,
		"Severity": 5,
		"Text": "화요일에 소나기 예상",
		"Category": "rain",
		"EndDate": "2017-06-13T19:00:00+09:00",
		"EndEpochDate": 1497348000,
		"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/extended-weather-forecast/223670?unit=c&lang=ko-kr",
		"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?unit=c&lang=ko-kr"
	},
	"DailyForecasts": [
		{
			"Date": "2017-06-12T07:00:00+09:00",
			"EpochDate": 1497218400,
			"Temperature": {
				"Minimum": {
					"Value": 16.5,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 25.2,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 6,
				"IconPhrase": "대체로 흐림"
			},
			"Night": {
				"Icon": 36,
				"IconPhrase": "간헐적으로 흐림"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=1&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=1&unit=c&lang=ko-kr"
		},
		{
			"Date": "2017-06-13T07:00:00+09:00",
			"EpochDate": 1497304800,
			"Temperature": {
				"Minimum": {
					"Value": 16.1,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 25.3,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 14,
				"IconPhrase": "일부 화창/소나기"
			},
			"Night": {
				"Icon": 35,
				"IconPhrase": "일부 흐림"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=2&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=2&unit=c&lang=ko-kr"
		},
		{
			"Date": "2017-06-14T07:00:00+09:00",
			"EpochDate": 1497391200,
			"Temperature": {
				"Minimum": {
					"Value": 16.1,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 26.9,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 3,
				"IconPhrase": "일부 화창"
			},
			"Night": {
				"Icon": 33,
				"IconPhrase": "맑음"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=3&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=3&unit=c&lang=ko-kr"
		},
		{
			"Date": "2017-06-15T07:00:00+09:00",
			"EpochDate": 1497477600,
			"Temperature": {
				"Minimum": {
					"Value": 16.4,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 28,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 1,
				"IconPhrase": "화창"
			},
			"Night": {
				"Icon": 33,
				"IconPhrase": "맑음"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=4&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=4&unit=c&lang=ko-kr"
		},
		{
			"Date": "2017-06-16T07:00:00+09:00",
			"EpochDate": 1497564000,
			"Temperature": {
				"Minimum": {
					"Value": 17.6,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 31.7,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 3,
				"IconPhrase": "일부 화창"
			},
			"Night": {
				"Icon": 36,
				"IconPhrase": "간헐적으로 흐림"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=5&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=5&unit=c&lang=ko-kr"
		},
		{
			"Date": "2017-06-17T07:00:00+09:00",
			"EpochDate": 1497650400,
			"Temperature": {
				"Minimum": {
					"Value": 17.4,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 30.4,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 4,
				"IconPhrase": "간헐적으로 흐림"
			},
			"Night": {
				"Icon": 36,
				"IconPhrase": "간헐적으로 흐림"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=6&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=6&unit=c&lang=ko-kr"
		},
		{
			"Date": "2017-06-18T07:00:00+09:00",
			"EpochDate": 1497736800,
			"Temperature": {
				"Minimum": {
					"Value": 17.2,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 29.9,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 4,
				"IconPhrase": "간헐적으로 흐림"
			},
			"Night": {
				"Icon": 34,
				"IconPhrase": "대체로 맑음"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=7&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=7&unit=c&lang=ko-kr"
		},
		{
			"Date": "2017-06-19T07:00:00+09:00",
			"EpochDate": 1497823200,
			"Temperature": {
				"Minimum": {
					"Value": 17.7,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 31.3,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 1,
				"IconPhrase": "화창"
			},
			"Night": {
				"Icon": 38,
				"IconPhrase": "대체로 흐림"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=8&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=8&unit=c&lang=ko-kr"
		},
		{
			"Date": "2017-06-20T07:00:00+09:00",
			"EpochDate": 1497909600,
			"Temperature": {
				"Minimum": {
					"Value": 19,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 32.1,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 4,
				"IconPhrase": "간헐적으로 흐림"
			},
			"Night": {
				"Icon": 35,
				"IconPhrase": "일부 흐림"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=9&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=9&unit=c&lang=ko-kr"
		},
		{
			"Date": "2017-06-21T07:00:00+09:00",
			"EpochDate": 1497996000,
			"Temperature": {
				"Minimum": {
					"Value": 19,
					"Unit": "C",
					"UnitType": 17
				},
				"Maximum": {
					"Value": 31.7,
					"Unit": "C",
					"UnitType": 17
				}
			},
			"Day": {
				"Icon": 1,
				"IconPhrase": "화창"
			},
			"Night": {
				"Icon": 33,
				"IconPhrase": "맑음"
			},
			"Sources": [
				"AccuWeather"
			],
			"MobileLink": "http://m.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=10&unit=c&lang=ko-kr",
			"Link": "http://www.accuweather.com/ko/kr/suwon/223670/daily-weather-forecast/223670?day=10&unit=c&lang=ko-kr"
		}
	]
};

export const demoCitylistResponse = [
    {
        "Version": 1,
        "Key": "223670",
        "Type": "City",
        "Rank": 21,
        "LocalizedName": "수원시",
        "Country": {
            "ID": "KR",
            "LocalizedName": "대한민국"
        },
        "AdministrativeArea": {
            "ID": "41",
            "LocalizedName": "경기도"
        }
    },
    {
        "Version": 1,
        "Key": "3362036",
        "Type": "City",
        "Rank": 75,
        "LocalizedName": "수원리",
        "Country": {
            "ID": "KR",
            "LocalizedName": "대한민국"
        },
        "AdministrativeArea": {
            "ID": "46",
            "LocalizedName": "전라남도"
        }
    },
    {
        "Version": 1,
        "Key": "3369161",
        "Type": "City",
        "Rank": 75,
        "LocalizedName": "수원리",
        "Country": {
            "ID": "KR",
            "LocalizedName": "대한민국"
        },
        "AdministrativeArea": {
            "ID": "49",
            "LocalizedName": "제주도"
        }
    },
    {
        "Version": 1,
        "Key": "3357695",
        "Type": "City",
        "Rank": 85,
        "LocalizedName": "수원리",
        "Country": {
            "ID": "KR",
            "LocalizedName": "대한민국"
        },
        "AdministrativeArea": {
            "ID": "43",
            "LocalizedName": "충청북도"
        }
    },
    {
        "Version": 1,
        "Key": "3359455",
        "Type": "City",
        "Rank": 85,
        "LocalizedName": "수원리",
        "Country": {
            "ID": "KR",
            "LocalizedName": "대한민국"
        },
        "AdministrativeArea": {
            "ID": "44",
            "LocalizedName": "충청남도"
        }
    },
    {
        "Version": 1,
        "Key": "3368937",
        "Type": "City",
        "Rank": 85,
        "LocalizedName": "수원리",
        "Country": {
            "ID": "KR",
            "LocalizedName": "대한민국"
        },
        "AdministrativeArea": {
            "ID": "48",
            "LocalizedName": "경상남도"
        }
    }
];
