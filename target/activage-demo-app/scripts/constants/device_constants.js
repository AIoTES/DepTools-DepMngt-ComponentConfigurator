/**
 * Created by JaviHop on 20/08/2018.
 */

app.constant('LIST_OF_DEVICES', [
  {
    deviceId: "http://platforms/example",
    name: "http://platforms/example",
    hostedBy: "http://inter-iot.eu/platforms/example",
    sensors: [
      {
        title: "diatolicBloodPreassure",
        value: "84.030914",
        update: "Fri Jul 27 11:41:22 CEST 2018"
      },
      {
        title: "systolicBloodPreassure",
        value: "84.030914",
        update: "Fri Jul 27 11:41:22 CEST 2018"
      }
    ]
  },
  {
    deviceId: 'deviceName',
    name: 'deviceName',
    hostedBy: 'Sofia2',
    sensors: [
      {
        title: 'Temperature',
        value: '25º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '17 %',
        update: '21/08/2018 10:12'
      },
      {
        title: 'Noise',
        value: '35 db',
        update: '21/08/2018 13:00'
      },
      {
        title: 'Ozone',
        value: '24.02 ppb',
        update: '21/08/2018 13:37'
      }
    ]
  },
  {
    deviceId: 'deviceHOP',
    name: 'deviceHOP',
    hostedBy: 'Sofia2',
    sensors: [
      {
        title: 'Temperature',
        value: '25º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '17 %',
        update: '21/08/2018 10:12'
      },
      {
        title: 'Crowd Monitoring',
        value: '1759 people',
        update: '21/08/2018 11:12'
      }
    ]
  },
  {
    deviceId: 'HOP_Ubiquitous_2',
    name: 'HOP Ubiquitous 2',
    hostedBy: 'Sofia2',
    sensors: [
      {
        title: 'Temperature',
        value: '32º C',
        update: '21/08/2018 12:12'
      },
      {
        title: 'Humidity',
        value: '32 %',
        update: '21/08/2018 12:12'
      },
      {
        title: 'Ozone',
        value: '42.89 ppb',
        update: '21/08/2018 12:37'
      },
      {
        title: 'Carbon Monoxide',
        value: '12.57 ppb',
        update: '21/08/2018 13:37'
      }
    ]
  },
  {
    deviceId: 'device_Sofi',
    name: 'device Sofi',
    hostedBy: 'Sofia2',
    sensors: [
      {
        title: 'Temperature',
        value: '21º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '12 %',
        update: '21/08/2018 10:12'
      }
    ]
  },
  {
    deviceId: 'device_Uni',
    name: 'device Uni',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Temperature',
        value: '26º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '11 %',
        update: '21/08/2018 10:12'
      },
      {
        title: 'Ozone',
        value: '21.72 ppb',
        update: '21/08/2018 10:37'
      }
    ]
  },
  {
    deviceId: 'HOPU_2',
    name: 'HOPU 2',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Noise',
        value: '12 db',
        update: '21/08/2018 13:10'
      }
    ]
  },
  {
    deviceId: 'HOPU_3',
    name: 'HOPU 3',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Temperature',
        value: '21º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '24.51 %',
        update: '21/08/2018 10:12'
      },
      {
        title: 'Crowd Monitoring',
        value: '352 people',
        update: '21/08/2018 13:15'
      },
      {
        title: 'Carbon Monoxide',
        value: '24.02 ppb',
        update: '21/08/2018 13:37'
      }
    ]
  },
  {
    deviceId: 'HOPU_uni',
    name: 'HOPU uni',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Temperature',
        value: '21º C',
        update: '21/08/2018 13:01'
      },
      {
        title: 'Humidity',
        value: '15 %',
        update: '21/08/2018 11:52'
      },
      {
        title: 'Noise',
        value: '72 db',
        update: '21/08/2018 12:23'
      }
    ]
  },
  {
    deviceId: 'device123',
    name: 'device123',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Noise',
        value: '17.12 db',
        update: '21/08/2018 13:00'
      },
      {
        title: 'Carbon Monoxide',
        value: '24.02 ppb',
        update: '21/08/2018 11:00'
      }
    ]
  },
  {
    deviceId: 'device_test',
    name: 'device test',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Temperature',
        value: '12º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '25 %',
        update: '21/08/2018 10:12'
      },
      {
        title: 'Noise',
        value: '35 db',
        update: '21/08/2018 13:00'
      },
      {
        title: 'Ozone',
        value: '24.02 ppb',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Carbon Monoxide',
        value: '24.78 ppb',
        update: '21/08/2018 13:24'
      }
    ]
  },
  {
    deviceId: 'uni_test',
    name: 'uni test',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Temperature',
        value: '11º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Ozone',
        value: '11.45 ppb',
        update: '21/08/2018 13:37'
      }
    ]
  },
  {
    deviceId: 'noname',
    name: 'noname',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Noise',
        value: '35 db',
        update: '21/08/2018 13:00'
      },
      {
        title: 'Ozone',
        value: '24.02 ppb',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Carbon Monoxide',
        value: '24.78 ppb',
        update: '21/08/2018 13:24'
      }
    ]
  },
  {
    deviceId: 'Martin_Router_King',
    name: 'Martin Router King',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Temperature',
        value: '32º C',
        update: '21/08/2018 13:12'
      },
      {
        title: 'Humidity',
        value: '12 %',
        update: '21/08/2018 13:12'
      },
      {
        title: 'Carbon Monoxide',
        value: '21.45 ppb',
        update: '21/08/2018 13:24'
      }
    ]
  },
  {
    deviceId: 'AALeti',
    name: 'AALeti',
    hostedBy: 'universAAL',
    sensors: [
      {
        title: 'Noise',
        value: '35 db',
        update: '21/08/2018 13:00'
      },
      {
        title: 'Ozone',
        value: '24.02 ppb',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Carbon Monoxide',
        value: '24.78 ppb',
        update: '21/08/2018 13:24'
      }
    ]
  },
  {
    deviceId: 'deviceF',
    name: 'deviceF',
    hostedBy: 'FIWARE',
    sensors: [
      {
        title: 'Temperature',
        value: '12º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '25 %',
        update: '21/08/2018 10:12'
      }
    ]
  },
  {
    deviceId: 'hop_hop_hop!',
    name: 'hop hop hop!',
    hostedBy: 'FIWARE',
    sensors: [
      {
        title: 'Temperature',
        value: '15º C',
        update: '21/08/2018 13:00'
      },
      {
        title: 'Humidity',
        value: '41 %',
        update: '21/08/2018 12:14'
      },
      {
        title: 'Noise',
        value: '49 db',
        update: '21/08/2018 13:12'
      },
      {
        title: 'Ozone',
        value: '21.25 ppb',
        update: '21/08/2018 10:30'
      },
      {
        title: 'Carbon Monoxide',
        value: '32.89 ppb',
        update: '21/08/2018 11:32'
      }
    ]
  },
  {
    deviceId: 'deviceEEE',
    name: 'deviceEEE',
    hostedBy: 'FIWARE',
    sensors: [
      {
        title: 'Temperature',
        value: '12º C',
        update: '21/08/2018 13:37'
      }
    ]
  },
  {
    deviceId: 'dHOPU',
    name: 'dHOPU',
    hostedBy: 'FIWARE',
    sensors: [
      {
        title: 'Temperature',
        value: '22º C',
        update: '21/08/2018 13:15'
      },
      {
        title: 'Humidity',
        value: '21 %',
        update: '21/08/2018 10:00'
      },
      {
        title: 'Noise',
        value: '24 db',
        update: '21/08/2018 13:12'
      },
      {
        title: 'Ozone',
        value: '23.89 ppb',
        update: '21/08/2018 13:00'
      },
      {
        title: 'Carbon Monoxide',
        value: '24.01 ppb',
        update: '21/08/2018 12:01'
      }
    ]
  },
  {
    deviceId: 'HOP_device',
    name: 'HOP device',
    hostedBy: 'FIWARE',
    sensors: [
      {
        title: 'Temperature',
        value: '12º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '25 %',
        update: '21/08/2018 10:12'
      }
    ]
  },
  {
    deviceId: 'FIW_HOPU',
    name: 'FIW HOPU',
    hostedBy: 'FIWARE',
    sensors: [
      {
        title: 'Temperature',
        value: '17º C',
        update: '21/08/2018 13:00'
      },
      {
        title: 'Humidity',
        value: '27 %',
        update: '21/08/2018 10:45'
      },
      {
        title: 'Noise',
        value: '22.78 db',
        update: '21/08/2018 11:32'
      },
      {
        title: 'Ozone',
        value: '21.21 ppb',
        update: '21/08/2018 11:35'
      },
      {
        title: 'Carbon Monoxide',
        value: '21.84 ppb',
        update: '21/08/2018 13:01'
      }
    ]
  },
  {
    deviceId: 'test_1',
    name: 'test 1',
    hostedBy: 'FIWARE',
    sensors: [
      {
        title: 'Temperature',
        value: '12º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '25 %',
        update: '21/08/2018 10:12'
      }
    ]
  },
  {
    deviceId: 'test_2',
    name: 'test 2',
    hostedBy: 'FIWARE',
    sensors: [
      {
        title: 'Temperature',
        value: '35º C',
        update: '21/08/2018 13:37'
      },
      {
        title: 'Humidity',
        value: '27 %',
        update: '21/08/2018 10:12'
      },
      {
        title: 'Noise',
        value: '45 db',
        update: '21/08/2018 11:45'
      },
      {
        title: 'Crowd Monitoring',
        value: '2518 people',
        update: '21/08/2018 11:37'
      }
    ]
  }
]);
