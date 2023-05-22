# Blueprint Health

An app that runs a simple diagnostic for a user.

# The Objective

We want to build a simple diagnostic test that allows us to get an idea of a user's health status. Taking a user's responses, we want to give them an quick summary of their current state of well-being.

# The Approach

This is a simple web app that presents a form for the user to guide themselves to the finish. The app loads the questionnaire in order to better let us manage the questionnaire should we want to change the questions or the answer values. Therefore, the data will be stored in a database so that we do not need to edit the codebase as often (and can be managed from a DBA perspective with managed scripts).

In several areas, we transform data to an object in the case that we'd like to scale to an infinite number of diagnoses and questions. This app also utilizes a stepper-like function in order to allow users to revise responses if they choose to go back and change their answers.

Given the limited scope, we decide to go with a simple web app as the web is more or less a highly accessible avenue of access.

# Challenges

There are a few shortcomings. This is a fairly short questionnaire, but if we added many more questions, we would think about changing the `Stepper` to a more appropriate component like a `Pagination`, `Dropdown` or a numbered input form. Other challenges are present in the case we'd like to scale. We could potentially leverage Redis in order to better handle the data transforms for faster lookups.

# Some considerations

In order to make this better for production, a few future considerations:

1. Change the data modeling so that the queries are faster. We can add indexes and key constraints. If we ever decide to add more types of questionnaires, we would also have to change the table schemas and to be able to support potential other types of management (delete questionnares, needs foreign keys and cascades). Doing this would also cut down on the messy data transforms in `/api/assess` and `/api/questions`.

2. Consider using other types of server architectures. Currently we are using API routes generated from Next.JS. This is fine for now, but if millions of people use this app, we might want to consider a persistant connection with a gateway layer to handle many responses coming in at a time since we are using a free tier database with a limited number of connections.

3. As an added bonus, we might want to add some other monitoring tools to check app health. Things along the lines of Grafana, Sentry, and Datadog would be nice if budget and time are permitting.

4. Tests are always welcome for future useability and code quality.

# Local Setup instructions

1. `yarn`
2. `touch .env`
3. In the `.env` file, specifiy: `DATABASE_URL=<Your Connection String Here>`
4. Initialize the database with seed data with: `yarn knex:downup`
5. `yarn dev`, and your app should be live at http://localhost:3000!

#
