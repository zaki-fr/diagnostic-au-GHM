# diagnostic-au-GHM

### Running the server
To run the server, run:

```
npm run test
npm run build
npm start
```

To view the Swagger UI interface:

```
open http://localhost:3000/docs
```

**Get Medical Act List of D-143 diagnosis code**
```shellbash
curl -X GET "http://localhost:3000/diagnostic/D-143/acts" -H "accept: application/json"
```

**Dianogsis a patient second time with age=20, sessions=1, CMD-28**
```shellbash
curl -X POST "http://localhost:3000/diagnostic" -H "accept: application/json" -H "Content-Type: application/json"
    -d "{ \"clientParameters\": { \"age\": 20, \"sessions\": 1, \"gender\": \"string\" }, \"mainDiagnosis\": \"CMD-28\", \"associatedDiagnoses\": []}"
```

Response:

```JSON
{
  "jsonapi": {
    "version": "1.0"
  },
  "associatedDiagnoses": [
    "D-145",
    "Other"
  ],
  "possibleGHMCodes": "28Z01,28Z02,28Z03,28Z04,90Z02Z,28Z10,28Z11,28Z18,28Z23,28Z24,28Z25,90Z02Z,28Z07,28Z17,28Z14,28Z15,28Z16,90Z02Z,90Z01Z",
  "lastDiagnosicCode": "CMD-28",
  "historicalInformation": {
    "decisionJourney": [
      {
        "key": "CMD-28",
        "params": {
          "age": 20,
          "sessions": 1,
          "gender": "string"
        }
      }
    ],
    "historyPath": [
      "ROOT",
      "CMD-28"
    ]
  }
}
```