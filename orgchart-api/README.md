This application provides API access to a postgresql database called "orga_structure" to obtain and
manipulate data for organization chart display

CLIENT 
The accompanying client application can be found at (link)

INSTALLATION
a. Create a postgresql database named "orga_structure"

b. Download the project files and replace the postgresql "password" value in the file 
"src/entities/app.module.ts" with your database password

c. Run command "npm install" in the project directoy followed by the command "npm start"

END POINTS

GET /orgchart
Retrive all records
    async getAllChart(): Promise<OrgChart[]> {
        return await this.orgChartRepository.find();
    }

GET /orgchart/:id
Retrieve a single record with id equal to "id"

GET /orgchart/data
Retrieve all records in a format suitable for tree display

POST /orgchart
Add a new record using passed form data

PUT /orgchart/:id
Update a single record using passed form data

DELETE /orgchart/:id
Remove a single record with id equal to "id"