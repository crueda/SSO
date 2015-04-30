define({ "api": [
  {
    "type": "delete",
    "url": "/area",
    "title": "Delete area",
    "name": "DeleteArea",
    "group": "Area",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Area unique ID</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/areas.js",
    "groupTitle": "Area"
  },
  {
    "type": "get",
    "url": "/area/:id",
    "title": "Request Area information",
    "name": "GetArea_Get_area_data",
    "group": "Area",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Area unique ID</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Area</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dateInit",
            "description": "<p>Init date for the Area. Milliseconds since january 1 1970 (epoch)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dateEnd",
            "description": "<p>End date for the Area. Milliseconds since january 1 1970 (epoch)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hourInit",
            "description": "<p>Init hour for the Area. Milliseconds since start current date</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hourEnd",
            "description": "<p>End hour for the Area. Milliseconds since start current date</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typeArea",
            "description": "<p>Type of area (A=Allow, F=Forbidden, G=Generic)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "radius",
            "description": "<p>Radius of area (in meters)</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/areas.js",
    "groupTitle": "Area"
  },
  {
    "type": "get",
    "url": "/areas",
    "title": "Request all areas information",
    "name": "GetAreas",
    "group": "Area",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "area",
            "description": "<p>List of areas</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/areas.js",
    "groupTitle": "Area"
  },
  {
    "type": "post",
    "url": "/area/:id",
    "title": "Request Area information",
    "name": "PostArea_Request_area_information",
    "group": "Area",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Area unique ID</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Area</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dateInit",
            "description": "<p>Init date for the Area. Milliseconds since january 1 1970 (epoch)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dateEnd",
            "description": "<p>End date for the Area. Milliseconds since january 1 1970 (epoch)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hourInit",
            "description": "<p>Init hour for the Area. Milliseconds since start current date</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hourEnd",
            "description": "<p>End hour for the Area. Milliseconds since start current date</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "typeArea",
            "description": "<p>Type of area (A=Allow, F=Forbidden, G=Generic)</p> "
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "radius",
            "description": "<p>Radius of area (in meters)</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AreaNotFound",
            "description": "<p>The <code>id</code> of the Area was not found.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"msg\": \"notExist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/areas.js",
    "groupTitle": "Area"
  },
  {
    "type": "post",
    "url": "/areas",
    "title": "Request all areas information",
    "name": "PostAreas",
    "group": "Area",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "area",
            "description": "<p>List of areas</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/areas.js",
    "groupTitle": "Area"
  },
  {
    "type": "post",
    "url": "/area/",
    "title": "Create new area",
    "name": "PostNewArea",
    "group": "Area",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Area</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dateInit",
            "description": "<p>Init date for the Area. Milliseconds since january 1 1970 (epoch)</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dateEnd",
            "description": "<p>End date for the Area. Milliseconds since january 1 1970 (epoch)</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hourInit",
            "description": "<p>Init hour for the Area. Milliseconds since start current date</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hourEnd",
            "description": "<p>End hour for the Area. Milliseconds since start current date</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typeArea",
            "description": "<p>Type of area (A=Allow, F=Forbidden, G=Generic)</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "radius",
            "description": "<p>Radius of area (in meters)</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Area unique ID</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/areas.js",
    "groupTitle": "Area"
  },
  {
    "type": "put",
    "url": "/area/",
    "title": "Update area",
    "name": "PutNewArea",
    "group": "Area",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Area unique ID</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Area</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dateInit",
            "description": "<p>Init date for the Area. Milliseconds since january 1 1970 (epoch)</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dateEnd",
            "description": "<p>End date for the Area. Milliseconds since january 1 1970 (epoch)</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hourInit",
            "description": "<p>Init hour for the Area. Milliseconds since start current date</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hourEnd",
            "description": "<p>End hour for the Area. Milliseconds since start current date</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typeArea",
            "description": "<p>Type of area (A=Allow, F=Forbidden, G=Generic)</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "radius",
            "description": "<p>Radius of area (in meters)</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Result message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"Area 867 updated\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/areas.js",
    "groupTitle": "Area"
  }
] });