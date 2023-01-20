Materials - Sam Slavitt

This project is a simple CRUD app built using React that allows the user to manipulate the data of Material objects. The API layer is mocked using json-server and uses a db.json file as storage. Testing uses the built-in Jest setup that comes packaged with create-react-app. It took about 3.5 hours to design, implement, and write up with some additional time beforehand to learn how some of the packages I hadn't worked with before would be integrated, such as json-server.

To run:
- In a Powershell instance at the project root level, run "json-server --watch db.json" to start the json-server instance. This is configured to run on port 3001 on localhost
- In a second Powershell instance, run "npm start" to run the React project. This is configured to run on port 3000 on localhost
- Once "npm start" has been run, a new tab should open up to show the Materials component. If not, navigate to http://localhost:3000

To test:
- Run "npm test" to run test scripts (NOTE: test scripts are currently broken, see below)

Tradeoffs and Decisions:
- Due to the time constraints, I had to prioritize the functionality of the app and was not able to fully style it and implement a full suite of unit tests. There is styling applied to mimic the basic layout, icons, and coloring of the provided wireframes. Had I had more time, I would have tried to style the component using Bootstrap to more closely resemble the given designs. There is also a (broken) unit test to test the initial rendering of the component with an empty database.
- To expedite the implementation, I used outside components for the date picker (react-date-picker) and the color picker (react-color).
- Given the lack of a distinct "Update" button in the design, I made the decision to have those fields update locally in real-time and made PUT requests to the API for field edits happen when the onBlur event fires for each field or, in the case of the color picker, when the color picker is closed.
- To expedite the implementation, I did not implement an onBlur event for the color picker component, instead the API call to update a material's color happens when the color dot to open the color picker is clicked to close the color picker.
- The total cost calculation will truncate any additional decimal places past the hundredths, regardless of fractional cents present in cost data.

Known Bugs:
- Clicking on a material in the list when another material's data is populated does not repopulate the fields, though it will edit the database when fields are edited and then unfocused. This is a signficant bug, but I was unable to fix it in the time allotted.

Questions to Discuss:
- Why is there no distinct "Update" button for the field editor?
- From a UX perspective, why are there incrementers for input fields that may have decimal values?
- From a UX perspective, why is there nothing in the design indicating that the color dot in the edit field is clickable?